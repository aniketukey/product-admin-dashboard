"use client";

export default function CategoryFilter({
  categories,
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">
        All Categories
      </option>

      {categories.map(function (category) {
        return (
          <option
            key={category.slug}
            value={category.slug}
          >
            {category.name}
          </option>
        );
      })}
    </select>
  );
}