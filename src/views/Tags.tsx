import styled from '@emotion/styled';
import React from 'react';
import { RxDocument } from 'rxdb';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import CategoryInlineForm from '../components/categories/CategoryInlineForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import ContentElement from '../layout/default/ContentElement';
import { createAsyncSubscriptionEffect } from '../utils/rxdb';
import { TagViewModel } from '../domain/viewModels/tagViewModel';

const TagDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Tags() {
  const database = useDatabase();
  const [profile, setProfile] = React.useState<RxDocument<ProfileDocumentType>>();
  const [tags, setTags] = React.useState<TagViewModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const createTag = (tag: TagViewModel) => {
    profile?.update({ $push: { tags: tag } });
  };

  const updateTag = (previous: TagViewModel, next: TagViewModel) => {
    profile?.update({ $set: { tags: tags.map((c) => (c.name === previous.name ? next : c)) } });
  };

  const removeTag = (tag: TagViewModel) => {
    profile?.update({ $pullAll: { tags: [tag] } });
  };

  React.useEffect(
    createAsyncSubscriptionEffect(async () => {
      // Wait for local settings
      const settings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
      // Find currently set profile in the database
      return database?.profiles.findOne({ selector: { profileId: settings?.profile } }).$.subscribe((doc) => {
        if (doc) {
          setProfile(doc);
          setTags(doc.tags);
        }
        setLoading(false);
      });
    }),
    [database]
  );

  return (
    <>
      <ContentElement>
        <CategoryInlineForm create={createTag} />
      </ContentElement>
      <TagDisplayContainer>
        <CategoryDisplay categories={tags} update={updateTag} remove={removeTag} loading={loading} />
      </TagDisplayContainer>
    </>
  );
}
