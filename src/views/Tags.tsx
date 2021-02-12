import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';

export default function Tags() {
  return (
    <ContentContainer>
      <Typography variant="h2">
        <FormattedMessage id="title.tags" defaultMessage="Tags" />
      </Typography>
      <ContentElement>Tags</ContentElement>
    </ContentContainer>
  );
}
