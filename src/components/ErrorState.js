"use client";

export default function ErrorState({ onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-white px-6 py-12 text-center">
      <div className="text-4xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        We could not load the products.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
}