import { PropsWithChildren, useEffect, useState } from "react";
import { Provider } from "rxdb-hooks";
import { TimeletDatabase, initialize } from "./database";

type DatabaseProviderProps = PropsWithChildren;

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [database, setDatabase] = useState<TimeletDatabase>();

  useEffect(() => {
    initialize().then((database) => setDatabase(database));
  }, []);
  return <Provider db={database}>{children}</Provider>;
}
