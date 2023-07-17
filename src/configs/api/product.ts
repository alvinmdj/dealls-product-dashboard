import { API_ROOT } from '@/configs/api';

export const LIMIT = 4;

export async function fetchProductList(skip: number) {
  const response = await fetch(
    `${API_ROOT}/products?limit=${LIMIT}&skip=${skip}`
  );
  const data = await response.json();
  return data;
}
