import type React from 'react';
import { useLogout } from '../features/user-logout';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useAddNote } from '../features/add-note';
import { useEditNote } from '../features/edit-note';
import { useDeleteNote } from '../features/delete-note';
import { useTogglePin } from '../features/toggle-pin';
import { useLogin } from '../features/user-login';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMeOptions } from '../entities/user';
import {
  type NoteId,
  type NotesFilters,
  fetchOffsetNotes,
  useInfiniteNotes,
} from '../entities/notes';
import { getNoteOptions } from '../features/get-note';
import { useDebounceValue } from 'usehooks-ts';

const DEFAULT_FILTER_DEBOUNCE_MS = 1000;
const NOTES_PAGE_LIMIT = 4;

type Props = {
  isAuth: boolean;
  onSuccess: Dispatch<SetStateAction<boolean>>;
};

const useAuthenticationState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('isAuth'),
  );
  localStorage.setItem('isAuth', JSON.stringify(isAuthenticated));
  return [isAuthenticated, setIsAuthenticated] as const;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useAuthenticationState();
  return (
    <div>
      <User isAuth={isAuthenticated} />
      <Login onSuccess={setIsAuthenticated} isAuth={isAuthenticated} />
      <Logout onSuccess={setIsAuthenticated} isAuth={isAuthenticated} />
      <Notes isAuth={isAuthenticated} />
    </div>
  );
}

export default App;

function User({ isAuth }: Pick<Props, 'isAuth'>) {
  const {
    data: currentUserResponse,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
  } = useQuery(getMeOptions());

  if (!isAuth) return;

  return (
    <div>
      <div>{currentUserResponse?.user.email}</div>
      <div>{currentUserResponse?.user.id}</div>
      <div>{currentUserResponse?.user.createdAt}</div>
      <div>{isCurrentUserLoading && 'loading...'}</div>
      <div>{isCurrentUserError && 'error'}</div>
    </div>
  );
}

function Logout({ isAuth, onSuccess }: Props) {
  const logoutMutation = useLogout();

  if (!isAuth) {
    return;
  }

  return (
    <div>
      <button
        onClick={() => {
          logoutMutation.mutate(undefined, {
            onSuccess: () => onSuccess(false),
          });
        }}
      >
        logout
      </button>
      <div>{logoutMutation.isPending && 'loading...'}</div>
      <div>{logoutMutation.isError && 'error'}</div>
    </div>
  );
}

function Login({ isAuth, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  if (isAuth) {
    return;
  }

  function handleLoginSubmit(event: React.FormEvent) {
    event.preventDefault();
    loginMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPassword('');
          onSuccess(true);
        },
      },
    );
  }
  return (
    <form action="">
      <div>{loginMutation.isPending && 'loading...'}</div>
      <div>{loginMutation.isError && 'error'}</div>
      <input
        placeholder="name"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        placeholder="email"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit" onClick={handleLoginSubmit}>
        login
      </button>
    </form>
  );
}

