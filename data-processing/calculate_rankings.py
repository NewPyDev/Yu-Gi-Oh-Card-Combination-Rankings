"""
Yu-Gi-Oh Card Combination Ranking Calculator - OPTIMIZED VERSION
Analyzes 2-card combinations with batch processing and progress saving
"""

import json
import re
from itertools import combinations
from datetime import datetime
from tqdm import tqdm
import os

CARDS_FILE = "../public/cards.json"
OUTPUT_FILE = "../public/rankings.json"
TOP_N = 10000  # Number of top combinations to export
BATCH_SIZE = 100000  # Process combinations in batches
MIN_SCORE_THRESHOLD = 100  # Only keep combinations above this score

# Scoring weights (can be customized)
WEIGHTS = {
    'cardAdvantage': 1.0,
    'boardPresence': 1.0,
    'disruption': 1.0,
    'protection': 1.0,
    'comboExtender': 1.0,
    'spellTrapSynergy': 1.0,
    'extraDeckAccess': 1.0,
    'removal': 1.0,
    'resourceGeneration': 1.0,
}

class CardScorer:
    """Scores individual cards and card combinations"""
    
    # Keywords for different scoring categories
    DRAW_KEYWORDS = ['draw', 'draws']
    SEARCH_KEYWORDS = ['search', 'add', 'adds']
    SPECIAL_SUMMON_KEYWORDS = ['special summon', 'special summoned']
    NEGATE_KEYWORDS = ['negate', 'negates', 'negated']
    DESTROY_KEYWORDS = ['destroy', 'destroys', 'destroyed']
    BANISH_KEYWORDS = ['banish', 'banished', 'banishes']
    DISCARD_KEYWORDS = ['discard', 'discards']
    PROTECTION_KEYWORDS = ['cannot be destroyed', 'cannot be targeted', 'unaffected', 'immune']
    RECURSION_KEYWORDS = ['from your graveyard', 'from the graveyard', 'return', 'revive']
    TOKEN_KEYWORDS = ['token', 'tokens']
    FUSION_KEYWORDS = ['fusion summon', 'fusion monster']
    SYNCHRO_KEYWORDS = ['synchro summon', 'synchro monster']
    XYZ_KEYWORDS = ['xyz summon', 'xyz monster', 'detach']
    LINK_KEYWORDS = ['link summon', 'link monster']
    COUNTER_KEYWORDS = ['counter', 'counters']
    
    @staticmethod
    def count_keyword_occurrences(text, keywords):
        """Count how many times keywords appear in text"""
        text_lower = text.lower()
        count = 0
        for keyword in keywords:
            count += text_lower.count(keyword)
        return count
    
    @staticmethod
    def score_card_advantage(card):
        """Score based on card advantage generation"""
        desc = card.get('desc', '').lower()
        score = 0
        
        draw_count = CardScorer.count_keyword_occurrences(desc, CardScorer.DRAW_KEYWORDS)
        score += min(draw_count * 20, 60)
        
        search_count = CardScorer.count_keyword_occurrences(desc, CardScorer.SEARCH_KEYWORDS)
        score += min(search_count * 15, 45)
        
        if 'draw 2' in desc or 'add 2' in desc or 'add up to 2' in desc:
            score += 25
        
        return min(score, 100)
    
    @staticmethod
    def score_board_presence(card):
        """Score based on board presence capabilities"""
        desc = card.get('desc', '').lower()
        card_type = card.get('type', '')
        score = 0
        
        ss_count = CardScorer.count_keyword_occurrences(desc, CardScorer.SPECIAL_SUMMON_KEYWORDS)
        score += min(ss_count * 30, 60)
        
        token_count = CardScorer.count_keyword_occurrences(desc, CardScorer.TOKEN_KEYWORDS)
        score += min(token_count * 15, 30)
        
        if 'Continuous' in card_type or 'Field' in card_type:
            score += 10
        
        return min(score, 100)
    
    @staticmethod
    def score_disruption(card):
        """Score based on disruption potential"""
        desc = card.get('desc', '').lower()
        card_type = card.get('type', '')
        score = 0
        
        negate_count = CardScorer.count_keyword_occurrences(desc, CardScorer.NEGATE_KEYWORDS)
        if negate_count > 0:
            if 'negate the activation' in desc or 'negate that effect' in desc:
                score += 40
            else:
                score += 25
        
        destroy_count = CardScorer.count_keyword_occurrences(desc, CardScorer.DESTROY_KEYWORDS)
        if 'destroy all' in desc or 'destroy as many' in desc:
            score += 35
        else:
            score += min(destroy_count * 20, 40)
        
        banish_count = CardScorer.count_keyword_occurrences(desc, CardScorer.BANISH_KEYWORDS)
        score += min(banish_count * 30, 45)
        
        discard_count = CardScorer.count_keyword_occurrences(desc, CardScorer.DISCARD_KEYWORDS)
        score += min(discard_count * 25, 40)
        
        if 'Counter' in card_type and 'Trap' in card_type:
            score += 25
        
        return min(score, 100)
    
    @staticmethod
    def score_protection(card):
        """Score based on protection and sustainability"""
        desc = card.get('desc', '').lower()
        score = 0
        
        protection_count = CardScorer.count_keyword_occurrences(desc, CardScorer.PROTECTION_KEYWORDS)
        score += min(protection_count * 20, 40)
        
        recursion_count = CardScorer.count_keyword_occurrences(desc, CardScorer.RECURSION_KEYWORDS)
        score += min(recursion_count * 25, 50)
        
        if 'Quick-Play' in card.get('type', ''):
            score += 10
        
        return min(score, 100)
    
    @staticmethod
    def score_combo_extender(card):
        """Score based on combo extension potential"""
        desc = card.get('desc', '').lower()
        score = 0
        
        if 'search' in desc or 'add' in desc:
            score += 25
        
        if 'special summon' in desc:
            if 'from your deck' in desc:
                score += 35
            elif 'from your hand' in desc:
                score += 30
        
        if desc.count('you can') >= 2 or desc.count('●') >= 2:
            score += 20
        
        return min(score, 100)
    
    @staticmethod
    def score_spell_trap_synergy(card):
        """Score spell/trap cards for synergy potential"""
        card_type = card.get('type', '')
        score = 0
        
        if 'Quick-Play' in card_type:
            score += 20
        if 'Counter' in card_type:
            score += 25
        if 'Continuous' in card_type:
            score += 30
        if 'Equip' in card_type:
            score += 15
        if 'Field' in card_type:
            score += 25
        
        return min(score, 100)
    
    @staticmethod
    def score_extra_deck_access(card):
        """Score based on Extra Deck summoning capability"""
        desc = card.get('desc', '').lower()
        score = 0
        
        fusion_count = CardScorer.count_keyword_occurrences(desc, CardScorer.FUSION_KEYWORDS)
        if fusion_count > 0:
            score += 30
        
        synchro_count = CardScorer.count_keyword_occurrences(desc, CardScorer.SYNCHRO_KEYWORDS)
        if synchro_count > 0:
            score += 30
        
        xyz_count = CardScorer.count_keyword_occurrences(desc, CardScorer.XYZ_KEYWORDS)
        if xyz_count > 0:
            score += 30
        
        link_count = CardScorer.count_keyword_occurrences(desc, CardScorer.LINK_KEYWORDS)
        if link_count > 0:
            score += 30
        
        types_enabled = sum([fusion_count > 0, synchro_count > 0, xyz_count > 0, link_count > 0])
        if types_enabled >= 2:
            score += 20
        
        return min(score, 100)
    
    @staticmethod
    def score_removal(card):
        """Score removal capabilities"""
        desc = card.get('desc', '').lower()
        score = 0
        
        if 'destroy all' in desc or 'banish all' in desc or 'return all' in desc:
            score += 50
        
        destroy_count = CardScorer.count_keyword_occurrences(desc, CardScorer.DESTROY_KEYWORDS)
        banish_count = CardScorer.count_keyword_occurrences(desc, CardScorer.BANISH_KEYWORDS)
        score += min((destroy_count + banish_count) * 20, 40)
        
        if 'destroy' in desc and 'target' not in desc:
            score += 15
        
        if 'return' in desc or 'banish' in desc or 'send' in desc:
            score += 15
        
        return min(score, 100)
    
    @staticmethod
    def score_resource_generation(card):
        """Score resource generation"""
        desc = card.get('desc', '').lower()
        score = 0
        
        if 'gain' in desc and 'lp' in desc:
            score += 10
        
        counter_count = CardScorer.count_keyword_occurrences(desc, CardScorer.COUNTER_KEYWORDS)
        score += min(counter_count * 20, 40)
        
        if 'attach' in desc or 'material' in desc:
            score += 25
        
        return min(score, 100)
    
    @staticmethod
    def calculate_card_scores(card):
        """Calculate all scores for a single card"""
        return {
            'cardAdvantage': CardScorer.score_card_advantage(card),
            'boardPresence': CardScorer.score_board_presence(card),
            'disruption': CardScorer.score_disruption(card),
            'protection': CardScorer.score_protection(card),
            'comboExtender': CardScorer.score_combo_extender(card),
            'spellTrapSynergy': CardScorer.score_spell_trap_synergy(card),
            'extraDeckAccess': CardScorer.score_extra_deck_access(card),
            'removal': CardScorer.score_removal(card),
            'resourceGeneration': CardScorer.score_resource_generation(card),
        }

