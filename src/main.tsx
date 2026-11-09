import ReactDOM from 'react-dom/client';
import { AppRouter } from './app';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<AppRouter />);
}
