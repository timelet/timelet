import React from 'react';
import { Sync as SyncIcon, SyncProblem as SyncErrorIcon, SyncDisabled as SyncOfflineIcon } from '@material-ui/icons';
import { RxReplicationState } from 'rxdb';
import { useDatabase } from '../contexts/DatabaseContext';
import { ReplicationModel, ReplicationStatus, REPLICATION_DOCUMENT_ID } from '../domain/models/replicationModel';
import { createSubscriptionEffect } from '../utils/rxdb';

export default function Status() {
  const database = useDatabase();
  const [replicationUrl, setReplicationUrl] = React.useState<string>();
  const [replicationStatus, setReplicationStatus] = React.useState<ReplicationStatus>('offline');
  const getReplicationUrl = React.useCallback(
    () =>
      createSubscriptionEffect(() =>
        database?.getLocal$<ReplicationModel>(REPLICATION_DOCUMENT_ID).subscribe((doc) => {
          setReplicationUrl(doc?.get('url'));
        })
      ),
    [database]
  );
  const registerReplicationState = (state: RxReplicationState) => {
    state.error$.subscribe(() => {
      setReplicationStatus('error');
    });
    state.complete$.subscribe(() => {
      setReplicationStatus('synced');
    });
    state.denied$.subscribe(() => {
      setReplicationStatus('error');
    });
  };

  React.useEffect(() => getReplicationUrl(), [getReplicationUrl]);
  React.useEffect(() => {
    const replicationStates: RxReplicationState[] = [];
    if (replicationUrl && database) {
      const entriesReplication = database.collections.entries.sync({ remote: replicationUrl });
      registerReplicationState(entriesReplication);
      replicationStates.push(entriesReplication);
      replicationStates.push(database.collections.profiles.sync({ remote: replicationUrl }));
    }

    return () => {
      Promise.all(replicationStates.map((s) => s.cancel()));
    };
  }, [database, replicationUrl]);

  if (!replicationUrl) {
    return null;
  }

  switch (replicationStatus) {
    case 'offline':
      return <SyncOfflineIcon />;
    case 'error':
      return <SyncErrorIcon />;
    case 'synced':
      return <SyncIcon />;
    default:
      return <SyncOfflineIcon />;
  }
}
