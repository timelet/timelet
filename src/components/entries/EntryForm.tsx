/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import { CategoryViewModel } from '../../domain/viewModels/categoryViewModel';
import { TagViewModel } from '../../domain/viewModels/tagViewModel';

const CustomDialogContent = withTheme(
  styled(DialogContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type EntryFormProps = {
  entry: EntryDocumentType;
  categories: CategoryViewModel[];
  tags: TagViewModel[];
  update: (entry: EntryDocumentType) => void;
};

export default function EntryForm({ entry, categories, tags, update }: EntryFormProps) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState<Date>(new Date(entry.startedAt));
  const [endedAt, setEndedAt] = React.useState<Date | null>(entry.endedAt ? new Date(entry.endedAt) : null);
  const [category, setCategory] = React.useState<CategoryViewModel | undefined>(categories.find((c) => c.name === entry.category));
  const [tag, setTag] = React.useState<TagViewModel | undefined>(tags.find((t) => t.name === entry.tag));
  const { reset, register, handleSubmit } = useForm<EntryDocumentType>({ defaultValues: entry });

  const dateTimeFormat = intl.formatMessage({
    id: 'format.datetime',
    defaultMessage: 'yyyy/MM/dd HH:mm',
    description: 'Format which represents date time'
  });
  const toggleDialog = () => setOpen(!open);

  React.useEffect(() => {
    reset(entry);
    setStartedAt(new Date(entry.startedAt));
    setEndedAt(entry.endedAt ? new Date(entry.endedAt) : null);
  }, [reset, entry]);

  const onSubmit = (data: EntryDocumentType) => {
    const updatedEntry: EntryDocumentType = {
      entryId: entry.entryId,
      category: category?.name || data.category,
      tag: tag?.name || data.tag,
      description: data.description,
      startedAt: startedAt.getTime(),
      endedAt: endedAt?.getTime() ?? undefined
    };
    update(updatedEntry);
    toggleDialog();
  };

  return (
    <>
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <FormattedMessage id="heading.editEntry" defaultMessage="Edit entry" description="Heading of the entry edit form dialog" />
          </DialogTitle>
          <CustomDialogContent>
            <Autocomplete
              autoComplete
              options={[...categories]}
              getOptionLabel={(option) => option.name}
              defaultValue={category}
              onChange={(_, value) => {
                if (value) {
                  setCategory(value);
                }
              }}
              value={category}
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
            <Autocomplete
              autoComplete
              options={[...tags]}
              getOptionLabel={(option) => option.name}
              defaultValue={tag}
              onChange={(_, value) => {
                if (value) {
                  setTag(value);
                }
              }}
              value={tag}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="tag"
                  inputRef={register}
                  label={intl.formatMessage({
                    id: 'label.tag',
                    defaultMessage: 'Tag'
                  })}
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
            />
            <KeyboardDateTimePicker
              name="startedAt"
              onChange={(date) => (date ? setStartedAt(date) : null)}
              value={startedAt}
              ampm={false}
              format={dateTimeFormat}
              label={intl.formatMessage({
                id: 'label.startedAt',
                defaultMessage: 'Started at'
              })}
              required
            />
            <KeyboardDateTimePicker
              name="endedAt"
              clearable
              onChange={(date) => setEndedAt(date)}
              value={endedAt}
              ampm={false}
              format={dateTimeFormat}
              label={intl.formatMessage({
                id: 'label.endedAt',
                defaultMessage: 'Ended at'
              })}
            />
          </CustomDialogContent>
          <DialogActions>
            <Button color="secondary" onClick={toggleDialog}>
              <FormattedMessage id="action.cancel" defaultMessage="Cancel" />
            </Button>
            <Button color="primary" type="submit">
              <FormattedMessage id="action.submit" defaultMessage="Submit" />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
