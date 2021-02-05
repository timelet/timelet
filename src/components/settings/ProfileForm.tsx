import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

type ProfileFormProps = {
  profiles: string[];
  currentProfile: string;
  selectProfile: (profile: string) => void;
};

export default function ProfileForm({ profiles, currentProfile, selectProfile }: ProfileFormProps) {
  const handleProfileSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    selectProfile(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.profile" defaultMessage="Profile" />
        </InputLabel>
        <Select name="profile" defaultValue={currentProfile} onChange={handleProfileSelect}>
          {profiles.map((profile) => (
            <MenuItem value={profile} key={profile}>
              {profile}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <form>
        <FormControl fullWidth>
          <InputLabel>
            <FormattedMessage id="label.language" defaultMessage="Language" />
          </InputLabel>
          <Select name="language" displayEmpty />
        </FormControl>
      </form>
    </>
  );
}
