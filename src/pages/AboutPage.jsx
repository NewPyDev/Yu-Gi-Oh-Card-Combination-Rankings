export default function AboutPage() {
    const metrics = [
        {
            name: 'Card Advantage',
            description: 'Measures draw effects, search effects, and deck thinning capabilities. Cards that generate multiple cards or search for combo pieces score higher.',
            scoring: [
                'Draw effects: +20 per card drawn',
                'Search effects: +15 per card searched',
                'Multi-card generation: +25 bonus',
            ]
        },
        {
            name: 'Board Presence',
            description: 'Evaluates the ability to establish and maintain field presence through special summons, token generation, and continuous effects.',
            scoring: [
                'Special summon: +30 per monster',
                'Token generation: +15 per token',
                'Continuous presence: +10',
            ]
        },
        {
            name: 'Disruption Potential',
            description: 'Scores negation effects, destruction, banishment, and hand disruption. Counter Traps receive bonus points for their high priority.',
            scoring: [
                'Omni-negates: +40',
                'Mass destruction: +35',
                'Banishment: +30',
                'Hand disruption: +25 per card',
            ]
        },
        {
            name: 'Protection/Sustainability',
            description: 'Measures protection from targeting/destruction, recursion from graveyard, and self-revival capabilities.',
            scoring: [
                'Targeting/destruction protection: +20 each',
                'Graveyard recursion: +25',
                'Continuous protection: +30',
            ]
        },
        {
            name: 'Combo Extender',
            description: 'Evaluates cards that enable longer combo chains through searches, special summons from deck, and multi-effect cards.',
            scoring: [
                'Special summon from deck: +35',
                'Special summon from hand: +30',
                'Search combo pieces: +25',
            ]
        },
        {
            name: 'Spell/Trap Synergy',
            description: 'Scores spell and trap cards based on their speed and utility. Quick-Play Spells and Counter Traps receive bonuses.',
            scoring: [
                'Counter Trap: +25',
                'Continuous effects: +30',
                'Quick-Play Spell: +20',
                'Field Spell: +25',
            ]
        },
        {
            name: 'Extra Deck Access',
            description: 'Measures the ability to summon Extra Deck monsters (Fusion, Synchro, XYZ, Link). Enabling multiple types provides bonus points.',
            scoring: [
                'Each summon type enabled: +30',
                'Multiple types bonus: +20',
            ]
        },
        {
            name: 'Removal',
            description: 'Evaluates removal capabilities including spot removal, mass removal, and non-targeting/non-destruction removal.',
            scoring: [
                'Mass removal: +50',
                'Spot removal: +20 per target',
                'Non-targeting/non-destruction: +15 bonus each',
            ]
        },
        {
            name: 'Resource Generation',
            description: 'Scores LP gain, counter generation, material generation, and resource conversion effects.',
            scoring: [
                'Counter generation: +20',
                'Material generation: +25',
                'LP gain: +10 per 1000 LP',
            ]
        },
    ]

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="section-title">About This Project</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        An algorithm-driven approach to analyzing Yu-Gi-Oh card combinations
                    </p>
                </div>

                {/* Concept */}
                <section className="glass-effect rounded-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-yugioh-gold mb-4">The Concept</h2>
                    <div className="text-gray-300 space-y-4 leading-relaxed">
                        <p>
                            This project was inspired by computational analyses that exhaustively evaluate all possible combinations in a game system. Instead of relying on tournament results or meta tier lists, we use <strong className="text-white">objective scoring algorithms</strong> to evaluate every possible 2-card combination in Yu-Gi-Oh.
                        </p>
                        <p>
                            The goal is to discover <strong className="text-white">theoretical potential</strong> - which card combinations have the highest synergy based on measurable game mechanics, regardless of whether they see competitive play.
                        </p>
                        <p>
                            By analyzing combinations across 9 different metrics and applying synergy multipliers, we can identify hidden gems and underrated combos that might be overlooked in traditional analysis.
                        </p>
                    </div>
                </section>

                {/* Methodology */}
                <section className="glass-effect rounded-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-yugioh-gold mb-6">Methodology</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">1. Data Collection</h3>
                            <p className="text-gray-300">
                                All card data is fetched from the <a href="https://db.ygoprodeck.com/api-guide/" target="_blank" rel="noopener noreferrer" className="text-yugioh-blue hover:underline">YGOPRODeck API</a>, which provides comprehensive information on every Yu-Gi-Oh card including effects, types, and attributes.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">2. Combination Generation</h3>
                            <p className="text-gray-300">
                                We generate all possible 2-card combinations (C(n,2) where n = total cards). With over 12,000 cards, this creates millions of possible combinations to analyze.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">3. Scoring Algorithm</h3>
                            <p className="text-gray-300 mb-3">
                                Each combination is scored across 9 metrics by analyzing card effect text using keyword matching and pattern recognition. Scores are averaged between both cards and weighted.
                            </p>
                            <div className="card-gradient rounded-lg p-4">
                                <p className="text-sm font-mono text-gray-300">
                                    Total Score = (Σ weighted_metric_scores) × synergy_multiplier
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">4. Synergy Multipliers</h3>
                            <p className="text-gray-300">
                                Combinations receive multipliers (1.0x - 2.0x) based on:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                                <li>Same archetype: 1.5x</li>
                                <li>Complementary effects (e.g., search + special summon): 1.3x</li>
                                <li>Type synergy (e.g., Monster + Equip Spell): 1.2x</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">5. Ranking</h3>
                            <p className="text-gray-300">
                                Combinations are sorted by total score, and the top 10,000 are exported for display on this website.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Scoring Metrics */}
                <section className="mb-8">
                    <h2 className="text-3xl font-bold text-yugioh-gold mb-6 text-center">Scoring Metrics Breakdown</h2>

                    <div className="space-y-6">
                        {metrics.map((metric, index) => (
                            <div key={index} className="card-gradient rounded-xl p-6">
                                <h3 className="text-2xl font-bold text-gradient mb-3">{metric.name}</h3>
                                <p className="text-gray-300 mb-4">{metric.description}</p>
                                <div className="bg-black/30 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-yugioh-gold mb-2">Scoring Rules:</p>
                                    <ul className="space-y-1">
                                        {metric.scoring.map((rule, i) => (
                                            <li key={i} className="text-sm text-gray-400">• {rule}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Limitations */}
                <section className="glass-effect rounded-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-yugioh-gold mb-4">Limitations & Considerations</h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-yugioh-red text-xl">⚠️</span>
                            <span><strong className="text-white">Text-based analysis:</strong> The algorithm analyzes card text using keyword matching, which may miss nuanced interactions or context-specific effects.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yugioh-red text-xl">⚠️</span>
                            <span><strong className="text-white">No game state simulation:</strong> We don't simulate actual gameplay, so some combinations may not work in practice due to timing, cost requirements, or other restrictions.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yugioh-red text-xl">⚠️</span>
                            <span><strong className="text-white">Theoretical vs. practical:</strong> High-scoring combinations represent theoretical potential, not necessarily competitive viability.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yugioh-red text-xl">⚠️</span>
                            <span><strong className="text-white">2-card scope:</strong> Currently limited to 2-card combinations. Many competitive combos require 3+ cards.</span>
                        </li>
                    </ul>
                </section>

                {/* Credits */}
                <section className="glass-effect rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-yugioh-gold mb-4">Credits & Data Sources</h2>
                    <div className="text-gray-300 space-y-2">
                        <p>
                            <strong className="text-white">Card Data:</strong> <a href="https://db.ygoprodeck.com/" target="_blank" rel="noopener noreferrer" className="text-yugioh-blue hover:underline">YGOPRODeck API</a>
                        </p>
                        <p>
                            <strong className="text-white">Built with:</strong> React, Vite, Tailwind CSS, Recharts
                        </p>
                        <p>
                            <strong className="text-white">Hosted on:</strong> Vercel
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
