import { useState } from 'react'

export default function FilterPanel({ filters, onFilterChange, onReset }) {
    const [isOpen, setIsOpen] = useState(false)

    const cardTypes = ['Monster', 'Spell', 'Trap']
    const monsterTypes = ['Effect', 'Normal', 'Fusion', 'Synchro', 'XYZ', 'Link', 'Ritual', 'Pendulum']
    const spellTypes = ['Normal', 'Quick-Play', 'Continuous', 'Equip', 'Field', 'Ritual']
    const trapTypes = ['Normal', 'Counter', 'Continuous']
    const attributes = ['DARK', 'LIGHT', 'WATER', 'FIRE', 'EARTH', 'WIND', 'DIVINE']
    const comboTypes = [
        'Monster + Monster',
        'Monster + Spell',
        'Monster + Trap',
        'Spell + Spell',
        'Spell + Trap',
        'Trap + Trap'
    ]

    return (
        <div className="mb-6">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-full btn-secondary mb-4"
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'} 🔍
            </button>

            {/* Filter Panel */}
            <div className={`glass-effect rounded-xl p-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-yugioh-gold">Filters</h3>
                    <button
                        onClick={onReset}
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        Reset All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Card Type
                        </label>
                        <select
                            value={filters.cardType}
                            onChange={(e) => onFilterChange('cardType', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Types</option>
                            {cardTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Monster Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Monster Type
                        </label>
                        <select
                            value={filters.monsterType}
                            onChange={(e) => onFilterChange('monsterType', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Monster Types</option>
                            {monsterTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Spell Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Spell Type
                        </label>
                        <select
                            value={filters.spellType}
                            onChange={(e) => onFilterChange('spellType', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Spell Types</option>
                            {spellTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Trap Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Trap Type
                        </label>
                        <select
                            value={filters.trapType}
                            onChange={(e) => onFilterChange('trapType', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Trap Types</option>
                            {trapTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Attribute */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Attribute
                        </label>
                        <select
                            value={filters.attribute}
                            onChange={(e) => onFilterChange('attribute', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Attributes</option>
                            {attributes.map(attr => (
                                <option key={attr} value={attr}>{attr}</option>
                            ))}
                        </select>
                    </div>

                    {/* Combination Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Combo Type
                        </label>
                        <select
                            value={filters.comboType}
                            onChange={(e) => onFilterChange('comboType', e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Combos</option>
                            {comboTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Score Range */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Minimum Score: {filters.minScore}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={filters.minScore}
                            onChange={(e) => onFilterChange('minScore', parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yugioh-purple"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
