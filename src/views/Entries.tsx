import styled from '@emotion/styled';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import { EntryDocumentType } from '../domain/collections/entryCollection';
import EntryDisplay from '../components/entries/EntryDisplay';
import EntryInlineForm from '../components/entries/EntryInlineForm';
import { useDatabase } from '../contexts/DatabaseContext';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import { EntryViewModel } from '../domain/viewModels/entryViewModel';
import { createAsyncSubscriptionEffect, createSubscriptionEffect } from '../utils/rxdb';
import { CategoryViewModel } from '../domain/viewModels/categoryViewModel';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import { TagViewModel } from '../domain/viewModels/tagViewModel';

const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Entries() {
  const database = useDatabase();
  const [categories, setCategories] = React.useState<CategoryViewModel[]>([]);
  const [tags, setTags] = React.useState<TagViewModel[]>([]);
  const [entries, setEntries] = React.useState<EntryViewModel[]>([]);
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

  const copyEntry = async (entryId: string) => {
    const entry = await database?.entries.findOne({ selector: { entryId } }).exec();
    if (entry) {
      await database?.entries.insert({ ...entry.toJSON(), entryId: undefined, startedAt: new Date().toISOString(), endedAt: undefined });
    }
  };

  const removeEntry = async (entryId: string) => {
    const query = database?.entries.findOne({ selector: { entryId } });
    await query?.remove();
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
    createAsyncSubscriptionEffect(async () => {
      // Wait for local settings
      const settings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
      // Find currently set profile in the database
      return database?.profiles.findOne({ selector: { profileId: settings?.profile } }).$.subscribe((doc) => {
        setCategories(doc?.categories || []);
        setTags(doc?.tags || []);
        setLoading(false);
      });
    }),
    [database]
  );

  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.entries" defaultMessage="Entries" />
      </Typography>
      <ContentElement>
        <EntryInlineForm categories={categories} tags={tags} create={createEntry} />
      </ContentElement>
      <EntryDisplayContainer>
        <EntryDisplay
          entries={entries}
          categories={categories}
          tags={tags}
          loading={loading}
          stop={stopEntry}
          update={updateEntry}
          remove={removeEntry}
          copy={copyEntry}
        />
      </EntryDisplayContainer>
    </ContentContainer>
  );
}
