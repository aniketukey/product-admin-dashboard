"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  addProduct,
  getCategories,
} from "../../../services/productService";

import Navbar from "../../../components/Navbar";

export default function AddProductPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [apiError, setApiError] = useState("");


    useEffect(function () {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
        const data = await getCategories();

        setCategories(data);
    } catch (error) {
        console.error("Unable to load categories:", error);
    } finally {
        setCategoriesLoading(false);
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!price) {
      newErrors.price = "Price is required.";
    } else if (Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!stock) {
      newErrors.stock = "Stock is required.";
    } else if (Number(stock) < 0) {
      newErrors.stock = "Stock cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setApiError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setSaving(true);

    try {
      const product = {
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
        description: description.trim(),
        stock: Number(stock),
      };

      await addProduct(product);

      router.push("/products");
    } catch (error) {
      setApiError("Unable to add product. Please try again.");
      setSaving(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <button
          type="button"
          onClick={function () {
            router.push("/products");
          }}
          className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Products
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a new product to the catalog.
            </p>
          </div>

          {apiError && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={function (event) {
                  setTitle(event.target.value);
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter product title"
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={function (event) {
                    setPrice(event.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter price"
                />

                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={function (event) {
                    setStock(event.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter stock"
                />

                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                </label>

                <select
                    value={category}
                    onChange={function (event) {
                    setCategory(event.target.value);
                    }}
                    disabled={categoriesLoading}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                >
                    <option value="">
                    {categoriesLoading
                        ? "Loading categories..."
                        : "Select a category"}
                    </option>

                    {categories.map(function (item) {
                    return (
                        <option
                        key={item.slug}
                        value={item.slug}
                        >
                        {item.name}
                        </option>
                    );
                    })}
                </select>

                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                    {errors.category}
                    </p>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={function (event) {
                  setDescription(event.target.value);
                }}
                rows="5"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter product description"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={function () {
                  router.push("/products");
                }}
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}