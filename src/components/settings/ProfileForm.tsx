import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FormattedDisplayName, FormattedMessage } from 'react-intl';
import { userInterfaceLanguages } from '../../domain/models/languageModel';

type ProfileFormProps = {
  profiles: string[];
  currentProfile: string;
  selectProfile: (profile: string) => void;
};

export default function ProfileForm({ profiles, currentProfile, selectProfile }: ProfileFormProps) {
  const [profile, setProfile] = React.useState(currentProfile);

  const handleProfileSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newProfile = event.target.value as string;
    setProfile(newProfile);
    selectProfile(newProfile);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.profile" defaultMessage="Profile" />
        </InputLabel>
        <Select name="profile" value={profile} onChange={handleProfileSelect}>
          {profiles.map((p) => (
            <MenuItem value={p} key={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <form>
        <FormControl fullWidth>
          <InputLabel>
            <FormattedMessage id="label.language" defaultMessage="Language" />
          </InputLabel>
          <Select name="language">
            {userInterfaceLanguages.map((l) => (
              <MenuItem value={l} key={l}>
                <FormattedDisplayName type="language" value={l} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </>
  );
}
