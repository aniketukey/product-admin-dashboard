export default function Pagination({
  page,
  totalPages,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) {
  const startItem =
    total === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endItem = Math.min(
    page * pageSize,
    total
  );

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-gray-600">
        Showing {startItem}–{endItem} of {total}
      </p>

      <div className="flex items-center gap-1 overflow-x-auto">
        <button
          onClick={function () {
            onPageChange(page - 1);
          }}
          disabled={page === 1}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          function (_, index) {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={function () {
                  onPageChange(pageNumber);
                }}
                className={
                  pageNumber === page
                    ? "rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                    : "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                }
              >
                {pageNumber}
              </button>
            );
          }
        )}

        <button
          onClick={function () {
            onPageChange(page + 1);
          }}
          disabled={page === totalPages}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap text-sm text-gray-600">
          Page size:
        </label>

        <select
          value={pageSize}
          onChange={onPageSizeChange}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}