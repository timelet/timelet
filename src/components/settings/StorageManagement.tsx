import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmDialog from '../ConfirmDialog';

type StorageManagementProps = {
  exportDump: () => void;
  deleteAllLocalData: () => void;
};

export default function StorageManagement({ exportDump, deleteAllLocalData }: StorageManagementProps) {
  const intl = useIntl();

  return (
    <>
      <Button color="primary" onClick={exportDump}>
        <FormattedMessage id="action.exportDump" defaultMessage="Export dump" />
      </Button>
      <ConfirmDialog
        title={intl.formatMessage({ id: 'label.confirmation', defaultMessage: 'Confirmation' })}
        description={intl.formatMessage({
          id: 'dialog.confirmDeleteAllLocalData',
          defaultMessage: 'You are about to delete all local data. Confirm to delete all local data.'
        })}
        onConfirm={deleteAllLocalData}
      >
        <Button color="primary">
          <FormattedMessage id="action.deleteAllLocalData" defaultMessage="Delete all local data" />
        </Button>
      </ConfirmDialog>
    </>
  );
}
