import { ColDef, DataGrid, RowsProp } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDatabase } from '../../contexts/DatabaseContext';

export default function EntryDisplay() {
  const database = useDatabase();
  const intl = useIntl();
  const columns: ColDef[] = [
    {
      field: 'entryId',
      headerName: intl.formatMessage({ id: 'label.id', defaultMessage: 'Id', description: 'Label which describes the id column' })
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'label.description', defaultMessage: 'Description' }),
      flex: 0.5
    },
    {
      field: 'startedAt',
      headerName: intl.formatMessage({ id: 'label.startedAt', defaultMessage: 'Started at' }),
      width: 200
    },
    {
      field: 'endedAt',
      headerName: intl.formatMessage({ id: 'label.endedAt', defaultMessage: 'Ended at' }),
      width: 200
    }
  ];
  const [rows, setRows] = React.useState<RowsProp>([]);

  React.useEffect(() => {
    if (database) {
      database.entries.find().$.subscribe((docs) => {
        setRows(
          docs.map((doc, i) => ({
            id: i,
            entryId: doc.entryId,
            description: doc.description,
            startedAt: `${intl.formatDate(doc.startedAt)} ${intl.formatTime(doc.startedAt)}`,
            endedAt: doc.endedAt ?? `${intl.formatDate(doc.endedAt)} ${intl.formatTime(doc.endedAt)}`
          }))
        );
      });
    }
  }, [database]);

  return <DataGrid columns={columns} rows={rows} />;
}
