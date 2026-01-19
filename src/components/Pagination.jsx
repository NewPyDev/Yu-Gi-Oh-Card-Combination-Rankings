import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

            if (endPage - startPage < maxPagesToShow - 1) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-12 mb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-cyber-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                &lt; PREV
            </button>

            {getPageNumbers().map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span className="text-tech-gray px-2 font-rajdhani">...</span>
                    ) : (
                        <button
                            onClick={() => onPageChange(page)}
                            className={`
                                relative px-4 py-2 font-orbitron font-bold text-sm clip-path-polygon transition-all duration-300
                                ${currentPage === page
                                    ? 'bg-neon-cyan text-duelist-dark shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                                    : 'bg-duelist-panel text-tech-gray border border-white/10 hover:border-neon-cyan/50 hover:text-white'
                                }
                            `}
                            style={{
                                clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)'
                            }}
                        >
                            {page}
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-cyber-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                NEXT &gt;
            </button>
        </div>
    );
};

export default Pagination;
