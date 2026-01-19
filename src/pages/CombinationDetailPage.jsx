import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

export default function CombinationDetailPage() {
    const { rank } = useParams()
    const [combination, setCombination] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/rankings.json')
            .then(res => res.json())
            .then(data => {
                const combo = data.rankings.find(r => r.rank === parseInt(rank))
                setCombination(combo)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading combination:', err)
                setLoading(false)
            })
    }, [rank])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-gradient animate-pulse">Loading...</div>
            </div>
        )
    }

    if (!combination) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <div className="text-2xl font-bold text-gray-400 mb-4">Combination Not Found</div>
                    <Link to="/rankings" className="btn-primary">
                        Back to Rankings
                    </Link>
                </div>
            </div>
        )
    }

    // Prepare chart data
    const chartData = [
        { metric: 'Card Advantage', value: combination.scores.cardAdvantage },
        { metric: 'Board Presence', value: combination.scores.boardPresence },
        { metric: 'Disruption', value: combination.scores.disruption },
        { metric: 'Protection', value: combination.scores.protection },
        { metric: 'Combo Extender', value: combination.scores.comboExtender },
        { metric: 'Spell/Trap Synergy', value: combination.scores.spellTrapSynergy },
        { metric: 'Extra Deck', value: combination.scores.extraDeckAccess },
        { metric: 'Removal', value: combination.scores.removal },
        { metric: 'Resources', value: combination.scores.resourceGeneration },
    ]

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link to="/rankings" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors">
                    ← Back to Rankings
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="stat-badge mb-4">
                        Rank #{combination.rank}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="text-gradient">Combination Analysis</span>
                    </h1>
                </div>

                {/* Cards Display */}
                <div className="card-gradient rounded-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        {/* Card 1 */}
                        <div className="text-center">
                            <img
                                src={combination.card1.image_url_small || 'https://via.placeholder.com/200x292?text=Card+1'}
                                alt={combination.card1.name}
                                className="w-48 h-auto rounded-lg shadow-2xl mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-bold text-purple-300">{combination.card1.name}</h3>
                            <p className="text-sm text-gray-400">{combination.card1.type}</p>
                        </div>

                        {/* Plus Sign */}
                        <div className="text-6xl text-yugioh-gold font-bold">+</div>

                        {/* Card 2 */}
                        <div className="text-center">
                            <img
                                src={combination.card2.image_url_small || 'https://via.placeholder.com/200x292?text=Card+2'}
                                alt={combination.card2.name}
                                className="w-48 h-auto rounded-lg shadow-2xl mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-bold text-blue-300">{combination.card2.name}</h3>
                            <p className="text-sm text-gray-400">{combination.card2.type}</p>
                        </div>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="card-gradient rounded-xl p-6 text-center">
                        <div className="text-5xl font-bold text-yugioh-gold mb-2">
                            {combination.totalScore.toFixed(0)}
                        </div>
                        <div className="text-gray-300 text-lg">Total Score</div>
                    </div>

                    <div className="card-gradient rounded-xl p-6 text-center">
                        <div className="text-5xl font-bold text-purple-400 mb-2">
                            {combination.synergyMultiplier.toFixed(2)}x
                        </div>
                        <div className="text-gray-300 text-lg">Synergy Multiplier</div>
                    </div>
                </div>

                {/* Explanation */}
                <div className="glass-effect rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-yugioh-gold mb-4">Why This Combo Works</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {combination.explanation}
                    </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <div className="card-gradient rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gradient">
                            Score Visualization
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart data={chartData}>
                                <PolarGrid stroke="#ffffff20" />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                                <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="#a855f7"
                                    fill="#a855f7"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Detailed Scores */}
                    <div className="card-gradient rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gradient">
                            Detailed Breakdown
                        </h2>
                        <div className="space-y-4">
                            {chartData.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-300">{item.metric}</span>
                                        <span className="text-yugioh-gold font-bold">{item.value.toFixed(0)}/100</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-yugioh-purple to-yugioh-blue h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    {combination.rank > 1 && (
                        <Link to={`/combination/${combination.rank - 1}`} className="btn-secondary">
                            ← Previous Combo
                        </Link>
                    )}
                    <div className="flex-1"></div>
                    <Link to={`/combination/${combination.rank + 1}`} className="btn-secondary">
                        Next Combo →
                    </Link>
                </div>
            </div>
        </div>
    )
}
