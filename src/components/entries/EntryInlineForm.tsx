import styled from '@emotion/styled';
import { IconButton, TextField, withTheme } from '@material-ui/core';
import { PlayArrow as PlayIcon } from '@material-ui/icons';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';

const StyledForm = withTheme(
  styled.form`
    display: flex;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type EntryFormProps = {
  create: (entry: EntryDocumentType) => void;
};

export default function EntryInlineForm({ create }: EntryFormProps) {
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState<Date | null>(null);
  const [endedAt, setEndedAt] = React.useState<Date | null>(null);
  const { reset, register, handleSubmit } = useForm<EntryDocumentType>();

  const onSubmit = (data: EntryDocumentType) => {
    const entry: EntryDocumentType = {
      description: data.description,
      startedAt: (data.startedAt ? new Date(data.startedAt) : new Date()).toISOString(),
      endedAt: data.endedAt ? new Date(data.endedAt).toISOString() : undefined
    };
    create(entry);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="description"
        inputRef={register}
        label={intl.formatMessage({
          id: 'label.description',
          defaultMessage: 'Description'
        })}
        multiline
        required
      />
      <KeyboardDateTimePicker
        name="startedAt"
        inputRef={register}
        onChange={(date) => setStartedAt(date)}
        value={startedAt}
        ampm={false}
        format={intl.formatMessage({
          id: 'format.datetime',
          defaultMessage: 'yyyy/MM/dd HH:mm',
          description: 'Format which represents date time'
        })}
        label={intl.formatMessage({
          id: 'label.startedAt',
          defaultMessage: 'Started at'
        })}
      />
      <KeyboardDateTimePicker
        name="endedAt"
        inputRef={register}
        clearable
        onChange={(date) => setEndedAt(date)}
        value={endedAt}
        ampm={false}
        format={intl.formatMessage({
          id: 'format.datetime',
          defaultMessage: 'yyyy/MM/dd HH:mm',
          description: 'Format which represents date time'
        })}
        label={intl.formatMessage({
          id: 'label.endedAt',
          defaultMessage: 'Ended at'
        })}
      />
      <IconButton type="submit">
        <PlayIcon />
      </IconButton>
    </StyledForm>
  );
}
