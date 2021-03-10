import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import saveFile from 'save-as-file';
import { format } from 'date-fns';
import { RxDumpDatabaseAny } from 'rxdb';
import StorageManagement from '../components/settings/StorageManagement';
import ProfileForm from '../components/settings/ProfileForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import ContentElement from '../layout/default/ContentElement';
import { createSubscriptionEffect } from '../utils/rxdb';
import { DatabaseCollections } from '../database';
import ReplicationForm from '../components/settings/ReplicationForm';
import { REPLICATION_DOCUMENT_ID, ReplicationModel } from '../domain/models/replicationModel';

export default function Settings() {
  const intl = useIntl();
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState<ProfileDocumentType[]>([]);
  const [currentProfile, setCurrentProfile] = React.useState<ProfileDocumentType>();
  const [replicationUrl, setReplicationUrl] = React.useState<string>();
  const getProfiles = React.useCallback(
    () =>
      createSubscriptionEffect(() =>
        database?.profiles.find().$.subscribe((docs) => {
          setProfiles(docs);
        })
      ),
    [database]
  );
  const getCurrentProfile = React.useCallback(
    () =>
      createSubscriptionEffect(() =>
        profiles
          ? database
              ?.getLocal$<SettingsDocumentType>(SETTINGS_DOCUMENT_ID)
              .subscribe((doc) => setCurrentProfile(profiles.find((p) => p.profileId === doc?.get('profile'))))
          : undefined
      ),
    [database, profiles]
  );
  const getReplicationUrl = React.useCallback(
    () =>
      createSubscriptionEffect(() =>
        database?.getLocal$<ReplicationModel>(REPLICATION_DOCUMENT_ID).subscribe((doc) => {
          setReplicationUrl(doc?.get('url'));
        })
      ),
    [database]
  );

  React.useEffect(() => getProfiles(), [getProfiles]);
  React.useEffect(() => getCurrentProfile(), [getCurrentProfile]);
  React.useEffect(() => getReplicationUrl(), [getReplicationUrl]);

  const selectProfile = async (profile: ProfileDocumentType) => {
    const currentSettings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
    database?.upsertLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID, { ...currentSettings, profile: profile.profileId });
  };

  const saveProfile = async (profile: ProfileDocumentType) => {
    const query = database?.profiles.findOne({ selector: { profileId: profile.profileId } });
    await query?.update({ $set: profile });
  };

  const saveUrl = async (url: string) => {
    await database?.upsertLocal<ReplicationModel>(REPLICATION_DOCUMENT_ID, {
      url
    });
  };

  const exportDump = async () => {
    const dump = await database?.dump();
    if (dump) {
      const filename = `${intl.formatMessage({ id: 'app.title', defaultMessage: 'Timelet' })}-${format(
        new Date(),
        'yyyy-MM-dd_HH-mm'
      )}.json`.toLowerCase();
      const type = 'text/plain;charset=utf-8';
      const file = new Blob([JSON.stringify(dump)], { type });
      saveFile(file, filename);
    }
  };

  const importDump = async (fileContent: string) => {
    const dump = JSON.parse(fileContent) as RxDumpDatabaseAny<DatabaseCollections>;
    await database?.importDump(dump);
  };

  const deleteAllLocalData = async () => {
    await database?.remove();
    window.location.reload();
  };

  return (
    <>
      <ContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.profiles" defaultMessage="Profiles" />
        </Typography>
        {currentProfile ? (
          <ProfileForm profiles={profiles} currentProfile={currentProfile} selectProfile={selectProfile} saveProfile={saveProfile} />
        ) : (
          <CircularProgress />
        )}
      </ContentElement>
      <ContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.replication" defaultMessage="Replication" />
        </Typography>
        <ReplicationForm saveUrl={saveUrl} url={replicationUrl} />
      </ContentElement>
      <ContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.storage" defaultMessage="Storage" />
        </Typography>
        <StorageManagement exportDump={exportDump} importDump={importDump} deleteAllLocalData={deleteAllLocalData} />
      </ContentElement>
    </>
  );
}
