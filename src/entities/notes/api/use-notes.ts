import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotesCursor, fetchNotesOffset } from './notes.api';
import type {
  CursorPageRequest,
  NotesFilters,
  OffsetPageRequest,
} from '../model/notes.schema';
import { notesKeys } from './keys';

export const fetchOffsetNotes = (
  pagination: OffsetPageRequest,
  filters: NotesFilters,
) => {
  return queryOptions({
    queryKey: notesKeys.offsetList(filters, pagination),
    queryFn: ({ signal }) => fetchNotesOffset(signal, pagination, filters),
  });
};

export const useInfiniteNotes = (
  pagination: Pick<CursorPageRequest, 'limit'>,
  filters: NotesFilters,
) => {
  return useInfiniteQuery({
    queryKey: notesKeys.cursorList(filters, pagination),
    queryFn: ({ signal, pageParam }) =>
      fetchNotesCursor(
        signal,
        { limit: pagination.limit, cursor: pageParam },
        filters,
      ),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
