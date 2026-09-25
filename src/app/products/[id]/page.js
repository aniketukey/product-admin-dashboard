"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProductById,
  deleteProduct,
} from "../../../services/productService";
import Navbar from "../../../components/Navbar";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(function () {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      return;
    }

    loadProduct();
  }, [params.id]);

  async function handleDelete() {
  if (deleting) {
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) {
    return;
  }

  setDeleting(true);

  try {
    await deleteProduct(product.id);

    router.push("/products");
  } catch (error) {
    setDeleting(false);

    window.alert(
      "Unable to delete product. Please try again."
    );
  }
}

  async function loadProduct() {
    setLoading(true);
    setError("");

    try {
      const data = await getProductById(params.id);

      setProduct(data);
    } catch (error) {
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-gray-600">
              Loading product...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-lg border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Product Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              The product you are looking for does not exist.
            </p>

            <button
              onClick={function () {
                router.push("/products");
              }}
              className="mt-6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Back to Products
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <button
          onClick={function () {
            router.push("/products");
          }}
          className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Products
        </button>
        <button
            onClick={function () {
            router.push(`/products/${product.id}/edit`);
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
            Edit Product
        </button>

        <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {deleting ? "Deleting..." : "Delete Product"}
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-80 w-full rounded-lg object-contain bg-gray-50"
              />
            </div>

            <div>
              <p className="text-sm font-medium uppercase text-blue-600">
                {product.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              <p className="mt-4 text-gray-600">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Price
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Rating
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    ⭐ {product.rating}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    {product.stock}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Reviews
            </h2>

            {product.reviews &&
            product.reviews.length > 0 ? (
              <div className="mt-5 space-y-4">
                {product.reviews.map(function (review, index) {
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">
                          {review.reviewerName}
                        </p>

                        <p className="text-sm">
                          ⭐ {review.rating}
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No reviews available.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}