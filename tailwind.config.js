/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
            },
            colors: {
                // Deep background tones
                'duelist-dark': '#0a0b14',
                'duelist-panel': '#121420',

                // Primary Accents
                'neon-cyan': '#00f2ff',
                'neon-blue': '#0066ff',

                // Secondary Accents
                'millennium-gold': '#ffd700',
                'dark-magician': '#a200ff',

                // Functional
                'tech-gray': '#8a9bb8',
                'danger-red': '#ff2a2a',
                'success-green': '#00ff9d',
            },
            backgroundImage: {
                'hex-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2035' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                'cyber-gradient': 'linear-gradient(135deg, #0a0b14 0%, #1a1c2e 100%)',
                'card-holo': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0.1) 100%)',
            },
            animation: {
                'grid-flow': 'gridFlow 20s linear infinite',
                'holo-shimmer': 'holoShimmer 3s linear infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                gridFlow: {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '60px 60px' },
                },
                holoShimmer: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px #00f2ff, 0 0 10px #00f2ff' },
                    '50%': { boxShadow: '0 0 20px #00f2ff, 0 0 30px #00f2ff' },
                }
            },
            clipPath: {
                'tech-angle': 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            }
        },
    },
    plugins: [],
}
