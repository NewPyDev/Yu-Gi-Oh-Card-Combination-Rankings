export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 glass-effect rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === page
                                    ? 'bg-gradient-to-r from-yugioh-purple to-yugioh-blue text-white'
                                    : 'glass-effect hover:bg-white/10'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 glass-effect rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
            >
                Next
            </button>
        </div>
    )
}
