export const REPLICATION_DOCUMENT_ID = 'replication';

export type ReplicationModel = {
  url: string;
};

export type ReplicationStatus = 'syncing' | 'synced' | 'error' | 'offline';
