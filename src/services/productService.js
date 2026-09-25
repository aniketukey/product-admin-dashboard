import api from "../lib/axios";

export async function getProducts(limit, skip) {
  const response = await api.get("/products", {
    params: {
      limit: limit,
      skip: skip,
    },
  });

  return response.data;
}

export async function searchProducts(query, limit, skip) {
  const response = await api.get("/products/search", {
    params: {
      q: query,
      limit: limit,
      skip: skip,
    },
  });

  return response.data;
}

export async function getCategories() {
  const response = await api.get("/products/categories");

  return response.data;
}

export async function getProductsByCategory(
  category,
  limit,
  skip
) {
  const response = await api.get(
    `/products/category/${category}`,
    {
      params: {
        limit: limit,
        skip: skip,
      },
    }
  );

  return response.data;
}
export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);

  return response.data;
}

export async function addProduct(product) {
  const response = await api.post("/products/add", product);

  return response.data;
}

export async function updateProduct(id, product) {
  const response = await api.put(
    `/products/${id}`,
    product
  );

  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);

  return response.data;
}