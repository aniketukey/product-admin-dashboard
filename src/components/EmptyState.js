"use client";

export default function EmptyState({ onClear }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center">
      <div className="text-4xl">
        📦
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        No products found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Clear Filters
      </button>
    </div>
  );
}