import styled from '@emotion/styled';
import { Button, TextField, withTheme } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

const StyledForm = withTheme(
  styled.form`
    display: flex;
    flex-direction: column;

    & > *:not(div:first-of-type) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type FormModel = {
  origin: string;
  database: string;
  username: string;
  password: string;
};

type ReplicationFormProps = {
  url?: string;
  saveUrl: (url: string) => void;
};

export default function ReplicationForm({ url, saveUrl }: ReplicationFormProps) {
  const intl = useIntl();
  const getDefaultValuesFromURL = (inputUrl: string): FormModel => {
    const { origin, username, password, pathname } = new URL(inputUrl);
    return {
      origin,
      username,
      password,
      database: pathname.replaceAll('/', '')
    };
  };
  const defaultValues: FormModel = url
    ? getDefaultValuesFromURL(url)
    : {
        origin: '',
        database: '',
        username: '',
        password: ''
      };
  const { handleSubmit, formState, register } = useForm<FormModel>({ defaultValues });

  const onSubmit = (data: FormModel) => {
    const newUrl = new URL(data.origin);
    newUrl.username = data.username;
    newUrl.password = data.password;
    newUrl.pathname = `/${data.database}`;

    saveUrl(newUrl.toString());
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="replication-form-origin"
        name="origin"
        inputRef={register}
        label={intl.formatMessage({ id: 'label.hostname', defaultMessage: 'Hostname' })}
        fullWidth
      />
      <TextField
        id="replication-form-database"
        name="database"
        inputRef={register}
        label={intl.formatMessage({ id: 'label.database', defaultMessage: 'Database' })}
        fullWidth
      />
      <TextField
        id="replication-form-username"
        name="username"
        inputRef={register}
        label={intl.formatMessage({ id: 'label.username', defaultMessage: 'Username' })}
        fullWidth
      />
      <TextField
        id="replication-form-password"
        name="password"
        type="password"
        inputRef={register}
        label={intl.formatMessage({ id: 'label.password', defaultMessage: 'Password' })}
        fullWidth
      />

      <Button type="submit" color="primary" disabled={formState.isDirty}>
        <FormattedMessage id="action.submit" defaultMessage="Submit" />
      </Button>
    </StyledForm>
  );
}
