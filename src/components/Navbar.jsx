import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/rankings', label: 'Rankings' },
        { path: '/about', label: 'About' },
    ]

    return (
        <nav className="glass-effect sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gradient">⚡</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-yugioh-gold to-yellow-400 bg-clip-text text-transparent">
                            YGO Combo Rankings
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(path)
                                        ? 'bg-yugioh-purple text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 animate-slide-up">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg font-medium transition-all ${isActive(path)
                                        ? 'bg-yugioh-purple text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
