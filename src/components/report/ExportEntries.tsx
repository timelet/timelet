import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { format } from 'date-fns';
import saveFile from 'save-as-file';
import { EntryDocumentType } from '../../domain/collections/entryCollection';

type ExportEntriesProps = {
  entries: EntryDocumentType[];
};

export default function ExportEntries({ entries }: ExportEntriesProps) {
  const intl = useIntl();

  const handleCSVExport = () => {
    const dump = entries
      .map(
        (e) =>
          `${e.category},${e.tag || ''},${e.description || ''},${new Date(e.startedAt).toISOString()},${
            e.endedAt ? new Date(e.endedAt).toISOString() : ''
          },${e.endedAt ? e.endedAt - e.startedAt : ''}`
      )
      .join('\n');
    const filename = `${intl.formatMessage({ id: 'app.title', defaultMessage: 'Timelet' })}-${format(
      new Date(),
      'yyyy-MM-dd_HH-mm'
    )}.csv`.toLowerCase();
    const type = 'text/plain;charset=utf-8';
    const file = new Blob([dump], { type });
    saveFile(file, filename);
  };

  return (
    <Button color="primary" onClick={handleCSVExport}>
      <FormattedMessage id="label.exportAsCSV" defaultMessage="Export as CSV" />
    </Button>
  );
}
