import { QueryClient } from '@tanstack/react-query';

const DEFAULT_QUERY_RETRY_COUNT = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: DEFAULT_QUERY_RETRY_COUNT,
    },
  },
});
