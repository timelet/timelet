import styled from '@emotion/styled';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import { EntryDocumentType } from '../domain/collections/entryCollection';
import EntryDisplay from '../components/entries/EntryDisplay';
import EntryInlineForm from '../components/entries/EntryInlineForm';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import { EntryDisplayViewModel } from '../domain/viewModels/entryDisplayViewModel';
import { createSubscriptionEffect } from '../utils/rxdb';
import { CategoryDisplayViewModel } from '../domain/viewModels/categoryDisplayViewModel';

const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Entries() {
  const database = useDatabase();
  const [categories, setCategories] = React.useState<CategoryDisplayViewModel[]>([]);
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

  React.useEffect(
    createSubscriptionEffect(() =>
      database?.entries.find().$.subscribe((docs) => {
        setEntries(docs.map((doc, i) => ({ ...doc.toJSON(), id: i })));
        setLoading(false);
      })
    ),
    [database]
  );

  React.useEffect(
    createSubscriptionEffect(() =>
      database?.categories.find().$.subscribe((docs) => {
        setCategories(docs.map((doc, i) => ({ ...doc.toJSON(), id: i })));
      })
    ),
    [database]
  );

  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.entries" defaultMessage="Entries" />
      </Typography>
      <ContentElement>
        <EntryInlineForm categories={categories} create={createEntry} />
      </ContentElement>
      <EntryDisplayContainer>
        <EntryDisplay entries={entries} categories={categories} loading={loading} stop={stopEntry} update={updateEntry} />
      </EntryDisplayContainer>
    </ContentContainer>
  );
}
