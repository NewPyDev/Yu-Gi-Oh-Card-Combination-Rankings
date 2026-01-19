import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`relative px-4 py-2 font-orbitron tracking-widest transition-all duration-300 group ${isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
                    }`}
            >
                {children}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-neon-cyan transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_10px_#00f2ff]' : 'w-0 group-hover:w-full'
                    }`}></span>
            </Link>
        );
    };

    return (
        <nav className="fixed w-full z-50 bg-duelist-dark/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center group">
                        <div className="relative w-10 h-10 mr-3 overflow-hidden border-2 border-neon-cyan transform group-hover:rotate-45 transition-transform duration-500">
                            <div className="absolute inset-0 bg-cyber-gradient"></div>
                            <span className="absolute inset-0 flex items-center justify-center font-orbitron font-bold text-neon-cyan text-xl group-hover:-rotate-45 transition-transform duration-500">
                                Y
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-orbitron font-bold tracking-widest text-white uppercase group-hover:text-neon-cyan transition-colors">
                                Yu-Gi-Oh
                            </span>
                            <span className="text-[0.6rem] font-rajdhani tracking-[0.2em] text-neon-blue uppercase">
                                Ranking System
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">HOME</NavLink>
                        <NavLink to="/rankings">RANKINGS</NavLink>
                        <NavLink to="/about">SYSTEM</NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-neon-cyan focus:outline-none p-2"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute w-full bg-duelist-dark border-b border-neon-cyan/30 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64' : 'max-h-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
                    <Link to="/" onClick={toggleMenu} className="block w-full text-center py-3 font-orbitron text-gray-300 hover:text-neon-cyan hover:bg-white/5 uppercase tracking-widest">
                        Home Source
                    </Link>
                    <Link to="/rankings" onClick={toggleMenu} className="block w-full text-center py-3 font-orbitron text-gray-300 hover:text-neon-cyan hover:bg-white/5 uppercase tracking-widest">
                        Database
                    </Link>
                    <Link to="/about" onClick={toggleMenu} className="block w-full text-center py-3 font-orbitron text-gray-300 hover:text-neon-cyan hover:bg-white/5 uppercase tracking-widest">
                        System Core
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
