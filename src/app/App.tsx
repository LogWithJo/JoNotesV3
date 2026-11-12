import type React from 'react';
import { useGetMe } from '../entities/user';
import { useLogout } from '../features/user-logout';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useNotes } from '../entities/notes';
import { useAddNote } from '../features/add-note/api/use-add-note';
import { useEditNote } from '../features/edit-note/api/use-edit-note';
import { useDeleteNote } from '../features/delete-note/api/use-delete-note';
import { useTogglePin } from '../features/toggle-pin/api/use-toggle-pin';
import { useLogin } from '../features/user-login';

type Props = {
  isAuth: boolean;
  onSuccess: Dispatch<SetStateAction<boolean>>;
};

const useIsAuth = () => {
  const [auth, setAuth] = useState<boolean>(!!localStorage.getItem('isAuth'));
  localStorage.setItem('isAuth', JSON.stringify(auth));
  return [auth, setAuth] as const;
};

function App() {
  const [auth, setAuth] = useIsAuth();
  return (
    <div>
      <User isAuth={auth} />
      <Login onSuccess={setAuth} isAuth={auth} />
      <Logout onSuccess={setAuth} isAuth={auth} />
      <Notes isAuth={auth} />
    </div>
  );
}

export default App;

function User({ isAuth }: Pick<Props, 'isAuth'>) {
  const { data, isLoading, isError } = useGetMe();

  if (!isAuth) return;

  return (
    <div>
      <div>{data?.user.email}</div>
      <div>{data?.user.id}</div>
      <div>{data?.user.createdAt}</div>
      <div>{isLoading && 'loading...'}</div>
      <div>{isError && 'error'}</div>
    </div>
  );
}

function Logout({ isAuth, onSuccess }: Props) {
  const { mutate, isPending, isError } = useLogout();

  if (!isAuth) {
    return;
  }

  return (
    <div>
      <button
        onClick={() => {
          mutate(undefined, { onSuccess: () => onSuccess(false) });
        }}
      >
        logout
      </button>
      <div>{isPending && 'loading...'}</div>
      <div>{isError && 'error'}</div>
    </div>
  );
}

function Login({ isAuth, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isError } = useLogin();

  if (isAuth) {
    return;
  }

  function handlesubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          setEmail('');
          setPassword('');
          onSuccess(true);
        },
      },
    );
  }
  return (
    <form action="">
      <div>{isPending && 'loading...'}</div>
      <div>{isError && 'error'}</div>
      <input
        placeholder="email"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" onClick={handlesubmit}>
        login
      </button>
    </form>
  );
}

function Notes({ isAuth }: Pick<Props, 'isAuth'>) {
  const { data, isLoading, isError } = useNotes();
  const addNote = useAddNote();
  const editNote = useEditNote();
  const deleteNote = useDeleteNote();
  const togglePin = useTogglePin();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  if (!isAuth) return;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedNoteId !== null) {
            editNote.mutate(
              {
                id: selectedNoteId,
                data: { title, content, category },
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
            addNote.mutate(
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
          onChange={(e) => setTitle(e.target.value)}
        />
        {selectedNoteId !== null && (
          <textarea
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        <input
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">
          {selectedNoteId !== null ? 'save note' : 'add note'}
        </button>
      </form>
      <div>{addNote.isPending && 'loading...'}</div>
      <div>{addNote.isError && 'error'}</div>
      <div>{editNote.isPending && 'loading...'}</div>
      <div>{editNote.isError && 'error'}</div>
      <div>{isLoading && 'loading...'}</div>
      <div>{isError && 'error'}</div>
      {data?.map(
        (note: {
          id: number;
          title: string;
          content: string;
          category: string;
        }) => (
          <div key={note.id}>
            <button
              type="button"
              onClick={() => {
                setSelectedNoteId(note.id);
                setTitle(note.title);
                setContent(note.content);
                setCategory(note.category);
              }}
            >
              {note.title}
            </button>
            <button type="button" onClick={() => togglePin.mutate(note.id)}>
              toggle pin
            </button>
            <button
              type="button"
              onClick={() =>
                deleteNote.mutate(note.id, {
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
      <div>{deleteNote.isPending && 'loading...'}</div>
      <div>{deleteNote.isError && 'error'}</div>
      <div>{togglePin.isPending && 'loading...'}</div>
      <div>{togglePin.isError && 'error'}</div>
    </div>
  );
}
