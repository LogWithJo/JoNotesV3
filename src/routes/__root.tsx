import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { NotFoundPage } from '#/pages/404-page';
import RouteProvider from '#/app/providers/RouterProvider';

export const Route = createRootRoute({
  component: () => (
    <RouteProvider>
      <Outlet />
    </RouteProvider>
  ),
  notFoundComponent: () => (
    <NotFoundPage homeLink={<Link to="/">Return home</Link>} />
  ),
});
