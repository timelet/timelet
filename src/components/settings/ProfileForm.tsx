import React from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, withTheme } from '@material-ui/core';
import { FormattedDisplayName, FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { userInterfaceLanguages } from '../../domain/models/languageModel';
import { ProfileDocumentType } from '../../domain/collections/profileCollection';

const StyledForm = withTheme(
  styled.form`
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type ProfileFormProps = {
  profiles: ProfileDocumentType[];
  selectProfile: (profile: ProfileDocumentType) => void;
  currentProfile: ProfileDocumentType;
  saveProfile: (profile: ProfileDocumentType) => void;
};

export default function ProfileForm({ profiles, currentProfile, saveProfile, selectProfile }: ProfileFormProps) {
  const { handleSubmit, control, formState, reset } = useForm<ProfileDocumentType>({ defaultValues: currentProfile });

  const handleProfileSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const profileId = event.target.value as string;
    const newProfile = profiles.find((p) => p.profileId === profileId);
    if (newProfile) {
      selectProfile(newProfile);
    }
  };

  const onSubmit = (data: ProfileDocumentType) => {
    const newProfile = { ...data, profileId: currentProfile?.profileId };
    saveProfile(newProfile);
    reset(newProfile);
  };

  const userInterfaceLanguageSelect = (
    <Select>
      <MenuItem value="">
        <em>
          <FormattedMessage
            id="label.emptyAndDependingOnBrowser"
            defaultMessage="Empty (depending on browser language)"
            description="An entry in a select input, which clears the input."
          />
        </em>
      </MenuItem>
      {userInterfaceLanguages.map((l) => (
        <MenuItem value={l} key={l}>
          <FormattedDisplayName type="language" value={l} />
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <>
      <FormControl fullWidth disabled={formState.isDirty}>
        <InputLabel>
          <FormattedMessage id="label.profile" defaultMessage="Profile" />
        </InputLabel>
        <Select name="profile" value={currentProfile?.profileId || ''} onChange={handleProfileSelect}>
          {profiles.map((p) => (
            <MenuItem value={p.profileId} key={p.profileId}>
              {p.profileId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <InputLabel>
            <FormattedMessage id="label.language" defaultMessage="Language" />
          </InputLabel>
          <Controller control={control} name="userInterfaceLanguage" as={userInterfaceLanguageSelect} />
          <FormHelperText>
            <FormattedMessage id="help.browserLanguageWhenEmpty" defaultMessage="Browser language is used, when left empty" />
          </FormHelperText>
        </FormControl>
        <Button type="submit" color="primary" disabled={!formState.isDirty}>
          <FormattedMessage id="action.submit" defaultMessage="Submit" description="Submit a form" />
        </Button>
      </StyledForm>
    </>
  );
}
