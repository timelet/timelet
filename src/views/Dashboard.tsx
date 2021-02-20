import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentElement from '../layout/default/ContentElement';
import Entries from './Entries';

const DashboardContentElement = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 40vw;
`;

export default function Dashboard() {
  return (
    <>
      <DashboardContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.recentEntries" defaultMessage="Recent entries" />
        </Typography>
        <Entries />
      </DashboardContentElement>
    </>
  );
}
