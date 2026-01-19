import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [stats, setStats] = useState({
        totalCombinations: 0,
        topCombinations: 0,
        metrics: 9
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/rankings.json');
                const data = await response.json();
                setStats({
                    totalCombinations: data.metadata.totalCombinations || 0,
                    topCombinations: data.metadata.scoredCombinations || 0,
                    metrics: 9
                });
            } catch (error) {
                console.error("Error loading stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-duelist-dark overflow-hidden pt-20">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-dark-magician/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-hex-pattern opacity-30"></div>
            </div>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[85vh] text-center">

                {/* Glitch/Tech Title */}
                <div className="mb-4 relative group cursor-default">
                    <h1 className="text-6xl md:text-8xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        DUEL <span className="text-neon-cyan">METRICS</span>
                    </h1>
                    <div className="h-1 w-2/3 mx-auto mt-2 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
                </div>

                <p className="mt-6 text-xl md:text-2xl text-tech-gray font-rajdhani max-w-3xl tracking-wide">
                    The advanced algorithmic ranking system for <span className="text-white font-bold">Yu-Gi-Oh!</span> card combinations.
                    Analyze synergy, power, and consistency with data-driven precision.
                </p>

                {/* Stats Grid - Cyber Style */}
                <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="COMBINATIONS"
                        value={stats.totalCombinations.toLocaleString()}
                        sub="ANALYZED"
                        color="text-neon-cyan"
                    />
                    <StatCard
                        label="TOP RANKED"
                        value={stats.topCombinations.toLocaleString()}
                        sub="INDEXED"
                        color="text-neon-blue"
                    />
                    <StatCard
                        label="METRICS"
                        value="9"
                        sub="PARAMETERS"
                        color="text-millennium-gold"
                    />
                </div>

                {/* CTA Buttons */}
                <div className="mt-16 flex flex-col sm:flex-row gap-6">
                    <Link to="/rankings" className="btn-cyber text-center min-w-[200px] flex items-center justify-center gap-2 group">
                        ACCESS DATABASE
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </Link>
                    <Link to="/about" className="btn-cyber-secondary text-center min-w-[200px]">
                        SYSTEM PARAMETERS
                    </Link>
                </div>
            </main>

            {/* Metrics Marquee/Grid */}
            <div className="relative z-10 border-t border-white/10 bg-duelist-panel/50 backdrop-blur-sm py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-orbitron text-neon-cyan tracking-widest mb-10">CORE ANALYSIS MODULES</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {['Card Advantage', 'Board Presence', 'Disruption', 'Protection', 'Sustainability', 'Combo Extender', 'Synergy', 'Extra Deck', 'Removal'].map((metric) => (
                            <div key={metric} className="p-4 border border-white/5 bg-duelist-dark hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300">
                                <span className="font-rajdhani font-bold text-tech-gray uppercase text-sm tracking-wider">{metric}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, sub, color }) => (
    <div className="tech-panel p-6 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors duration-300">
        <span className={`text-4xl md:text-5xl font-orbitron font-bold ${color} drop-shadow-lg`}>
            {value}
        </span>
        <span className="text-xs font-rajdhani font-bold tracking-[0.2em] text-white mt-1">
            {label}
        </span>
        <span className="text-[10px] uppercase text-tech-gray tracking-widest mt-1">
            {sub}
        </span>
    </div>
);

export default HomePage;
