import React, { createContext, PropsWithChildren, useContext } from 'react';
import type { TimeletDatabase } from '../database';

const DatabaseContext = createContext<TimeletDatabase | undefined>(undefined);
export function useDatabase() {
  return useContext(DatabaseContext);
}

type DatabaseProviderType = PropsWithChildren<{ database?: TimeletDatabase }>;

export function DatabaseProvider({ children, database }: DatabaseProviderType) {
  return <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>;
}
