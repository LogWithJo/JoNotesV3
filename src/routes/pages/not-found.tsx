import { createFileRoute, Link } from '@tanstack/react-router';
import { NotFoundPage } from '#/pages/404-page';

export const Route = createFileRoute('/pages/not-found')({
  component: () => <NotFoundPage homeLink={<Link to="/">Return home</Link>} />,
});
