import { apiClient } from '../../../shared/api';
import type { AddNotesProps } from '../../add-note/';

export type Props = AddNotesProps & {
  id: number;
};

export async function editNote({ category, title, content, id }: Props) {
  const res = await apiClient.patch(
    '/notes',
    { content, title, category },
    { params: id },
  );
  return res;
}
