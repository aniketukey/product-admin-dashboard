"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, } from "next/navigation";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../../services/productService";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import SortSelect from "../../components/SortSelect";
import ProductTable from "../../components/ProductTable";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allowedPageSizes = [10, 20, 50];

    const allowedSorts = [
    "price-asc",
    "price-desc",
    "rating-asc",
    "rating-desc",
    "title-asc",
    "title-desc",
    ];

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const requestIdRef = useRef(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(function () {
    const rawPage = searchParams.get("page");
    const rawPageSize = searchParams.get("pageSize");
    const rawSearch = searchParams.get("search");
    const rawCategory = searchParams.get("category");
    const rawSort = searchParams.get("sort");

    let urlPage = 1;
    let urlPageSize = 20;
    let urlSearch = rawSearch || "";
    let urlCategory = rawCategory || "";
    let urlSort = "";

    let shouldUpdateUrl = false;

    if (rawPage !== null) {
        const parsedPage = Number(rawPage);

        if (
        Number.isInteger(parsedPage) &&
        parsedPage >= 1
        ) {
        urlPage = parsedPage;
        } else {
        shouldUpdateUrl = true;
        }
    }

    if (rawPageSize !== null) {
        const parsedPageSize = Number(rawPageSize);

        if (allowedPageSizes.includes(parsedPageSize)) {
        urlPageSize = parsedPageSize;
        } else {
        shouldUpdateUrl = true;
        }
    }

    if (rawSort !== null) {
        if (allowedSorts.includes(rawSort)) {
        urlSort = rawSort;
        } else {
        shouldUpdateUrl = true;
        }
    }

    setPage(urlPage);
    setPageSize(urlPageSize);
    setSearch(urlSearch);
    setCategory(urlCategory);
    setSort(urlSort);

    if (shouldUpdateUrl) {
        const params = new URLSearchParams();

        if (urlPage !== 1) {
        params.set("page", urlPage);
        }

        if (urlPageSize !== 20) {
        params.set("pageSize", urlPageSize);
        }

        if (urlSearch.trim()) {
        params.set("search", urlSearch.trim());
        }

        if (urlCategory) {
        params.set("category", urlCategory);
        }

        if (urlSort) {
        params.set("sort", urlSort);
        }

        const queryString = params.toString();

        if (queryString) {
        router.replace(`/products?${queryString}`);
        } else {
        router.replace("/products");
        }
    }
  }, [
    searchParams,
    router,
  ]);

  useEffect(function () {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      return;
    }

    loadProducts();
  }, [page, pageSize, debouncedSearch, category, sort]);
  
  useEffect(function () {
    loadCategories();
  }, []);


  function handleClearFilters() {
    setSearch("");
    setCategory("");
    setSort("");
    setPage(1);

    updateUrl(
        1,
        pageSize,
        "",
        "",
        ""
    );
  }
  function handleRetry() {
    loadProducts();
  }

  function updateUrl(
    newPage,
    newPageSize,
    newSearch,
    newCategory,
    newSort
    ) {
    const params = new URLSearchParams();

    if (newPage !== 1) {
        params.set("page", newPage);
    }

    if (newPageSize !== 20) {
        params.set("pageSize", newPageSize);
    }

    if (newSearch.trim()) {
        params.set("search", newSearch.trim());
    }

    if (newCategory) {
        params.set("category", newCategory);
    }

    if (newSort) {
        params.set("sort", newSort);
    }

    const queryString = params.toString();

    if (queryString) {
        router.replace(`/products?${queryString}`);
    } else {
        router.replace("/products");
    }
  }

 async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error("Unable to load categories:", error);
    }
  }

  async function loadProducts() {
  const requestId = requestIdRef.current + 1;

  requestIdRef.current = requestId;

  setLoading(true);
  setError("");

  const skip = (page - 1) * pageSize;

  try {
    let data;

    if (debouncedSearch.trim() && category) {
  const searchData = await searchProducts(
    debouncedSearch.trim(),
    0,
    0
  );

  const filteredProducts = searchData.products.filter(
    function (product) {
      return product.category === category;
    }
  );

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  data = {
    products: filteredProducts.slice(start, end),
    total: filteredProducts.length,
  };
} else if (debouncedSearch.trim()) {
  data = await searchProducts(
    debouncedSearch.trim(),
    pageSize,
    skip
  );
} else if (category) {
  data = await getProductsByCategory(
    category,
    pageSize,
    skip
  );
} else {
  data = await getProducts(pageSize, skip);
} 
    // else if (category) {
    //   data = await getProductsByCategory(
    //     category,
    //     pageSize,
    //     skip
    //   );
    // } else {
    //   data = await getProducts(
    //     pageSize,
    //     skip
    //   );
    // }

    if (requestId !== requestIdRef.current) {
      return;
    }

    let sortedProducts = [...data.products];

    if (sort === "price-asc") {
    sortedProducts.sort(function (a, b) {
        return a.price - b.price;
    });
    }

    if (sort === "price-desc") {
    sortedProducts.sort(function (a, b) {
        return b.price - a.price;
    });
    }

    if (sort === "rating-asc") {
    sortedProducts.sort(function (a, b) {
        return a.rating - b.rating;
    });
    }

    if (sort === "rating-desc") {
    sortedProducts.sort(function (a, b) {
        return b.rating - a.rating;
    });
    }

    if (sort === "title-asc") {
    sortedProducts.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    }

    if (sort === "title-desc") {
    sortedProducts.sort(function (a, b) {
        return b.title.localeCompare(a.title);
    });
    }

    setProducts(sortedProducts);
    setTotal(data.total);
  } catch (error) {
    if (requestId !== requestIdRef.current) {
      return;
    }

    setError("Unable to load products.");
  } finally {
    if (requestId === requestIdRef.current) {
      setLoading(false);
    }
  }
}

  function handleProductDeleted(productId) {
  setProducts(function (currentProducts) {
    return currentProducts.filter(function (product) {
      return product.id !== productId;
    });
  });

  setTotal(function (currentTotal) {
    return Math.max(currentTotal - 1, 0);
  });
  }
  function handleSearchChange(event) {
    const newSearch = event.target.value;

    setSearch(newSearch);
    setPage(1);

    updateUrl(
        1,
        pageSize,
        newSearch,
        category,
        sort
    );
  }

  function handlePageChange(newPage) {
    setPage(newPage);

    updateUrl(
        newPage,
        pageSize,
        search,
        category,
        sort
    );
  }

  function handleCategoryChange(event) {
    const newCategory = event.target.value;

    setCategory(newCategory);
    setPage(1);

    updateUrl(
        1,
        pageSize,
        search,
        newCategory,
        sort
    );
  }
  function handleSortChange(event) {
    const newSort = event.target.value;

    setSort(newSort);
    setPage(1);

    updateUrl(
        1,
        pageSize,
        search,
        category,
        newSort
    );
  }

  function handlePageSizeChange(event) {
    const newPageSize = Number(event.target.value);

    setPageSize(newPageSize);
    setPage(1);

    updateUrl(
        1,
        newPageSize,
        search,
        category,
        sort
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">
          <p className="text-gray-600">
            Loading products...
          </p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">
          <div className="text-center">
            <p className="text-red-600">
              {error}
            </p>

            <button
              onClick={loadProducts}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your product inventory
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">

            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="w-full md:w-56">
              <CategoryFilter
                categories={categories}
                value={category}
                onChange={handleCategoryChange}
                />
            </div>

            <div className="w-full md:w-56">
              <SortSelect  
                    value={sort}
                    onChange={handleSortChange}
              />
            </div>

            <button 
                onClick={function () {
                router.push("/products/add");
                }}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Product
            </button>

          </div>
        </div>

        {loading ? (
            <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center">
                <p className="text-gray-600">
                Loading products...
                </p>
            </div>
            ) : error ? (
            <ErrorState onRetry={handleRetry} />
            ) : products.length === 0 ? (
            <EmptyState onClear={handleClearFilters} />
            ) : (
            <>
                <ProductTable
                products={products}
                onProductDeleted={handleProductDeleted}
                />

                <div className="space-y-4 md:hidden">
                {products.map(function (product) {
                    return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductDeleted={handleProductDeleted}
                    />
                    );
                })}
                </div>
            </>
            )}

        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-sm">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>

      </main>
    </div>
  );
}