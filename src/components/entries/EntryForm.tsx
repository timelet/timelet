import styled from '@emotion/styled';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { EntryDocumentType } from '../../collections/entryCollection';

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
  update: (entry: EntryDocumentType) => void;
};

export default function EntryForm({ entry, update }: EntryFormProps) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState<Date | null>(new Date(entry.startedAt));
  const [endedAt, setEndedAt] = React.useState<Date | null>(entry.endedAt ? new Date(entry.endedAt) : null);
  const { reset, register, handleSubmit } = useForm<EntryDocumentType>({ defaultValues: entry });

  const toggleDialog = () => setOpen(!open);

  React.useEffect(() => {
    reset(entry);
    setStartedAt(new Date(entry.startedAt));
    setEndedAt(entry.endedAt ? new Date(entry.endedAt) : null);
  }, [entry]);

  const onSubmit = (data: EntryDocumentType) => {
    const updatedEntry: EntryDocumentType = {
      entryId: entry.entryId,
      description: data.description,
      startedAt: new Date(data.startedAt).toISOString(),
      endedAt: data.endedAt ? new Date(data.endedAt).toISOString() : undefined
    };
    update(updatedEntry);
    toggleDialog();
  };

  return (
    <>
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <FormattedMessage id="heading.editEntry" defaultMessage="Edit entry" description="Heading of the entry edit form dialog" />
          </DialogTitle>
          <CustomDialogContent>
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
          </CustomDialogContent>
          <DialogActions>
            <Button color="secondary" onClick={toggleDialog}>
              <FormattedMessage id="action.cancel" defaultMessage="Cancel" description="Cancel an action" />
            </Button>
            <Button color="primary" type="submit">
              <FormattedMessage id="action.submit" defaultMessage="Submit" description="Submit a form" />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
