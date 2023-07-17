import { API_ROOT } from '@/configs/api';

export async function fetchUserById(id: number) {
  const response = await fetch(`${API_ROOT}/users/${id}`);
  const data = await response.json();
  return data;
}
