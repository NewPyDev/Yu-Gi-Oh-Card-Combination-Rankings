"""
Yu-Gi-Oh Card Combination Ranking Calculator - QUICK TEST VERSION
Analyzes only 500 cards for fast testing (~30 seconds)
"""

import json
from itertools import combinations
from datetime import datetime
from tqdm import tqdm
import os
import sys

# Import the scoring functions from the main script
sys.path.insert(0, os.path.dirname(__file__))
from calculate_rankings import CardScorer, calculate_synergy_multiplier, score_combination, generate_explanation, WEIGHTS

CARDS_FILE = "../public/cards.json"
OUTPUT_FILE = "../public/rankings.json"
TOP_N = 1000  # Export top 1000 for quick testing
CARD_LIMIT = 500  # Only analyze first 500 cards
MIN_SCORE_THRESHOLD = 100

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
    print("Yu-Gi-Oh Combo Rankings - QUICK TEST VERSION")
    print("=" * 60)
    print(f"⚡ Analyzing only {CARD_LIMIT} cards for fast testing")
    print(f"⚡ This should complete in ~30 seconds")
    print("=" * 60)
    
    cards = load_cards()
    if not cards:
        print("Failed to load cards. Please run fetch_cards.py first.")
        return
    
    print(f"✓ Loaded {len(cards)} cards")
    
    # Filter and limit
    cards = [c for c in cards if c.get('desc')]
    cards = cards[:CARD_LIMIT]
    print(f"✓ Using {len(cards)} cards for analysis")
    
    total_combinations = len(cards) * (len(cards) - 1) // 2
    print(f"\nTotal combinations: {total_combinations:,}")
    
    # Score all combinations
    print(f"\nScoring combinations...")
    ranked_combinations = []
    
    for card1, card2 in tqdm(combinations(cards, 2), total=total_combinations):
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
    
    print(f"\n✓ Found {len(ranked_combinations):,} combinations above threshold")
    
    # Sort and take top N
    ranked_combinations.sort(key=lambda x: x['totalScore'], reverse=True)
    top_combinations = ranked_combinations[:TOP_N]
    
    # Add rank and explanation
    print("Generating explanations...")
    for i, combo in enumerate(top_combinations, 1):
        combo['rank'] = i
        card1_full = next(c for c in cards if c['id'] == combo['card1']['id'])
        card2_full = next(c for c in cards if c['id'] == combo['card2']['id'])
        combo['explanation'] = generate_explanation(card1_full, card2_full, combo)
    
    # Export
    print(f"\nExporting to {OUTPUT_FILE}...")
    output_data = {
        'metadata': {
            'totalCombinations': total_combinations,
            'scoredCombinations': len(ranked_combinations),
            'topN': len(top_combinations),
            'generationDate': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'weights': WEIGHTS,
            'cardsAnalyzed': len(cards),
            'minScoreThreshold': MIN_SCORE_THRESHOLD,
            'testVersion': True
        },
        'rankings': top_combinations
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
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
    
    print("\n" + "=" * 60)
    print("✓ QUICK TEST COMPLETE!")
    print("=" * 60)
    print("\nTo analyze all cards, run: python calculate_rankings.py")

if __name__ == "__main__":
    main()
