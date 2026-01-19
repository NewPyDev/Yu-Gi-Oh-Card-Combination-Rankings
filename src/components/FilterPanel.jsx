import React, { useState } from 'react';

const FilterPanel = ({ filters, setFilters, onReset }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (e) => {
        setFilters(prev => ({ ...prev, minScore: parseInt(e.target.value) }));
    };

    const SelectField = ({ name, value, options, placeholder }) => (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={handleChange}
                className="w-full bg-duelist-dark border border-white/10 text-white font-rajdhani py-2 px-3 rounded-none focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan appearance-none transition-colors"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );

    return (
        <div className="mb-8">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-full btn-cyber-secondary mb-4 flex justify-between items-center"
            >
                <span>FILTER SYSTEM</span>
                <span>{isOpen ? '[-]' : '[+]'}</span>
            </button>

            {/* Panel Content */}
            <div className={`tech-panel p-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
                <div className="flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-cyan animate-pulse"></span>
                            <h3 className="text-neon-cyan font-orbitron tracking-widest text-sm">SEARCH PARAMETERS</h3>
                        </div>
                        <button
                            onClick={onReset}
                            className="text-xs font-rajdhani text-danger-red hover:text-white uppercase tracking-wider transition-colors"
                        >
                            [ Reset Protocols ]
                        </button>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2 lg:col-span-1">
                            <input
                                type="text"
                                name="cardName"
                                placeholder="ENTER CARD NAME..."
                                value={filters.cardName}
                                onChange={handleChange}
                                className="w-full bg-duelist-dark border border-white/10 text-white font-rajdhani py-2 px-3 focus:outline-none focus:border-neon-cyan placeholder-tech-gray/50"
                            />
                        </div>

                        <SelectField
                            name="cardType"
                            value={filters.cardType}
                            options={["Monster", "Spell", "Trap"]}
                            placeholder="CARD TYPE"
                        />

                        {filters.cardType === "Monster" && (
                            <SelectField
                                name="monsterType"
                                value={filters.monsterType}
                                options={["Normal", "Effect", "Fusion", "Synchro", "XYZ", "Link", "Ritual", "Pendulum"]}
                                placeholder="MONSTER TYPE"
                            />
                        )}

                        {filters.cardType === "Spell" && (
                            <SelectField
                                name="spellType"
                                value={filters.spellType}
                                options={["Normal", "Continuous", "Equip", "Field", "Quick-Play", "Ritual"]}
                                placeholder="SPELL TYPE"
                            />
                        )}

                        {filters.cardType === "Trap" && (
                            <SelectField
                                name="trapType"
                                value={filters.trapType}
                                options={["Normal", "Continuous", "Counter"]}
                                placeholder="TRAP TYPE"
                            />
                        )}

                        <SelectField
                            name="attribute"
                            value={filters.attribute}
                            options={["DARK", "LIGHT", "EARTH", "WATER", "FIRE", "WIND", "DIVINE"]}
                            placeholder="ATTRIBUTE"
                        />
                    </div>

                    {/* Slider Section */}
                    <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-rajdhani text-tech-gray uppercase tracking-widest">Minimum Synergy Score</label>
                            <span className="text-neon-cyan font-orbitron font-bold">{filters.minScore}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={filters.minScore}
                            onChange={handleSliderChange}
                            className="w-full h-1 bg-duelist-dark appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neon-cyan [&::-webkit-slider-thumb]:hover:shadow-[0_0_10px_#00f2ff]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
