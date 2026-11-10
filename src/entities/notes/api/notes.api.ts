import { apiClient } from '../../../shared/api';

type FilterParams = {
  category: string;
  search: string;
  sort: 'oldest' | 'az' | 'za';
};

export type FilterParam = keyof FilterParams;

export async function getNotes(param?: FilterParam) {
  const res = await apiClient.get('/notes', { params: param });
  return res;
}
