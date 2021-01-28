import { ColDef, DataGrid, RowsProp } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDatabase } from '../../contexts/DatabaseContext';
import Duration from '../Duration';

export default function EntryDisplay() {
  const database = useDatabase();
  const intl = useIntl();
  const columns: ColDef[] = [
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'label.description', defaultMessage: 'Description' }),
      flex: 0.5
    },
    {
      field: 'startedAt',
      headerName: intl.formatMessage({ id: 'label.startedAt', defaultMessage: 'Started at' }),
      width: 180
    },
    {
      field: 'endedAt',
      headerName: intl.formatMessage({ id: 'label.endedAt', defaultMessage: 'Ended at' }),
      width: 180,
      renderCell: (params) => (
        <span>
          {params.value
            ? params.value
            : intl.formatMessage({ id: 'label.undefined', defaultMessage: 'Undefined', description: 'An undefined value' })}
        </span>
      )
    },
    {
      field: 'duration',
      headerName: intl.formatMessage({ id: 'label.duration', defaultMessage: 'Duration' }),
      width: 120,
      renderCell: (params) => <Duration from={params.getValue('startedAt')?.toString() || ''} to={params.getValue('endedAt')?.toString()} />
    }
  ];
  const [rows, setRows] = React.useState<RowsProp>([]);

  React.useEffect(() => {
    if (database) {
      database.entries.find().$.subscribe((docs) => {
        setRows(
          docs.map((doc, i) => ({
            id: i,
            description: doc.description,
            startedAt: `${intl.formatDate(doc.startedAt)} ${intl.formatTime(doc.startedAt)}`,
            endedAt: doc.endedAt ? `${intl.formatDate(doc.endedAt)} ${intl.formatTime(doc.endedAt)}` : undefined
          }))
        );
      });
    }
  }, [database]);

  return <DataGrid columns={columns} rows={rows} />;
}
