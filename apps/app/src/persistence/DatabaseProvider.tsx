import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { TimeletDatabase, initialize } from "./database";

const DatabaseContext = createContext<TimeletDatabase | undefined>(undefined);
export function useDatabase() {
  return useContext(DatabaseContext);
}

type DatabaseProviderType = PropsWithChildren;

export function DatabaseProvider({ children }: DatabaseProviderType) {
  const [database, setDatabase] = useState<TimeletDatabase>();

  useEffect(() => {
    initialize().then((database) => setDatabase(database));
  }, []);

  return <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>;
}
