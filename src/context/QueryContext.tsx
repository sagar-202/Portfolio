/**
 * SAGAR.DB — QueryContext
 *
 * Provides query engine state to all components via React Context.
 * Single instance wraps the entire app so Terminal, Header, and
 * QueryNavigation all share one execution state.
 */

import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, type UseQueryReturn } from '../hooks/useQuery';

const QueryContext = createContext<UseQueryReturn | null>(null);

export function QueryProvider({ children }: { children: ReactNode }) {
  const query = useQuery();
  return <QueryContext.Provider value={query}>{children}</QueryContext.Provider>;
}

/** Access the shared query engine from any component */
export function useQueryContext(): UseQueryReturn {
  const ctx = useContext(QueryContext);
  if (!ctx) {
    throw new Error('useQueryContext must be used inside <QueryProvider>');
  }
  return ctx;
}
