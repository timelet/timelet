import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import CategoryInlineForm from '../components/categories/CategoryInlineForm';
import { CategoryDocumentType } from '../domain/collections/categoryCollection';
import { useDatabase } from '../domain/contexts/DatabaseContext';
import { CategoryDisplayViewModel } from '../domain/viewModels/categoryDisplayViewModel';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import { createSubscriptionEffect } from '../utils/rxdb';

const CategoryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Categories() {
  const database = useDatabase();
  const [categories, setCategories] = React.useState<CategoryDisplayViewModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const createCategory = (category: CategoryDocumentType) => {
    database?.categories.insert(category);
  };

  const updateCategory = async (category: CategoryDocumentType) => {
    const query = database?.categories.findOne({ selector: { categoryId: category.categoryId } });
    await query?.update({ $set: category });
  };

  React.useEffect(
    createSubscriptionEffect(() =>
      database?.categories.find().$.subscribe((docs) => {
        setCategories(docs.map((doc, i) => ({ ...doc.toJSON(), id: i })));
        setLoading(false);
      })
    ),
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
        <CategoryDisplay categories={categories} update={updateCategory} loading={loading} />
      </CategoryDisplayContainer>
    </ContentContainer>
  );
}
