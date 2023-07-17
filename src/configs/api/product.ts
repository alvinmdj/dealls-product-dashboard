import { API_ROOT } from '@/configs/api';

export const LIMIT = 100; // all products

export async function fetchProductList() {
  const response = await fetch(`${API_ROOT}/products?limit=${LIMIT}`);
  const data = await response.json();
  return data;
}

export async function fetchAllCategories() {
  const response = await fetch(`${API_ROOT}/products/categories`);
  const data = response.json();
  return data;
}
