import { API_ROOT } from '@/configs/api';

export async function fetchProductList() {
  const response = await fetch(`${API_ROOT}/products`);
  const data = await response.json();
  return data;
}