function Notes({ isAuth }: Pick<Props, 'isAuth'>) {
  const addNoteMutation = useAddNote();
  const editNoteMutation = useEditNote();
  const deleteNoteMutation = useDeleteNote();
  const togglePinMutation = useTogglePin();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');
  const [notesMode, setNotesMode] = useState<'cursor' | 'offset'>('cursor');
  const [page, setPage] = useState(1);
  const pageLimit = NOTES_PAGE_LIMIT;
  const [appliedFilterValue, setAppliedFilter] = useState<
    NotesFilters | undefined
  >(undefined);
  const [appliedFilter] = useDebounceValue(
    appliedFilterValue,
    DEFAULT_FILTER_DEBOUNCE_MS,
  );
  const offsetFilters = appliedFilter ?? { sort };
  const queryClient = useQueryClient();
  const { data: selectedNote } = useQuery({
    ...getNoteOptions(selectedNoteId ?? 0),
    enabled: selectedNoteId !== null,
  });
  const {
    data: cursorPageData,
    isLoading: isCursorLoading,
    isError: isCursorError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteNotes({ limit: pageLimit }, offsetFilters);
  const {
    data: offsetPageData,
    isLoading: isOffsetLoading,
    isError: isOffsetError,
    isPlaceholderData: isOffsetPlaceholderData,
  } = useQuery({
    ...fetchOffsetNotes({ page, limit: pageLimit }, offsetFilters),
    placeholderData: keepPreviousData,
    enabled: notesMode === 'offset',
  });
  const cursorEndRef = useRef<HTMLDivElement | null>(null);

  const prefetchNote = (noteId: NoteId) => {
    queryClient.prefetchQuery(getNoteOptions(noteId));
  };

  const prefetchOffsetPage = (pageNumber: number) => {
    queryClient.prefetchQuery({
      ...fetchOffsetNotes({ page: pageNumber, limit: pageLimit }, offsetFilters),
    });
  };

  useEffect(() => {
    const sentinelElement = cursorEndRef.current;
    if (
      notesMode !== 'cursor' ||
      !sentinelElement ||
      !hasNextPage ||
      isCursorError
    ) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !isFetchingNextPage) {
        void fetchNextPage();
      }
    });
    observer.observe(sentinelElement);
    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isCursorError,
    isFetchingNextPage,
    notesMode,
  ]);

  useEffect(() => {
    const populateSelectedNoteForm = () => {
      if (selectedNote && selectedNote.id === selectedNoteId) {
        setTitle(selectedNote.title);
        setContent(selectedNote.content);
        setCategory(selectedNote.category);
      }
    };
    populateSelectedNoteForm();
  }, [selectedNote, selectedNoteId]);

  if (!isAuth) return;

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (selectedNoteId !== null) {
            editNoteMutation.mutate(
              {
                noteId: selectedNoteId,
                noteChanges: { title, content, category },
              },
              {
                onSuccess: () => {
                  setSelectedNoteId(null);
                  setTitle('');
                  setContent('');
                  setCategory('');
                },
              },
            );
          } else {
            addNoteMutation.mutate(
              { title, category },
              {
                onSuccess: () => {
                  setSelectedNoteId(null);
                  setTitle('');
                  setContent('');
                  setCategory('');
                },
              },
            );
          }
        }}
      >
        <input
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {selectedNoteId !== null && (
          <textarea
            placeholder="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        )}
        <input
          placeholder="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">
          {selectedNoteId !== null ? 'save note' : 'add note'}
        </button>
      </form>
      <div>{addNoteMutation.isPending && 'loading...'}</div>
      <div>{addNoteMutation.isError && 'error'}</div>
      <div>{editNoteMutation.isPending && 'loading...'}</div>
      <div>{editNoteMutation.isError && 'error'}</div>
      <div>
        {(notesMode === 'offset' ? isOffsetLoading : isCursorLoading) &&
          'loading...'}
      </div>
      <div>
        {(notesMode === 'offset' ? isOffsetError : isCursorError) && 'error'}
      </div>
      <div>
        <input
          placeholder="filter by category"
          value={filterCategory}
          onChange={(event) => {
            setFilterCategory(event.target.value);
            setPage(1);
            setAppliedFilter({
              category: event.target.value.trim() || undefined,
              search: search.trim() || undefined,
              sort,
            });
          }}
        />
        <input
          placeholder="search notes"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
            setAppliedFilter({
              category: filterCategory.trim() || undefined,
              search: event.target.value.trim() || undefined,
              sort,
            });
          }}
        />
        <button
          type="button"
          onClick={() => {
            setSort('newest');
            setPage(1);
            setAppliedFilter({
              category: filterCategory.trim() || undefined,
              search: search.trim() || undefined,
              sort: 'newest',
            });
          }}
        >
          newest
        </button>
        <button
          type="button"
          onClick={() => {
            setSort('oldest');
            setPage(1);
            setAppliedFilter({
              category: filterCategory.trim() || undefined,
              search: search.trim() || undefined,
              sort: 'oldest',
            });
          }}
        >
          oldest
        </button>
        <button
          type="button"
          onClick={() => {
            setSort('az');
            setPage(1);
            setAppliedFilter({
              category: filterCategory.trim() || undefined,
              search: search.trim() || undefined,
              sort: 'az',
            });
          }}
        >
          A-Z
        </button>
        <button
          type="button"
          onClick={() => {
            setSort('za');
            setPage(1);
            setAppliedFilter({
              category: filterCategory.trim() || undefined,
              search: search.trim() || undefined,
              sort: 'za',
            });
          }}
        >
          Z-A
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterCategory('');
            setSearch('');
            setSort('newest');
            setPage(1);
            setAppliedFilter(undefined);
          }}
        >
          clear filters
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setNotesMode((mode) => (mode === 'cursor' ? 'offset' : 'cursor'));
          setPage(1);
        }}
      >
        {notesMode === 'cursor'
          ? 'use offset pagination'
          : 'use cursor pagination'}
      </button>
      <div
        style={{
          opacity: notesMode === 'offset' && isOffsetPlaceholderData ? 0.5 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {(notesMode === 'offset'
          ? offsetPageData?.items
          : cursorPageData?.pages.flatMap((page) => page.items)
        )?.map(
          (note: {
            id: number;
            title: string;
            content: string;
            category: string;
          }) => (
            <div key={note.id}>
              <button
                onMouseEnter={() => prefetchNote(note.id)}
                onFocus={() => prefetchNote(note.id)}
                type="button"
                onClick={() => {
                  setSelectedNoteId(note.id);
                }}
              >
                {note.title}
              </button>
              <button
                type="button"
                onClick={() => togglePinMutation.mutate(note.id)}
              >
                toggle pin
              </button>
              <button
                type="button"
                onClick={() =>
                  deleteNoteMutation.mutate(note.id, {
                    onSuccess: () => {
                      if (selectedNoteId === note.id) {
                        setSelectedNoteId(null);
                        setTitle('');
                        setContent('');
                        setCategory('');
                      }
                    },
                  })
                }
              >
                delete
              </button>
            </div>
          ),
        )}
      </div>
      {notesMode === 'cursor' && hasNextPage && <div ref={cursorEndRef} />}
      {notesMode === 'offset' && (
        <div>
          <button
            type="button"
            disabled={page === 1 || isOffsetPlaceholderData}
            onMouseEnter={() => prefetchOffsetPage(page - 1)}
            onClick={() => setPage((current) => current - 1)}
          >
            previous
          </button>
          {Array.from(
            { length: offsetPageData?.totalPages ?? 0 },
            (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  disabled={page === pageNumber || isOffsetPlaceholderData}
                  onMouseEnter={() => prefetchOffsetPage(pageNumber)}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            },
          )}
          <button
            type="button"
            disabled={
              !offsetPageData ||
              page >= offsetPageData.totalPages ||
              isOffsetPlaceholderData
            }
            onMouseEnter={() => prefetchOffsetPage(page + 1)}
            onClick={() => setPage((current) => current + 1)}
          >
            next
          </button>
        </div>
      )}
      <div>{deleteNoteMutation.isPending && 'loading...'}</div>
      <div>{deleteNoteMutation.isError && 'error'}</div>
      <div>{togglePinMutation.isPending && 'loading...'}</div>
      <div>{togglePinMutation.isError && 'error'}</div>
    </div>
  );
}
