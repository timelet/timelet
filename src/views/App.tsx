import React, { useEffect, useState } from 'react';
import { DatabaseProvider } from '../contexts/DatabaseContext';
import type { TimeletDatabase } from '../database';
import { initializeDatabase } from '../database';
import { Entries } from './Entries';

interface AppProps {}

export default function App({}: AppProps) {
  const [database, setDatabase] = useState<TimeletDatabase>()

  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }

    initialize();
  }, []);

  return <DatabaseProvider database={database}>
    <Entries />
  </DatabaseProvider>;
}
