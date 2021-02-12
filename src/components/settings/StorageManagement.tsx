import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type StorageManagementProps = {
  exportDump: () => void;
};

export default function StorageManagement({ exportDump }: StorageManagementProps) {
  return (
    <>
      <Button color="primary" onClick={exportDump}>
        <FormattedMessage id="action.exportDump" defaultMessage="Export dump" />
      </Button>
    </>
  );
}
