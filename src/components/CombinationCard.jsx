import { Link } from 'react-router-dom'

export default function CombinationCard({ combination }) {
    const { rank, card1, card2, totalScore, synergyMultiplier } = combination

    return (
        <Link to={`/combination/${rank}`}>
            <div className="combo-card group">
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="stat-badge">
                        #{rank}
                    </div>
                </div>

                {/* Card Images */}
                <div className="flex justify-center items-center gap-4 mb-4 pt-8">
                    <div className="relative">
                        <img
                            src={card1.image_url_small || 'https://via.placeholder.com/100x146?text=Card+1'}
                            alt={card1.name}
                            className="w-24 h-auto rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>

                    <div className="text-3xl text-yugioh-gold animate-pulse">+</div>

                    <div className="relative">
                        <img
                            src={card2.image_url_small || 'https://via.placeholder.com/100x146?text=Card+2'}
                            alt={card2.name}
                            className="w-24 h-auto rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Card Names */}
                <div className="space-y-1 mb-4">
                    <p className="text-sm font-semibold text-center text-purple-300 truncate">
                        {card1.name}
                    </p>
                    <p className="text-sm font-semibold text-center text-blue-300 truncate">
                        {card2.name}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="text-center">
                        <p className="text-xs text-gray-400">Score</p>
                        <p className="text-lg font-bold text-yugioh-gold">{totalScore.toFixed(0)}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-400">Synergy</p>
                        <p className="text-lg font-bold text-purple-400">{synergyMultiplier.toFixed(2)}x</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
