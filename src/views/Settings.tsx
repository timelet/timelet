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

export default function Settings() {
  const intl = useIntl();
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState<ProfileDocumentType[]>([]);
  const [currentProfile, setCurrentProfile] = React.useState<ProfileDocumentType>();
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

  React.useEffect(() => getProfiles(), [getProfiles]);
  React.useEffect(() => getCurrentProfile(), [getCurrentProfile]);

  const selectProfile = async (profile: ProfileDocumentType) => {
    const currentSettings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
    database?.upsertLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID, { ...currentSettings, profile: profile.profileId });
  };

  const saveProfile = async (profile: ProfileDocumentType) => {
    const query = database?.profiles.findOne({ selector: { profileId: profile.profileId } });
    await query?.update({ $set: profile });
  };

  const saveUrl = async (url: string) => {};

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
        <ReplicationForm saveUrl={saveUrl} />
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
