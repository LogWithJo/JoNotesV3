import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from './QueryProvider';

function RouteProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default RouteProvider;
