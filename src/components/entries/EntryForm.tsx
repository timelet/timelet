import styled from '@emotion/styled';
import { IconButton, TextField, withTheme } from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../collections/entryCollection';
import { useDatabase } from '../../contexts/DatabaseContext';

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

type Inputs = {
  description: string;
  startedAt: string;
  endedAt?: string;
};

export default function EntryForm() {
  const intl = useIntl();
  const database = useDatabase();
  const [startedAt, setStartedAt] = React.useState<Date | null>(new Date());
  const [endedAt, setEndedAt] = React.useState<Date | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const entry: EntryDocumentType = {
      description: data.description,
      startedAt: new Date(data.startedAt).getTime(),
      endedAt: data.endedAt ? new Date(data.endedAt).getTime() : undefined
    };
    database?.entries.insert(entry);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="description"
        inputRef={register}
        label={intl.formatMessage({
          id: 'label.description',
          defaultMessage: 'Description',
          description: 'Label for a multiline description'
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
          defaultMessage: 'Started at',
          description: 'Label which indicates the starting date and time of an activity'
        })}
        required
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
          defaultMessage: 'Ended at',
          description: 'Label which indicates the ending date and time of an activity'
        })}
      />
      <IconButton type="submit">
        <PlayCircleFilled />
      </IconButton>
    </StyledForm>
  );
}
