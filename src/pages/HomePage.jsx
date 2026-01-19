import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        // Try to load rankings metadata
        fetch('/rankings.json')
            .then(res => res.json())
            .then(data => setStats(data.metadata))
            .catch(() => setStats(null))
    }, [])

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        <span className="section-title animate-glow">
                            Yu-Gi-Oh Combo Rankings
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Algorithm-driven analysis of <span className="text-yugioh-gold font-semibold">every possible 2-card combination</span> in Yu-Gi-Oh, ranked by objective scoring metrics
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/rankings" className="btn-primary">
                            Explore Rankings 🔍
                        </Link>
                        <Link to="/about" className="btn-secondary">
                            Learn More 📖
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {stats && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card-gradient rounded-xl p-8 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-yugioh-gold mb-2">
                                    {stats.totalCombinations?.toLocaleString() || 'N/A'}
                                </div>
                                <div className="text-gray-300">Total Combinations Analyzed</div>
                            </div>

                            <div className="card-gradient rounded-xl p-8 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                                    {stats.topN?.toLocaleString() || 'N/A'}
                                </div>
                                <div className="text-gray-300">Top Ranked Combos</div>
                            </div>

                            <div className="card-gradient rounded-xl p-8 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                    9
                                </div>
                                <div className="text-gray-300">Scoring Metrics</div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Concept Explanation */}
            <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                        <span className="text-gradient">What Makes This Different?</span>
                    </h2>

                    <div className="glass-effect rounded-xl p-8 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">🧮</div>
                            <div>
                                <h3 className="text-xl font-bold text-yugioh-gold mb-2">Algorithm-Driven Analysis</h3>
                                <p className="text-gray-300">
                                    Unlike traditional tier lists based on tournament results, this project uses objective scoring algorithms to evaluate card combinations based on measurable game mechanics.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-3xl">⚡</div>
                            <div>
                                <h3 className="text-xl font-bold text-purple-400 mb-2">Comprehensive Coverage</h3>
                                <p className="text-gray-300">
                                    Every possible 2-card combination is analyzed and scored across 9 different metrics including card advantage, board presence, disruption, and more.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="text-3xl">🎯</div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-400 mb-2">Theoretical Potential</h3>
                                <p className="text-gray-300">
                                    Discover hidden synergies and underrated combinations that might not see tournament play but have high theoretical potential based on their effects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scoring Metrics Preview */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        <span className="section-title">9 Scoring Metrics</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Card Advantage', icon: '📈', desc: 'Draw & search effects' },
                            { name: 'Board Presence', icon: '👥', desc: 'Special summons & tokens' },
                            { name: 'Disruption', icon: '🚫', desc: 'Negation & destruction' },
                            { name: 'Protection', icon: '🛡️', desc: 'Sustainability & recursion' },
                            { name: 'Combo Extender', icon: '🔗', desc: 'Chain enablers' },
                            { name: 'Spell/Trap Synergy', icon: '✨', desc: 'Backrow support' },
                            { name: 'Extra Deck Access', icon: '⭐', desc: 'Fusion, Synchro, XYZ, Link' },
                            { name: 'Removal', icon: '💥', desc: 'Spot & mass removal' },
                            { name: 'Resource Generation', icon: '💎', desc: 'LP, counters, materials' },
                        ].map((metric, index) => (
                            <div key={index} className="card-gradient rounded-xl p-6 hover:scale-105 transition-transform">
                                <div className="text-4xl mb-3">{metric.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{metric.name}</h3>
                                <p className="text-sm text-gray-400">{metric.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="text-gradient">Ready to Discover the Best Combos?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Explore thousands of ranked card combinations and find hidden synergies
                    </p>
                    <Link to="/rankings" className="btn-primary text-lg">
                        View Rankings Now →
                    </Link>
                </div>
            </section>
        </div>
    )
}
