"use client";

import { useEffect } from "react";
import { getProducts } from "../services/productService";

export default function Home() {
  useEffect(function () {
    getProducts()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Product Admin Dashboard
      </h1>
    </main>
  );
}