import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmDialog from '../ConfirmDialog';

type StorageManagementProps = {
  exportDump: () => void;
  importDump: (fileContent: string) => void;
  deleteAllLocalData: () => void;
};

export default function StorageManagement({ exportDump, importDump, deleteAllLocalData }: StorageManagementProps) {
  const intl = useIntl();

  const handleImportDump = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      e.target.files[0].text().then((value) => importDump(value));
    }
  };

  return (
    <>
      <Button color="primary" onClick={exportDump}>
        <FormattedMessage id="action.exportDump" defaultMessage="Export dump" />
      </Button>
      <Button color="primary" component="label">
        <FormattedMessage id="action.importDump" defaultMessage="Import dump" />
        <input type="file" hidden onChange={handleImportDump} accept=".json" />
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
