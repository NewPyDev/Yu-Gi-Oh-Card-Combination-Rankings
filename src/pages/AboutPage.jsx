import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-duelist-dark pt-24 pb-12 px-4">
            <div className="fixed inset-0 bg-hex-pattern opacity-20 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        SYSTEM <span className="text-neon-cyan">PARAMETERS</span>
                    </h1>
                    <div className="h-1 w-24 bg-neon-cyan mx-auto"></div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    <Section title="MISSION DIRECTIVE">
                        <p>
                            Traditional meta analysis relies on tournament results, creating a feedback loop where only popular decks are optimized.
                            <br /><br />
                            <strong className="text-white">Duel Metrics</strong> breaks this cycle by using algorithmic analysis to evaluate card synergy at a theoretical level. By quantifying mechanics like search power, board presence, and disruption, we uncover potential combinations that the human meta may have overlooked.
                        </p>
                    </Section>

                    <Section title="SCORING ALGORITHM [V1.0]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <MetricCard
                                title="CARD ADVANTAGE"
                                desc="Measures raw resource generation capabilities. Points awarded for draws, searches, and recursion."
                            />
                            <MetricCard
                                title="BOARD PRESENCE"
                                desc="Evaluates ability to put bodies on field. Critical for Link, Synchro, and XYZ plays."
                            />
                            <MetricCard
                                title="DISRUPTION"
                                desc="Quantifies interaction capability. Negates, quick-effects, and hand traps score highly here."
                            />
                            <MetricCard
                                title="PROTECTION"
                                desc="Defensive metrics including targeting immunity, destruction immunity, and floating effects."
                            />
                            <MetricCard
                                title="COMBO POTENTIAL"
                                desc="Identifies 'starter' cards and extenders that facilitate long play sequences."
                            />
                            <MetricCard
                                title="REMOVAL"
                                desc="Ability to clear opponent's board. Non-targeting removal scores highest."
                            />
                        </div>
                    </Section>

                    <Section title="SYNERGY CALCULATION">
                        <p className="mb-4">Raw power is nothing without consistency. The system applies a <strong>Synergy Multiplier (1.0x - 2.0x)</strong> based on:</p>
                        <ul className="list-none space-y-2 pl-4 border-l-2 border-neon-cyan/30">
                            <li className="flex items-center gap-3">
                                <span className="text-millennium-gold font-bold">1.5x</span>
                                <span>Shared Archetype (e.g. "Blue-Eyes" + "Blue-Eyes")</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-millennium-gold font-bold">1.3x</span>
                                <span>Mechanic Synergy (e.g. "Searcher" + "Summon target")</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-millennium-gold font-bold">1.2x</span>
                                <span>Type/Attribute Synergy</span>
                            </li>
                        </ul>
                    </Section>

                    <Section title="DATA SOURCE">
                        <div className="bg-duelist-panel p-6 border border-white/10 flex items-center justify-between">
                            <div>
                                <h4 className="font-orbitron text-white">YGOPRODeck API</h4>
                                <p className="text-tech-gray text-sm mt-1">Primary database provider</p>
                            </div>
                            <a href="https://db.ygoprodeck.com/api-guide/" target="_blank" rel="noopener noreferrer" className="btn-cyber-secondary text-xs">
                                ACCESS API
                            </a>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="relative">
        <h2 className="text-xl font-orbitron font-bold text-neon-cyan mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-neon-cyan rotate-45"></span>
            {title}
        </h2>
        <div className="font-rajdhani text-lg text-gray-300 leading-relaxed">
            {children}
        </div>
    </section>
);

const MetricCard = ({ title, desc }) => (
    <div className="bg-duelist-panel border border-white/5 p-5 hover:border-neon-cyan/50 hover:bg-white/5 transition-all duration-300 group">
        <h3 className="font-orbitron text-white text-sm mb-2 group-hover:text-neon-cyan transition-colors">{title}</h3>
        <p className="text-sm text-tech-gray">{desc}</p>
    </div>
);

export default AboutPage;
