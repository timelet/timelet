import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Entries from './Entries';

export default function Dashboard() {
  return (
    <>
      <Typography variant="h2">
        <FormattedMessage id="title.dashboard" defaultMessage="Dashboard" />
      </Typography>
      <Entries />
    </>
  );
}
