import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

export default function ProductCard({ product,onProductDeleted }) {
    const router = useRouter();
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:hidden">
      <div className="flex gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-gray-900">
          {/* <h2 className="font-semibold"> */}
            <Link
                href={`/products/${product.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                {product.title}
            </Link>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {product.category}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Price</span>
              <p className="font-medium text-gray-900">
                ${product.price}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Rating</span>
              <p className="font-medium text-gray-900">
                ⭐ {product.rating}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Stock</span>
              <p className="font-medium text-gray-900">
                {product.stock}
              </p>
            </div>
            <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4">
                <button
                    onClick={function () {
                    router.push(`/products/${product.id}/edit`);
                    }}
                    className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Edit
                </button>
                <div className="flex-1">
                    <DeleteButton
                    productId={product.id}
                    onDeleted={onProductDeleted}
                    />
            </div>

               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}