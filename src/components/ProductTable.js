"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

export default function ProductTable({ products, onProductDeleted }) {
  const router = useRouter();
    return (
    <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Image
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Title
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(function (product) {
              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    <Link
                        href={`/products/${product.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                        {product.title}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    ${product.price}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    ⭐ {product.rating}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button
                        onClick={function () {
                            router.push(`/products/${product.id}/edit`);
                        }}
                        className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                        >
                        Edit
                        </button>

                        <DeleteButton
                            productId={product.id}
                            onDeleted={onProductDeleted}
                        />                        
                    </div>
                   </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}