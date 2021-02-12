/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { IconButton, TextField, withTheme } from '@material-ui/core';
import { PlayArrow as PlayIcon } from '@material-ui/icons';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import { CategoryViewModel } from '../../domain/viewModels/categoryViewModel';

const StyledForm = withTheme(
  styled.form`
    display: grid;
    grid-template-areas:
      'category description submit'
      'startedAt endedAt submit';
    grid-template-columns: 1fr 1fr 60px;

    & > *:last-child {
      grid-area: submit;
      display: flex;
      align-items: center;
    }

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type EntryFormProps = {
  categories: CategoryViewModel[];
  create: (entry: EntryDocumentType) => void;
};

export default function EntryInlineForm({ categories, create }: EntryFormProps) {
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState<Date | null>(null);
  const [endedAt, setEndedAt] = React.useState<Date | null>(null);
  const [formId, setFormId] = React.useState(0);
  const { register, handleSubmit } = useForm<EntryDocumentType>();

  const onSubmit = (data: EntryDocumentType) => {
    const entry: EntryDocumentType = {
      category: data.category,
      description: data.description,
      startedAt: startedAt?.toISOString() ?? new Date().toISOString(),
      endedAt: endedAt?.toISOString() ?? undefined
    };
    create(entry);
    setFormId(formId + 1);
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} key={formId}>
      <Autocomplete
        autoComplete
        options={[...categories]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            name="category"
            inputRef={register}
            label={intl.formatMessage({
              id: 'label.category',
              defaultMessage: 'Category'
            })}
            required
          />
        )}
      />

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
      <div>
        <IconButton type="submit">
          <PlayIcon />
        </IconButton>
      </div>
    </StyledForm>
  );
}
