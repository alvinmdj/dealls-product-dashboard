import { API_ROOT } from '@/configs/api';

export async function fetchCartList() {
  const response = await fetch(`${API_ROOT}/carts`);
  const data = await response.json();
  return data;
}
