import React, { useState, useEffect, useMemo } from 'react';
import CombinationCard from '../components/CombinationCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';

const RankingsPage = () => {
    const [combinations, setCombinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [filters, setFilters] = useState({
        cardName: '',
        cardType: '',
        monsterType: '',
        spellType: '',
        trapType: '',
        attribute: '',
        comboType: '',
        minScore: 0
    });
    const [sortBy, setSortBy] = useState('rank'); // rank, score, synergy

    useEffect(() => {
        fetch('/rankings.json')
            .then(res => res.json())
            .then(data => {
                setCombinations(data.rankings);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load rankings", err);
                setLoading(false);
            });
    }, []);

    // ... (Filter Logic Same as Before) ...
    const filteredCombinations = useMemo(() => {
        return combinations.filter(combo => {
            // Text Search
            if (filters.cardName) {
                const search = filters.cardName.toLowerCase();
                if (!combo.card1.name.toLowerCase().includes(search) &&
                    !combo.card2.name.toLowerCase().includes(search)) return false;
            }

            // Score Filter
            if (combo.totalScore < filters.minScore) return false;

            // Card Type Logic (Simplified for brevity, matches original)
            if (filters.cardType) {
                const typeMatch = (card, type) => card.type.includes(type);
                const showMonster = filters.cardType === "Monster";
                const showSpell = filters.cardType === "Spell";
                const showTrap = filters.cardType === "Trap";

                const c1M = typeMatch(combo.card1, "Monster");
                const c2M = typeMatch(combo.card2, "Monster");

                if (showMonster && !c1M && !c2M) return false;
                if (showSpell && !typeMatch(combo.card1, "Spell") && !typeMatch(combo.card2, "Spell")) return false;
                if (showTrap && !typeMatch(combo.card1, "Trap") && !typeMatch(combo.card2, "Trap")) return false;
            }

            // Attribute
            if (filters.attribute) {
                const attrMatch = (card) => card.attribute === filters.attribute;
                // Note: quick script might not include attribute, check full data
            }

            return true;
        });
    }, [combinations, filters]);

    // Sorting
    const sortedCombinations = useMemo(() => {
        return [...filteredCombinations].sort((a, b) => {
            if (sortBy === 'score') return b.totalScore - a.totalScore;
            if (sortBy === 'synergy') return b.synergyMultiplier - a.synergyMultiplier;
            return a.rank - b.rank; // Default by rank
        });
    }, [filteredCombinations, sortBy]);

    // Pagination
    const totalPages = Math.ceil(sortedCombinations.length / itemsPerPage);
    const displayedCombinations = sortedCombinations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-duelist-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="fixed inset-0 bg-hex-pattern opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-orbitron font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            COMBINATION <span className="text-neon-cyan">DATABASE</span>
                        </h1>
                        <p className="text-tech-gray font-rajdhani mt-2 tracking-wide">
                            <span className="text-neon-blue font-bold">{filteredCombinations.length.toLocaleString()}</span> PAIRS INDEXED
                        </p>
                    </div>

                    {/* Sort Control */}
                    <div className="flex items-center gap-2 bg-duelist-panel border border-white/10 px-4 py-2 clip-path-polygon">
                        <span className="text-xs text-tech-gray font-rajdhani uppercase tracking-widest">SORT SEQUENCE:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-neon-cyan font-orbitron text-sm focus:outline-none cursor-pointer"
                        >
                            <option value="rank">RANKING</option>
                            <option value="score">TOTAL SCORE</option>
                            <option value="synergy">SYNERGY FACTOR</option>
                        </select>
                    </div>
                </div>

                <FilterPanel filters={filters} setFilters={setFilters} onReset={() => setFilters({ cardName: '', cardType: '', minScore: 0 })} />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-neon-cyan/30 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-neon-cyan rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) : displayedCombinations.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayedCombinations.map(combo => (
                                <CombinationCard key={combo.rank} combo={combo} rank={combo.rank} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center py-20 border border-white/5 bg-duelist-panel/50">
                        <h3 className="text-xl font-orbitron text-tech-gray">NO DATA MATCH</h3>
                        <p className="font-rajdhani text-gray-500 mt-2">ADJUST FILTER PARAMETERS</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RankingsPage;
