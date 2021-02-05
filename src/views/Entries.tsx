import styled from '@emotion/styled';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { EntryDocumentType } from '../domain/collections/entryCollection';
import EntryDisplay from '../components/entries/EntryDisplay';
import EntryInlineForm from '../components/entries/EntryInlineForm';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import ContentTitle from '../layout/default/ContentTitle';
import { EntryDisplayViewModel } from '../domain/viewModels/entryDisplayViewModel';

const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
`;

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
    <ContentContainer>
      <ContentTitle>
        <FormattedMessage id="title.entries" defaultMessage="Entries" />
      </ContentTitle>
      <ContentElement>
        <EntryInlineForm create={createEntry} />
      </ContentElement>
      <EntryDisplayContainer>
        <EntryDisplay entries={entries} loading={loading} stop={stopEntry} update={updateEntry} />
      </EntryDisplayContainer>
    </ContentContainer>
  );
}
