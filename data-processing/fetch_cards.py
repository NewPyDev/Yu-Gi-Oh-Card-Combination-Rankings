"""
Yu-Gi-Oh Card Data Fetcher
Fetches all card data from YGOPRODeck API and exports to JSON
"""

import requests
import json
import time
from datetime import datetime
from tqdm import tqdm

API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
OUTPUT_FILE = "../public/cards.json"

def fetch_all_cards():
    """Fetch all cards from YGOPRODeck API"""
    print("Fetching card data from YGOPRODeck API...")
    
    try:
        response = requests.get(API_URL, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        if 'data' not in data:
            print("Error: Unexpected API response format")
            return None
        
        return data['data']
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def parse_card_data(raw_cards):
    """Parse and structure card data"""
    print(f"\nParsing {len(raw_cards)} cards...")
    
    parsed_cards = []
    
    for card in tqdm(raw_cards):
        try:
            # Basic info
            parsed_card = {
                'id': str(card.get('id', '')),
                'name': card.get('name', ''),
                'type': card.get('type', ''),
                'desc': card.get('desc', ''),
                'race': card.get('race', ''),
                'archetype': card.get('archetype', None),
            }
            
            # Card images
            if 'card_images' in card and len(card['card_images']) > 0:
                parsed_card['image_url'] = card['card_images'][0].get('image_url', '')
                parsed_card['image_url_small'] = card['card_images'][0].get('image_url_small', '')
            else:
                parsed_card['image_url'] = ''
                parsed_card['image_url_small'] = ''
            
            # Monster-specific attributes
            if 'Monster' in parsed_card['type']:
                parsed_card['attribute'] = card.get('attribute', '')
                parsed_card['level'] = card.get('level', None)
                parsed_card['atk'] = card.get('atk', None)
                parsed_card['def'] = card.get('def', None)
                
                # For XYZ monsters
                if 'rank' in card:
                    parsed_card['rank'] = card.get('rank', None)
                
                # For Link monsters
                if 'linkval' in card:
                    parsed_card['link_value'] = card.get('linkval', None)
                    parsed_card['linkmarkers'] = card.get('linkmarkers', [])
                
                # For Pendulum monsters
                if 'scale' in card:
                    parsed_card['scale'] = card.get('scale', None)
            
            # Spell/Trap specific
            elif 'Spell' in parsed_card['type'] or 'Trap' in parsed_card['type']:
                # Race field contains the spell/trap type (e.g., "Quick-Play", "Counter")
                parsed_card['card_subtype'] = parsed_card['race']
            
            parsed_cards.append(parsed_card)
            
        except Exception as e:
            print(f"\nError parsing card {card.get('name', 'Unknown')}: {e}")
            continue
    
    return parsed_cards

def export_to_json(cards):
    """Export cards to JSON file"""
    print(f"\nExporting {len(cards)} cards to {OUTPUT_FILE}...")
    
    output_data = {
        'metadata': {
            'totalCards': len(cards),
            'fetchDate': datetime.now().strftime('%Y-%m-%d'),
            'apiVersion': 'v7',
            'source': 'YGOPRODeck API'
        },
        'cards': cards
    }
    
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Successfully exported cards to {OUTPUT_FILE}")
        
        # Print file size
        import os
        file_size = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)  # Convert to MB
        print(f"✓ File size: {file_size:.2f} MB")
        
        return True
    
    except Exception as e:
        print(f"Error exporting to JSON: {e}")
        return False

def main():
    """Main execution function"""
    print("=" * 60)
    print("Yu-Gi-Oh Card Data Fetcher")
    print("=" * 60)
    
    # Fetch cards
    raw_cards = fetch_all_cards()
    if not raw_cards:
        print("Failed to fetch cards. Exiting.")
        return
    
    print(f"✓ Successfully fetched {len(raw_cards)} cards")
    
    # Parse cards
    parsed_cards = parse_card_data(raw_cards)
    print(f"✓ Successfully parsed {len(parsed_cards)} cards")
    
    # Export to JSON
    success = export_to_json(parsed_cards)
    
    if success:
        print("\n" + "=" * 60)
        print("Card data fetch complete!")
        print("=" * 60)
        
        # Print some statistics
        monster_count = sum(1 for c in parsed_cards if 'Monster' in c['type'])
        spell_count = sum(1 for c in parsed_cards if 'Spell' in c['type'])
        trap_count = sum(1 for c in parsed_cards if 'Trap' in c['type'])
        
        print(f"\nCard Statistics:")
        print(f"  Monsters: {monster_count}")
        print(f"  Spells:   {spell_count}")
        print(f"  Traps:    {trap_count}")
        print(f"  Total:    {len(parsed_cards)}")

if __name__ == "__main__":
    main()
