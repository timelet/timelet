import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RxDocument } from 'rxdb';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import CategoryInlineForm from '../components/categories/CategoryInlineForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import { CategoryViewModel } from '../domain/viewModels/categoryViewModel';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import { createAsyncSubscriptionEffect } from '../utils/rxdb';

const CategoryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Categories() {
  const database = useDatabase();
  const [profile, setProfile] = React.useState<RxDocument<ProfileDocumentType>>();
  const [categories, setCategories] = React.useState<CategoryViewModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const createCategory = (category: CategoryViewModel) => {
    profile?.update({ $push: { categories: category } });
  };

  const updateCategory = (previous: CategoryViewModel, next: CategoryViewModel) => {
    profile?.update({ $set: { categories: categories.map((c) => (c.name === previous.name ? next : c)) } });
  };

  const removeCategory = (category: CategoryViewModel) => {
    profile?.update({ $pullAll: { categories: [category] } });
  };

  React.useEffect(
    createAsyncSubscriptionEffect(async () => {
      // Wait for local settings
      const settings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
      // Find currently set profile in the database
      return database?.profiles.findOne({ selector: { profileId: settings?.profile } }).$.subscribe((doc) => {
        if (doc) {
          setProfile(doc);
          setCategories(doc.categories);
        }
        setLoading(false);
      });
    }),
    [database]
  );

  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.categories" defaultMessage="Categories" />
      </Typography>
      <ContentElement>
        <CategoryInlineForm create={createCategory} />
      </ContentElement>
      <CategoryDisplayContainer>
        <CategoryDisplay categories={categories} update={updateCategory} remove={removeCategory} loading={loading} />
      </CategoryDisplayContainer>
    </ContentContainer>
  );
}
