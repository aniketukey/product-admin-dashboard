"use client";

import { useState } from "react";

import { deleteProduct } from "../services/productService";

export default function DeleteButton({
  productId,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);

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
      await deleteProduct(productId);

      onDeleted(productId);
    } catch (error) {
      window.alert(
        "Unable to delete product. Please try again."
      );

      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}