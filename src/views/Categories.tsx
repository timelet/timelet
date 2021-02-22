import styled from '@emotion/styled';
import React from 'react';
import { RxDocument } from 'rxdb';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import CategoryInlineForm from '../components/categories/CategoryInlineForm';
import { ProfileDocumentType } from '../domain/collections/profileCollection';
import { useDatabase } from '../contexts/DatabaseContext';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import { CategoryViewModel } from '../domain/viewModels/categoryViewModel';
import ContentElement from '../layout/default/ContentElement';
import { createSubscriptionEffect } from '../utils/rxdb';

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

  const getCategories = React.useCallback(
    () =>
      createSubscriptionEffect(async () => {
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

  React.useEffect(() => getCategories(), [getCategories]);

  return (
    <>
      <ContentElement>
        <CategoryInlineForm create={createCategory} />
      </ContentElement>
      <CategoryDisplayContainer>
        <CategoryDisplay categories={categories} update={updateCategory} remove={removeCategory} loading={loading} />
      </CategoryDisplayContainer>
    </>
  );
}
