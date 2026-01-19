# Yu-Gi-Oh Card Combination Rankings

An algorithm-driven web application that analyzes and ranks all possible 2-card Yu-Gi-Oh combinations using objective scoring metrics. Unlike traditional tier lists based on tournament results, this project provides a theoretical, computational analysis of card synergies based on measurable game mechanics.

🔗 **[Live Demo](#)** (Deploy to Vercel to get your URL)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Scoring Algorithm](#scoring-algorithm)
- [Deployment](#deployment)
- [Updating Rankings](#updating-rankings)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project analyzes **every possible 2-card combination** in Yu-Gi-Oh and ranks them based on a comprehensive scoring algorithm that evaluates:

- Card Advantage (draw/search effects)
- Board Presence (special summons, tokens)
- Disruption Potential (negation, destruction)
- Protection & Sustainability
- Combo Extension capabilities
- Spell/Trap Synergy
- Extra Deck Access
- Removal capabilities
- Resource Generation

The top 10,000 combinations are ranked and displayed in an interactive web interface with advanced filtering and search capabilities.

## ✨ Features

### Frontend
- 🎨 **Modern, responsive UI** with glassmorphism design
- 🔍 **Advanced search & filtering** by card type, archetype, score, etc.
- 📊 **Interactive visualizations** with radar charts
- 📱 **Mobile-friendly** responsive design
- 🌙 **Dark mode** optimized for card game aesthetics
- ⚡ **Fast performance** with lazy loading and code splitting

### Backend (Python)
- 🔄 **Automated data fetching** from YGOPRODeck API
- 🧮 **9-metric scoring algorithm** with synergy multipliers
- 📈 **Scalable combination generation** handling millions of combos
- 💾 **Optimized JSON export** for web deployment

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Recharts (data visualization)

**Backend:**
- Python 3.8+
- Requests (API calls)
- tqdm (progress tracking)

**Deployment:**
- Vercel (static hosting)

## 📁 Project Structure

```
yugioh-rankings/
├── data-processing/          # Python scripts (run locally)
│   ├── fetch_cards.py        # Fetch card data from API
│   ├── calculate_rankings.py # Calculate and rank combinations
│   └── requirements.txt      # Python dependencies
├── public/                   # Static assets
│   ├── rankings.json         # Top 10,000 ranked combinations
│   └── cards.json            # All card data
├── src/                      # React application
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── CombinationCard.jsx
│   │   ├── FilterPanel.jsx
│   │   └── Pagination.jsx
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx
│   │   ├── RankingsPage.jsx
│   │   ├── CombinationDetailPage.jsx
│   │   └── AboutPage.jsx
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Node dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm (for frontend)
- **Python** 3.8+ (for data processing)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yugioh-rankings.git
   cd yugioh-rankings
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   cd data-processing
   pip install -r requirements.txt
   cd ..
   ```

### Generate Rankings Data

Before running the app, you need to generate the card data and rankings:

1. **Fetch card data from API**
   ```bash
   cd data-processing
   python fetch_cards.py
   ```
   This will create `public/cards.json` (~5-10 MB)

2. **Calculate rankings** (this may take several minutes)
   ```bash
   python calculate_rankings.py
   ```
   This will create `public/rankings.json` with the top 10,000 combinations

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage

### Browsing Rankings

1. Navigate to the **Rankings** page
2. Use the search bar to find specific cards
3. Apply filters to narrow down results:
   - Card Type (Monster/Spell/Trap)
   - Monster Type (Fusion, Synchro, XYZ, etc.)
   - Spell/Trap Types
   - Combination Type
   - Minimum Score
4. Sort by Rank, Score, or Synergy
5. Click on any combination to view detailed analysis

### Understanding Scores

- **Total Score**: Weighted sum of all metrics multiplied by synergy
- **Synergy Multiplier**: 1.0x - 2.0x based on archetype and effect synergy
- **Individual Metrics**: Each scored 0-100 based on card effects

## 🧮 Scoring Algorithm

### Metrics (0-100 each)

1. **Card Advantage**: Draw/search effects, deck thinning
2. **Board Presence**: Special summons, tokens, field presence
3. **Disruption**: Negation, destruction, banishment, hand disruption
4. **Protection**: Targeting/destruction immunity, recursion
5. **Combo Extender**: Search, special summon enablers
6. **Spell/Trap Synergy**: Quick-Play, Counter, Continuous effects
7. **Extra Deck Access**: Fusion/Synchro/XYZ/Link enablers
8. **Removal**: Spot and mass removal capabilities
9. **Resource Generation**: LP, counters, materials

### Synergy Multipliers

- **Same Archetype**: 1.5x
- **Complementary Effects**: 1.3x (e.g., search + special summon)
- **Type Synergy**: 1.2x (e.g., Monster + Equip Spell)

### Formula

```
Total Score = (Σ weighted_metric_scores) × synergy_multiplier
```

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   
   **Option A: Using Vercel CLI**
   ```bash
   vercel
   ```
   
   **Option B: Using Vercel Dashboard**
   - Push your code to GitHub
   - Import the repository in [Vercel Dashboard](https://vercel.com)
   - Vercel will auto-detect Vite and deploy

4. **Configure**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

Your app will be live at `https://your-project.vercel.app`

## 🔄 Updating Rankings

To regenerate rankings with updated card data:

1. **Fetch latest cards**
   ```bash
   cd data-processing
   python fetch_cards.py
   ```

2. **Recalculate rankings**
   ```bash
   python calculate_rankings.py
   ```

3. **Rebuild and redeploy**
   ```bash
   cd ..
   npm run build
   vercel --prod
   ```

### Customizing Scoring Weights

Edit `data-processing/calculate_rankings.py`:

```python
WEIGHTS = {
    'cardAdvantage': 1.5,      # Increase importance
    'boardPresence': 1.0,
    'disruption': 1.2,
    # ... etc
}
```

Then recalculate rankings.

## ⚠️ Limitations

- **Text-based analysis**: Keyword matching may miss nuanced interactions
- **No game simulation**: Doesn't account for timing, costs, or restrictions
- **Theoretical scores**: High scores ≠ competitive viability
- **2-card scope**: Many competitive combos require 3+ cards
- **API dependency**: Requires YGOPRODeck API availability

## 🤝 Contributing

Contributions are welcome! Here are some ways to help:

- 🐛 Report bugs or suggest features via [Issues](https://github.com/yourusername/yugioh-rankings/issues)
- 🔧 Improve the scoring algorithm
- 🎨 Enhance the UI/UX
- 📝 Improve documentation
- ✨ Add new features (3-card combos, deck builder, etc.)

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Card Data**: [YGOPRODeck API](https://db.ygoprodeck.com/)
- **Inspiration**: Computational Pokémon type combination analysis
- **Community**: Yu-Gi-Oh players and theorycrafters

---

**Note**: This is a fan project and is not affiliated with Konami or Yu-Gi-Oh. All card names, images, and data are property of their respective owners.

## 📞 Contact

Questions or feedback? Open an issue or reach out!

**Happy dueling! ⚡**
