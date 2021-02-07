import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import saveFile from 'save-as-file';
import { format } from 'date-fns';
import StorageManagement from '../components/settings/StorageManagement';
import ProfileForm from '../components/settings/ProfileForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import { createSubscriptionEffect } from '../utils/rxdb';

export default function Settings() {
  const intl = useIntl();
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState<ProfileDocumentType[]>([]);
  const [currentProfile, setCurrentProfile] = React.useState<ProfileDocumentType>();

  React.useEffect(
    createSubscriptionEffect(() =>
      database?.profiles.find().$.subscribe((docs) => {
        setProfiles(docs);
      })
    ),
    [database]
  );

  React.useEffect(
    createSubscriptionEffect(() =>
      database
        ?.getLocal$<SettingsDocumentType>(SETTINGS_DOCUMENT_ID)
        .subscribe((doc) => setCurrentProfile(profiles.find((p) => p.profileId === doc?.get('profile'))))
    ),
    [profiles]
  );

  const selectProfile = async (profile: ProfileDocumentType) => {
    const currentSettings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
    database?.upsertLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID, { ...currentSettings, profile: profile.profileId });
  };

  const saveProfile = async (profile: ProfileDocumentType) => {
    const query = database?.profiles.findOne({ selector: { profileId: profile.profileId } });
    await query?.update({ $set: profile });
  };

  const exportDump = async () => {
    const dump = await database?.dump();
    if (dump) {
      const filename = `${intl.formatMessage({ id: 'app.title' })}-${format(new Date(), 'yyyy-MM-dd_HH-mm')}.json`.toLowerCase();
      const type = 'text/plain;charset=utf-8';
      const file = new Blob([JSON.stringify(dump)], { type });
      saveFile(file, filename);
    }
  };

  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.settings" defaultMessage="Settings" />
      </Typography>
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
          <FormattedMessage id="title.storage" defaultMessage="Storage" />
        </Typography>
        <StorageManagement exportDump={exportDump} />
      </ContentElement>
    </ContentContainer>
  );
}
