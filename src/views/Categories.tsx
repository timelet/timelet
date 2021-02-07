import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';

export default function Categories() {
  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.categories" defaultMessage="Categories" />
      </Typography>
      <ContentElement>Categories</ContentElement>
    </ContentContainer>
  );
}
