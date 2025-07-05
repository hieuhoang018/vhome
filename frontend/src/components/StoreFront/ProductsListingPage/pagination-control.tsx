"use client"

import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams"

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

export default function PaginationControl({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const updateParams = useUpdateQueryParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const pageNumbers: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.push(1)

    if (currentPage > 4) {
      pageNumbers.push("...")
    }

    const startPage = Math.max(2, currentPage - 2)
    const endPage = Math.min(totalPages - 1, currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...")
    }

    pageNumbers.push(totalPages)
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        disabled={currentPage <= 1}
        onClick={() => updateParams({ page: String(currentPage - 1) })}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => updateParams({ page: String(p) })}
            className={`px-4 py-2 rounded ${
              p === currentPage
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => updateParams({ page: String(currentPage + 1) })}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
