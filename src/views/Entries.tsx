import styled from '@emotion/styled';
import { Container, Paper, withTheme } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../collections/entryCollection';
import EntryDisplay from '../components/entries/EntryDisplay';
import EntryInlineForm from '../components/entries/EntryInlineForm';
import { useDatabase } from '../contexts/DatabaseContext';
import { EntryDisplayViewModel } from '../models/entryDisplayViewModel';

const EntryContainer = withTheme(
  styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `
);

const EntryFormContainer = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  `
);

const EntryDisplayContainer = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
    flex-grow: 1;
  `
);

export default function Entries() {
  const intl = useIntl();
  const database = useDatabase();
  const [entries, setEntries] = React.useState<EntryDisplayViewModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const createEntry = (entry: EntryDocumentType) => {
    database?.entries.insert(entry);
  };

  const updateEntry = async (entry: EntryDocumentType) => {
    const query = database?.entries.findOne({ selector: { entryId: entry.entryId } });
    await query?.update({ $set: entry });
  };

  const stopEntry = async (entryId: string) => {
    const query = database?.entries.findOne({ selector: { entryId } });
    await query?.update({ $set: { endedAt: new Date().toISOString() } });
  };

  React.useEffect(() => {
    if (database) {
      database.entries.find().$.subscribe((docs) => {
        setEntries(
          docs.map((doc, i) => ({
            id: i,
            entryId: doc.entryId,
            description: doc.description,
            startedAt: `${intl.formatDate(doc.startedAt)} ${intl.formatTime(doc.startedAt)}`,
            endedAt: doc.endedAt ? `${intl.formatDate(doc.endedAt)} ${intl.formatTime(doc.endedAt)}` : undefined
          }))
        );
        setLoading(false);
      });
    }
  }, [database]);

  return (
    <EntryContainer>
      <EntryFormContainer>
        <EntryInlineForm create={createEntry} />
      </EntryFormContainer>
      <EntryDisplayContainer>
        <EntryDisplay entries={entries} loading={loading} stop={stopEntry} update={updateEntry} />
      </EntryDisplayContainer>
    </EntryContainer>
  );
}
