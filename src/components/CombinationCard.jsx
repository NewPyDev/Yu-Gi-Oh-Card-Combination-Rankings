import React from 'react';
import { Link } from 'react-router-dom';

const CombinationCard = ({ combo, rank }) => {
    // Determine rank color (Top 3 get special colors)
    const getRankColor = (r) => {
        if (r === 1) return 'text-millennium-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]';
        if (r === 2) return 'text-gray-300 drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]';
        if (r === 3) return 'text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]';
        return 'text-white';
    };

    return (
        <Link
            to={`/combination/${combo.rank}`}
            className="holo-card block group isolate p-4"
        >
            {/* Rank Badge - Floating */}
            <div className="absolute top-0 left-0 z-20">
                <div className="bg-duelist-dark border-r border-b border-neon-cyan/50 px-3 py-1 clip-path-polygon">
                    <span className={`font-orbitron font-bold text-xl ${getRankColor(rank)}`}>
                        #{rank}
                    </span>
                </div>
            </div>

            {/* Score Badge - Floating Right */}
            <div className="absolute top-0 right-0 z-20">
                <div className="bg-duelist-dark border-l border-b border-white/10 px-3 py-1 group-hover:border-neon-cyan/50 transition-colors">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-tech-gray uppercase tracking-wider">SCORE</span>
                        <span className="font-orbitron font-bold text-neon-cyan">{combo.totalScore}</span>
                    </div>
                </div>
            </div>

            {/* Card Images Container */}
            <div className="relative flex justify-center items-center h-48 mt-4 mb-4 gap-4 perspective-1000">
                {/* Card 1 */}
                <div className="relative w-24 sm:w-28 transition-transform duration-500 transform group-hover:-translate-x-2 group-hover:-rotate-3 z-10">
                    <img
                        src={combo.card1.image_url_small}
                        alt={combo.card1.name}
                        className="w-full h-auto rounded-none border border-white/20 shadow-lg group-hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                        loading="lazy"
                    />
                </div>
                {/* Card 2 */}
                <div className="relative w-24 sm:w-28 transition-transform duration-500 transform group-hover:translate-x-2 group-hover:rotate-3 z-10">
                    <img
                        src={combo.card2.image_url_small}
                        alt={combo.card2.name}
                        className="w-full h-auto rounded-none border border-white/20 shadow-lg group-hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                        loading="lazy"
                    />
                </div>

                {/* Connecting Energy Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-neon-cyan blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>

            {/* Info Section */}
            <div className="relative z-10 pt-4 border-t border-white/5 group-hover:border-neon-cyan/30 transition-colors">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-sm font-rajdhani font-bold text-white leading-tight line-clamp-2 min-h-[2.5em] group-hover:text-neon-cyan transition-colors">
                        {combo.card1.name} + {combo.card2.name}
                    </h3>
                </div>

                {/* Synergy Bar */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] uppercase text-tech-gray tracking-widest">SYNERGY</span>
                    <span className="text-sm font-orbitron font-medium text-millennium-gold">
                        {combo.synergyMultiplier}x
                    </span>
                </div>
                <div className="w-full h-1 bg-white/10 mt-1 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-neon-blue to-millennium-gold"
                        style={{ width: `${(combo.synergyMultiplier / 2) * 100}%` }}
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default CombinationCard;
