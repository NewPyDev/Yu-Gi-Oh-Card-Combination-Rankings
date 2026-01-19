import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CombinationDetailPage = () => {
    const { rank } = useParams();
    const navigate = useNavigate();
    const [combo, setCombo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find combo matching rank (=id)
        fetch('/rankings.json')
            .then(res => res.json())
            .then(data => {
                const found = data.rankings.find(r => r.rank === parseInt(rank));
                setCombo(found);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, [rank]);

    if (loading) return <div className="min-h-screen bg-duelist-dark flex items-center justify-center text-neon-cyan font-orbitron">INITIALIZING...</div>;
    if (!combo) return <div className="min-h-screen bg-duelist-dark flex items-center justify-center text-danger-red font-orbitron">DATA FRAGMENT NOT FOUND</div>;

    // Transform data for radar chart
    const radarData = Object.entries(combo.scores).map(([key, value]) => ({
        subject: key.replace(/([A-Z])/g, ' $1').trim(), // Format camelCase
        A: value,
        fullMark: 100,
    }));

    return (
        <div className="min-h-screen bg-duelist-dark pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header / Nav */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => navigate('/rankings')} className="flex items-center gap-2 text-tech-gray hover:text-neon-cyan transition-colors group">
                        <span className="font-orbitron text-xl group-hover:-translate-x-1 transition-transform">&lt;</span>
                        <span className="font-rajdhani font-bold tracking-widest text-sm">RETURN TO DATABASE</span>
                    </button>
                    <div className="flex gap-4">
                        <button onClick={() => navigate(`/combination/${parseInt(rank) - 1}`)} className="btn-cyber-secondary" disabled={parseInt(rank) <= 1}>PREV</button>
                        <button onClick={() => navigate(`/combination/${parseInt(rank) + 1}`)} className="btn-cyber-secondary">NEXT</button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Cards Display (Cols 1-5) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="tech-panel p-8 flex flex-col items-center">
                            <div className="flex justify-center items-center gap-4 mb-8 w-full">
                                <img src={combo.card1.image_url_small} alt={combo.card1.name} className="w-1/3 hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20" />
                                <div className="text-neon-cyan font-orbitron font-bold text-2xl animate-pulse">+</div>
                                <img src={combo.card2.image_url_small} alt={combo.card2.name} className="w-1/3 hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20" />
                            </div>

                            <h1 className="text-2xl md:text-3xl font-rajdhani font-bold text-center text-white mb-2">
                                {combo.card1.name}
                            </h1>
                            <h2 className="text-xl md:text-2xl font-rajdhani font-bold text-center text-tech-gray mb-6">
                                & {combo.card2.name}
                            </h2>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-duelist-dark border border-white/10 p-4 text-center">
                                    <div className="text-xs text-tech-gray uppercase tracking-widest mb-1">TOTAL SCORE</div>
                                    <div className="text-3xl font-orbitron font-bold text-neon-cyan">{combo.totalScore}</div>
                                </div>
                                <div className="bg-duelist-dark border border-white/10 p-4 text-center">
                                    <div className="text-xs text-tech-gray uppercase tracking-widest mb-1">SYNERGY</div>
                                    <div className="text-3xl font-orbitron font-bold text-millennium-gold">{combo.synergyMultiplier}x</div>
                                </div>
                            </div>
                        </div>

                        {/* Explanation Panel */}
                        <div className="bg-duelist-dark/50 border-l-4 border-neon-cyan p-6">
                            <h3 className="text-neon-cyan font-orbitron tracking-widest text-sm mb-3">SYNERGY ANALYSIS</h3>
                            <p className="font-rajdhani text-lg leading-relaxed text-gray-300">
                                {combo.explanation}
                            </p>
                        </div>
                    </div>

                    {/* Right: Metrics & Chart (Cols 6-12) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Radar Chart Panel */}
                        <div className="tech-panel p-6 min-h-[400px] flex items-center justify-center relative">
                            <div className="absolute top-4 left-4 text-xs text-tech-gray tracking-widest border border-white/10 px-2 py-1">METRIC VISUALIZATION</div>
                            <div className="w-full h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                        <PolarGrid stroke="#1a2035" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#8a9bb8', fontSize: 10, fontFamily: 'Orbitron' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Score" dataKey="A" stroke="#00f2ff" strokeWidth={2} fill="#00f2ff" fillOpacity={0.2} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0a0b14', border: '1px solid #00f2ff', color: '#fff', fontFamily: 'Rajdhani' }}
                                            itemStyle={{ color: '#00f2ff' }}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Detailed Bars */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {radarData.map((item, idx) => (
                                <div key={idx} className="bg-duelist-panel p-3 border border-white/5 hover:border-neon-cyan/30 transition-colors">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-[10px] uppercase font-orbitron text-tech-gray">{item.subject}</span>
                                        <span className="text-sm font-bold font-rajdhani text-white">{item.A.toFixed(0)}</span>
                                    </div>
                                    <div className="w-full h-1 bg-duelist-dark overflow-hidden">
                                        <div
                                            className="h-full bg-neon-cyan shadow-[0_0_10px_#00f2ff]"
                                            style={{ width: `${item.A}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombinationDetailPage;