def calculate_synergy_multiplier(card1, card2):
    """Calculate synergy multiplier between two cards"""
    multiplier = 1.0
    
    arch1 = card1.get('archetype')
    arch2 = card2.get('archetype')
    if arch1 and arch2 and arch1 == arch2:
        multiplier *= 1.5
    
    type1 = card1.get('type', '')
    type2 = card2.get('type', '')
    
    if ('Monster' in type1 and 'Equip' in type2) or ('Monster' in type2 and 'Equip' in type1):
        multiplier *= 1.2
    
    if ('Monster' in type1 and ('Quick-Play' in type2 or 'Trap' in type2)) or \
       ('Monster' in type2 and ('Quick-Play' in type1 or 'Trap' in type1)):
        multiplier *= 1.15
    
    desc1 = card1.get('desc', '').lower()
    desc2 = card2.get('desc', '').lower()
    
    if ('search' in desc1 or 'add' in desc1) and 'special summon' in desc2:
        multiplier *= 1.3
    elif ('search' in desc2 or 'add' in desc2) and 'special summon' in desc1:
        multiplier *= 1.3
    
    return min(multiplier, 2.0)

def score_combination(card1, card2):
    """Score a 2-card combination"""
    scores1 = CardScorer.calculate_card_scores(card1)
    scores2 = CardScorer.calculate_card_scores(card2)
    
    combined_scores = {}
    for metric in WEIGHTS.keys():
        combined_scores[metric] = (scores1[metric] + scores2[metric]) / 2
    
    weighted_total = sum(combined_scores[metric] * WEIGHTS[metric] for metric in WEIGHTS.keys())
    synergy_multiplier = calculate_synergy_multiplier(card1, card2)
    final_score = weighted_total * synergy_multiplier
    
    return {
        'scores': combined_scores,
        'synergyMultiplier': synergy_multiplier,
        'totalScore': round(final_score, 2)
    }

