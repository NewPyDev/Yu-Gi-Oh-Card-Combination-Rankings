import { useState, useEffect } from 'react'
import CombinationCard from '../components/CombinationCard'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'

const ITEMS_PER_PAGE = 50

export default function RankingsPage() {
    const [rankings, setRankings] = useState([])
    const [filteredRankings, setFilteredRankings] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('rank')
    const [filters, setFilters] = useState({
        cardType: '',
        monsterType: '',
        spellType: '',
        trapType: '',
        attribute: '',
        comboType: '',
        minScore: 0,
    })

    // Load rankings data
    useEffect(() => {
        fetch('/rankings.json')
            .then(res => res.json())
            .then(data => {
                setRankings(data.rankings || [])
                setFilteredRankings(data.rankings || [])
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading rankings:', err)
                setLoading(false)
            })
    }, [])

    // Apply filters and search
    useEffect(() => {
        let filtered = [...rankings]

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(combo =>
                combo.card1.name.toLowerCase().includes(term) ||
                combo.card2.name.toLowerCase().includes(term)
            )
        }

        // Card type filter
        if (filters.cardType) {
            filtered = filtered.filter(combo =>
                combo.card1.type.includes(filters.cardType) ||
                combo.card2.type.includes(filters.cardType)
            )
        }

        // Monster type filter
        if (filters.monsterType) {
            filtered = filtered.filter(combo =>
                combo.card1.type.includes(filters.monsterType) ||
                combo.card2.type.includes(filters.monsterType)
            )
        }

        // Spell type filter
        if (filters.spellType) {
            filtered = filtered.filter(combo =>
                combo.card1.type.includes(filters.spellType) ||
                combo.card2.type.includes(filters.spellType)
            )
        }

        // Trap type filter
        if (filters.trapType) {
            filtered = filtered.filter(combo =>
                combo.card1.type.includes(filters.trapType) ||
                combo.card2.type.includes(filters.trapType)
            )
        }

        // Combo type filter
        if (filters.comboType) {
            const [type1, type2] = filters.comboType.split(' + ')
            filtered = filtered.filter(combo => {
                const card1Type = combo.card1.type.includes('Monster') ? 'Monster' :
                    combo.card1.type.includes('Spell') ? 'Spell' : 'Trap'
                const card2Type = combo.card2.type.includes('Monster') ? 'Monster' :
                    combo.card2.type.includes('Spell') ? 'Spell' : 'Trap'

                return (card1Type === type1 && card2Type === type2) ||
                    (card1Type === type2 && card2Type === type1)
            })
        }

        // Score filter
        if (filters.minScore > 0) {
            filtered = filtered.filter(combo => combo.totalScore >= filters.minScore)
        }

        // Sorting
        if (sortBy === 'rank') {
            filtered.sort((a, b) => a.rank - b.rank)
        } else if (sortBy === 'score') {
            filtered.sort((a, b) => b.totalScore - a.totalScore)
        } else if (sortBy === 'synergy') {
            filtered.sort((a, b) => b.synergyMultiplier - a.synergyMultiplier)
        }

        setFilteredRankings(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [rankings, searchTerm, filters, sortBy])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleResetFilters = () => {
        setFilters({
            cardType: '',
            monsterType: '',
            spellType: '',
            trapType: '',
            attribute: '',
            comboType: '',
            minScore: 0,
        })
        setSearchTerm('')
        setSortBy('rank')
    }

    // Pagination
    const totalPages = Math.ceil(filteredRankings.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentRankings = filteredRankings.slice(startIndex, endIndex)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">⚡</div>
                    <div className="text-2xl font-bold text-gradient">Loading Rankings...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="section-title">Card Combination Rankings</span>
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Showing {filteredRankings.length.toLocaleString()} of {rankings.length.toLocaleString()} combinations
                    </p>
                </div>

                {/* Search and Sort */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by card name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="md:w-64">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="input-field"
                        >
                            <option value="rank">Sort by Rank</option>
                            <option value="score">Sort by Score</option>
                            <option value="synergy">Sort by Synergy</option>
                        </select>
                    </div>
                </div>

                {/* Filters */}
                <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                />

                {/* Results */}
                {currentRankings.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <div className="text-2xl font-bold text-gray-400 mb-2">No combinations found</div>
                        <p className="text-gray-500">Try adjusting your filters or search term</p>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentRankings.map((combo) => (
                                <CombinationCard key={combo.rank} combination={combo} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
