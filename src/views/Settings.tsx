import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProfileForm from '../components/settings/ProfileForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import ContentTitle from '../layout/default/ContentTitle';
import { createSubscriptionEffect } from '../utils/rxdb';

export default function Settings() {
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

  return (
    <ContentContainer>
      <ContentTitle>
        <FormattedMessage id="title.settings" defaultMessage="Settings" />
      </ContentTitle>
      <ContentElement>
        {currentProfile ? (
          <ProfileForm profiles={profiles} currentProfile={currentProfile} selectProfile={selectProfile} saveProfile={saveProfile} />
        ) : (
          <CircularProgress />
        )}
      </ContentElement>
    </ContentContainer>
  );
}
