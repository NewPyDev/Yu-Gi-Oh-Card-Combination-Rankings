# Quick Start Guide - Yu-Gi-Oh Combo Rankings

## Prerequisites Check

Before starting, ensure you have:
- [ ] **Node.js 16+** installed (download from https://nodejs.org/)
- [ ] **Python 3.8+** installed
- [ ] **Git** installed (optional, for version control)

## Step-by-Step Setup

### 1. Install Node.js Dependencies

```bash
# Navigate to project directory
cd d:\YuGiOh

# Install all npm packages
npm install
```

This will install:
- React, React Router, Recharts
- Vite (build tool)
- Tailwind CSS
- All other dependencies

**Expected time**: 2-3 minutes

---

### 2. Install Python Dependencies

```bash
# Navigate to data-processing folder
cd data-processing

# Install Python packages
pip install -r requirements.txt
```

This will install:
- requests (for API calls)
- tqdm (progress bars)
- python-dotenv (configuration)

**Expected time**: 1 minute

---

### 3. Fetch Card Data

```bash
# Make sure you're in data-processing folder
python fetch_cards.py
```

**What this does**:
- Fetches all Yu-Gi-Oh cards from YGOPRODeck API
- Parses Monster, Spell, and Trap cards
- Creates `public/cards.json` (~5-10 MB)

**Expected time**: 1-2 minutes
**Expected output**: "✓ Successfully exported cards to ../public/cards.json"

---

### 4. Calculate Rankings

```bash
# Still in data-processing folder
python calculate_rankings.py
```

**What this does**:
- Generates all 2-card combinations
- Scores each combination across 9 metrics
- Ranks and exports top 10,000 to `public/rankings.json`

**Expected time**: 10-30 minutes (depending on your system)
**Expected output**: 
- Progress bar showing combination scoring
- "✓ Successfully exported rankings to ../public/rankings.json"
- Top 5 combinations displayed

**⚠️ Note**: This is computationally intensive! With 12,000+ cards, you're analyzing millions of combinations.

---

### 5. Run Development Server

```bash
# Navigate back to project root
cd ..

# Start the development server
npm run dev
```

**Expected output**:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Open your browser** to `http://localhost:5173`

---

## Troubleshooting

### "npm is not recognized"
- **Solution**: Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "python is not recognized"
- **Solution**: Install Python from https://python.org/
- Make sure to check "Add Python to PATH" during installation

### API fetch fails
- **Solution**: Check your internet connection
- The YGOPRODeck API might be temporarily down
- Try again in a few minutes

### Rankings calculation is too slow
- **Solution**: This is normal! It's analyzing millions of combinations
- You can reduce `TOP_N` in `calculate_rankings.py` to export fewer combinations
- Or add filters to analyze only specific card types

### Port 5173 already in use
- **Solution**: Kill the process using that port or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

---

## File Size Expectations

After running the scripts, you should have:

- `public/cards.json`: ~5-10 MB
- `public/rankings.json`: ~5-15 MB (for top 10,000)

If files are larger than 15 MB, consider:
- Reducing `TOP_N` in `calculate_rankings.py`
- Implementing compression
- Splitting into multiple files

---

## Building for Production

Once everything works in development:

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` folder.

---

## Deploying to Vercel

### Option 1: GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite and deploys!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Common Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Python Scripts
python fetch_cards.py           # Fetch card data
python calculate_rankings.py    # Calculate rankings

# Updating Data
# 1. Re-fetch cards
cd data-processing
python fetch_cards.py

# 2. Recalculate rankings
python calculate_rankings.py

# 3. Rebuild frontend
cd ..
npm run build
```

---

## What to Expect

### First Time Setup
- Total time: ~15-35 minutes
- Most time spent on ranking calculation

### Subsequent Updates
- Fetching cards: ~1-2 minutes
- Recalculating rankings: ~10-30 minutes
- Rebuilding frontend: ~30 seconds

---

## Need Help?

1. Check the [README.md](file:///d:/YuGiOh/README.md) for detailed documentation
2. Review the [walkthrough.md](file:///C:/Users/hami/.gemini/antigravity/brain/f98ef01b-f868-48e0-9c06-87f748e96af0/walkthrough.md) for implementation details
3. Check console errors for specific issues

---

## Success Checklist

After setup, you should be able to:
- [ ] See the homepage with stats
- [ ] Browse rankings with filters
- [ ] Search for specific cards
- [ ] View detailed combination analysis
- [ ] See radar charts on detail pages
- [ ] Navigate between pages smoothly
- [ ] Use filters and pagination

If all checkboxes are ✓, you're ready to deploy! 🎉
