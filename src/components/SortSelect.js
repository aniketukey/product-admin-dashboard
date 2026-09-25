"use client";

export default function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">Sort By</option>

      <option value="price-asc">
        Price: Low to High
      </option>

      <option value="price-desc">
        Price: High to Low
      </option>

      <option value="rating-asc">
        Rating: Low to High
      </option>

      <option value="rating-desc">
        Rating: High to Low
      </option>

      <option value="title-asc">
        Title: A to Z
      </option>

      <option value="title-desc">
        Title: Z to A
      </option>
    </select>
  );
}