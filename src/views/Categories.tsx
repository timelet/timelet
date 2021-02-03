import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import ContentTitle from '../layout/default/ContentTitle';

export default function Categories() {
  return (
    <ContentContainer>
      <ContentTitle>
        <FormattedMessage id="title.categories" defaultMessage="Categories" />
      </ContentTitle>
      <ContentElement>Categories</ContentElement>
    </ContentContainer>
  );
}
