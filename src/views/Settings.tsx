import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProfileForm from '../components/settings/ProfileForm';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import ContentTitle from '../layout/default/ContentTitle';

export default function Settings() {
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState<string[]>(['default']);
  const [currentProfile, setCurrentProfile] = React.useState<string>('default');

  React.useEffect(() => {
    if (database) {
      database.profiles.find().$.subscribe((docs) => {
        setProfiles(docs.map((profile) => profile.profileId));
      });
      database.getLocal$(SETTINGS_DOCUMENT_ID).subscribe((doc: SettingsDocumentType) => setCurrentProfile(doc.profile));
    }
  }, [database]);

  const selectProfile = (profile: string) => {};

  return (
    <ContentContainer>
      <ContentTitle>
        <FormattedMessage id="title.settings" defaultMessage="Settings" />
      </ContentTitle>
      <ContentElement>
        <ProfileForm profiles={profiles} currentProfile={currentProfile} selectProfile={selectProfile} />
      </ContentElement>
    </ContentContainer>
  );
}
