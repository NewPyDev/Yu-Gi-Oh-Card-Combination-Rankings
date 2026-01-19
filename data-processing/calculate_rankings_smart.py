"""
Yu-Gi-Oh Card Combination Ranking Calculator - SMART VERSION
Uses Inverted Index and Heuristics to analyze ALL cards efficiently.
This effectively reduces the search space from ~72 million to ~5 million comparisons.
"""

import json
from itertools import combinations
from datetime import datetime
from tqdm import tqdm
import os
import sys
from collections import defaultdict

# Import scoring logic (assuming it's in the same folder)
# We'll copy minimal needed logic to make this standalone and faster
# or import if possible. To be safe/standalone, I'll allow it to run on its own.

CARDS_FILE = "../public/cards.json"
OUTPUT_FILE = "../public/rankings.json"
TOP_N = 10000
MIN_SCORE_THRESHOLD = 100

# Optimization: Keywords to build index on
# Only pairs sharing these properties will be heavily scored
SYNERGY_KEYS = [
    'archetype', # Most important
    'draw', 'search', 'add', 'special summon', 
    'negate', 'destroy', 'banish', 'discard',
    'fusion', 'synchro', 'xyz', 'link', 'ritual',
    'token', 'counter', 'equip', 'continuous', 'field'
]

def load_cards():
    print(f"Loading cards from {CARDS_FILE}...")
    try:
        with open(CARDS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data['cards']
    except Exception as e:
        print(f"Error loading cards: {e}")
        return None

def build_inverted_index(cards):
    """
    Builds a map of {keyword: [card_indices]}
    This allows us to quickly find potential partners.
    """
    print("Building smart search index...")
    index = defaultdict(list)
    generic_power_cards = []
    
    for idx, card in enumerate(tqdm(cards)):
        desc = card.get('desc', '').lower()
        
        # 1. Index by Archetype
        if 'archetype' in card:
            index[f"ARCH_{card['archetype']}"].append(idx)
            
        # 2. Index by Mechanics (Keywords)
        for key in SYNERGY_KEYS:
            if key == 'archetype': continue
            if key in desc:
                index[f"MECH_{key}"].append(idx)
        
        # 3. Identify "Power Cards" (Generic good cards)
        # These are checked against everything
        # Simple heuristic: Cards with multiple strong effects
        score_potential = 0
        if 'draw' in desc: score_potential += 1
        if 'special summon' in desc: score_potential += 1
        if 'negate' in desc: score_potential += 1
        if 'destroy' in desc: score_potential += 1
        if 'search' in desc: score_potential += 1
        
        if score_potential >= 2:
            generic_power_cards.append(idx)
            
    print(f"✓ Index built with {len(index)} keys")
    print(f"✓ Found {len(generic_power_cards)} generic power cards")
    return index, generic_power_cards

def main():
    print("=" * 60)
    print("Yu-Gi-Oh Smart Ranking Calculator")
    print("Analyzes ALL cards using intelligent filtering")
    print("=" * 60)
    
    # 1. Load Data
    cards = load_cards()
    if not cards: return

    # Filter: Remove Vanilla monsters (no desc usually means no effect or normal)
    # Actually Normal monsters have flavor text. 
    # Better filter: Type != 'Normal Monster'
    cards = [c for c in cards if 'Normal Monster' not in c.get('type', '')]
    print(f"✓ Filtered to {len(cards)} Effect Monsters/Spells/Traps")
    
    # 2. Build Index for fast lookups
    index, power_indices = build_inverted_index(cards)
    
    # 3. Generate Candidate Pairs (Using Set to avoid duplicates)
    print("\nGenerating candidate pairs...")
    candidate_pairs = set()
    
    # A. Archetype Matches (Highest Synergy)
    for key, indices in index.items():
        if key.startswith("ARCH_") and len(indices) > 1:
            # All pairs within this archetype
            for i in range(len(indices)):
                for j in range(i + 1, len(indices)):
                    p1, p2 = indices[i], indices[j]
                    if p1 > p2: p1, p2 = p2, p1
                    candidate_pairs.add((p1, p2))
    
    print(f"✓ Archetype pairs found: {len(candidate_pairs):,}")
    
    # B. Mechanism Matches (Medium Synergy - limit search space)
    # Only if lists are not too huge. 
    mech_pairs_count = 0
    for key, indices in index.items():
        if key.startswith("MECH_") and len(indices) < 500: # optimization
             for i in range(len(indices)):
                for j in range(i + 1, len(indices)):
                    p1, p2 = indices[i], indices[j]
                    if p1 > p2: p1, p2 = p2, p1
                    candidate_pairs.add((p1, p2))
                    mech_pairs_count += 1
    
    print(f"✓ Mechanism pairs added")
    
    # C. Power Card Cross-Product (Generic Synergy)
    # Compare power cards with everything else
    # Limit to top power cards to avoid explosion
    power_indices = power_indices[:1000] 
    for p_idx in power_indices:
        for other_idx in range(len(cards)):
            if p_idx == other_idx: continue
            p1, p2 = p_idx, other_idx
            if p1 > p2: p1, p2 = p2, p1
            candidate_pairs.add((p1, p2))
            
    print(f"✓ Total candidates to score: {len(candidate_pairs):,}")
    print("  (Reduced from original ~{:,})".format(len(cards)**2 // 2))

    # 4. Import full scoring logic
    sys.path.insert(0, os.path.dirname(__file__))
    try:
        from calculate_rankings import score_combination, generate_explanation, WEIGHTS
    except ImportError:
        print("Error: detailed scoring logic not found. Run main script first.")
        return

    # 5. Score Candidates
    print("\nScoring candidates...")
    ranked_combinations = []
    
    # Convert set to list for iteration
    candidates_list = list(candidate_pairs)
    
    # Process in batches to save memory
    batch_size = 50000
    for i in tqdm(range(0, len(candidates_list), batch_size)):
        batch = candidates_list[i : i + batch_size]
        
        for idx1, idx2 in batch:
            card1 = cards[idx1]
            card2 = cards[idx2]
            
            score_data = score_combination(card1, card2)
            
            if score_data['totalScore'] >= MIN_SCORE_THRESHOLD:
                 ranked_combinations.append({
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
        
        # Periodic cleanup
        if len(ranked_combinations) > TOP_N * 3:
            ranked_combinations.sort(key=lambda x: x['totalScore'], reverse=True)
            ranked_combinations = ranked_combinations[:TOP_N * 2]

    # 6. Final Sort and Export
    print(f"\nRanking top {TOP_N:,}...")
    ranked_combinations.sort(key=lambda x: x['totalScore'], reverse=True)
    top_combinations = ranked_combinations[:TOP_N]
    
    print("Generating explanations...")
    for i, combo in enumerate(top_combinations, 1):
        combo['rank'] = i
        # Find full card data again
        c1_id = combo['card1']['id']
        c2_id = combo['card2']['id']
        card1_full = next(c for c in cards if c['id'] == c1_id)
        card2_full = next(c for c in cards if c['id'] == c2_id)
        combo['explanation'] = generate_explanation(card1_full, card2_full, combo)

    print(f"Exporting to {OUTPUT_FILE}...")
    output_data = {
        'metadata': {
            'totalCombinations': len(cards)**2 // 2, # Theoretical total
            'scoredCombinations': len(ranked_combinations),
            'topN': TOP_N,
            'generationDate': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'type': 'SMART_ANALYSIS',
            'cardsAnalyzed': len(cards)
        },
        'rankings': top_combinations
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print("✓ DONE!")

if __name__ == "__main__":
    main()