def generate_explanation(card1, card2, score_data):
    """Generate explanation for why cards synergize"""
    explanations = []
    
    if card1.get('archetype') and card1.get('archetype') == card2.get('archetype'):
        explanations.append(f"Both cards belong to the {card1.get('archetype')} archetype")
    
    scores = score_data['scores']
    top_metrics = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:2]
    
    for metric, score in top_metrics:
        if score >= 50:
            metric_name = metric.replace('_', ' ').title()
            explanations.append(f"High {metric_name} synergy (score: {score:.0f})")
    
    if not explanations:
        explanations.append("Cards provide complementary effects")
    
    return ". ".join(explanations) + "."

def load_cards():
    """Load cards from JSON file"""
    print(f"Loading cards from {CARDS_FILE}...")
    try:
        with open(CARDS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data['cards']
    except Exception as e:
        print(f"Error loading cards: {e}")
        return None

def main():
    """Main execution function"""
    print("=" * 60)
    print("Yu-Gi-Oh Card Combination Ranking Calculator (OPTIMIZED)")
    print("=" * 60)
    
    cards = load_cards()
    if not cards:
        print("Failed to load cards. Please run fetch_cards.py first.")
        return
    
    print(f"✓ Loaded {len(cards)} cards")
    
    # Filter out cards without descriptions
    cards = [c for c in cards if c.get('desc')]
    print(f"✓ Filtered to {len(cards)} cards with descriptions")
    
    # OPTIMIZATION: Limit to first 3000 cards for faster processing
    # You can remove this limit or adjust it
    if len(cards) > 3000:
        print(f"\n⚠️  OPTIMIZATION: Using first 3000 cards for faster processing")
        print(f"   To analyze all cards, remove the limit in the script")
        cards = cards[:3000]
    
    total_combinations = len(cards) * (len(cards) - 1) // 2
    print(f"\nTotal combinations to analyze: {total_combinations:,}")
    
    # Score combinations in batches
    print(f"\nScoring combinations (batch size: {BATCH_SIZE:,})...")
    print(f"Minimum score threshold: {MIN_SCORE_THRESHOLD}")
    
    ranked_combinations = []
    batch_count = 0
    
    combo_iter = combinations(cards, 2)
    
    with tqdm(total=total_combinations, desc="Processing") as pbar:
        batch = []
        for card1, card2 in combo_iter:
            score_data = score_combination(card1, card2)
            
            # Only keep combinations above threshold
            if score_data['totalScore'] >= MIN_SCORE_THRESHOLD:
                batch.append({
                    'card1': {
                        'id': card1['id'],
                        'name': card1['name'],
                        'type': card1['type'],
                        'image_url_small': card1.get('image_url_small', '')
                    },
                    'card2': {
                        'id': card2['id'],
                        'name': card2['name'],
                        'type': card2['type'],
                        'image_url_small': card2.get('image_url_small', '')
                    },
                    **score_data
                })
            
            pbar.update(1)
            
            # Process batch
            if len(batch) >= BATCH_SIZE:
                ranked_combinations.extend(batch)
                batch = []
                batch_count += 1
                
                # Sort and keep only top N to save memory
                ranked_combinations.sort(key=lambda x: x['totalScore'], reverse=True)
                ranked_combinations = ranked_combinations[:TOP_N * 2]  # Keep 2x for safety
        
        # Add remaining batch
        if batch:
            ranked_combinations.extend(batch)
    
    print(f"\n✓ Found {len(ranked_combinations):,} combinations above threshold")
    
    # Final sort and take top N
    print(f"\nRanking top {TOP_N:,} combinations...")
    ranked_combinations.sort(key=lambda x: x['totalScore'], reverse=True)
    top_combinations = ranked_combinations[:TOP_N]
    
    # Add rank and explanation
    print("Generating explanations...")
    for i, combo in enumerate(tqdm(top_combinations, desc="Explanations"), 1):
        combo['rank'] = i
        card1_full = next(c for c in cards if c['id'] == combo['card1']['id'])
        card2_full = next(c for c in cards if c['id'] == combo['card2']['id'])
        combo['explanation'] = generate_explanation(card1_full, card2_full, combo)
    
    # Export to JSON
    print(f"\nExporting to {OUTPUT_FILE}...")
    output_data = {
        'metadata': {
            'totalCombinations': total_combinations,
            'scoredCombinations': len(ranked_combinations),
            'topN': TOP_N,
            'generationDate': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'weights': WEIGHTS,
            'cardsAnalyzed': len(cards),
            'minScoreThreshold': MIN_SCORE_THRESHOLD
        },
        'rankings': top_combinations
    }
    
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Successfully exported rankings")
        
        file_size = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)
        print(f"✓ File size: {file_size:.2f} MB")
        
        # Print top 5
        print("\n" + "=" * 60)
        print("Top 5 Combinations:")
        print("=" * 60)
        for combo in top_combinations[:5]:
            print(f"\n#{combo['rank']}: {combo['card1']['name']} + {combo['card2']['name']}")
            print(f"  Score: {combo['totalScore']:.2f}")
            print(f"  Synergy: {combo['synergyMultiplier']:.2f}x")
            print(f"  {combo['explanation']}")
        
        print("\n" + "=" * 60)
        print("✓ COMPLETE!")
        print("=" * 60)
        
    except Exception as e:
        print(f"Error exporting rankings: {e}")

if __name__ == "__main__":
    main()
