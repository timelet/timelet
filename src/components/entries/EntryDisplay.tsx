import { ColDef, DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { EntryDisplayViewModel } from '../../models/entryDisplayViewModel';
import Duration from '../Duration';

type EntryDisplayProps = {
  entries: EntryDisplayViewModel[];
  loading?: boolean;
};

export default function EntryDisplay({ entries, loading }: EntryDisplayProps) {
  const intl = useIntl();
  const columns: ColDef[] = [
    {
      field: 'entryId',
      headerName: intl.formatMessage({ id: 'label.id', defaultMessage: 'Id' }),
      width: 150,
      hide: true
    },
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
      width: 130,
      renderCell: (params) => <Duration from={params.getValue('startedAt')?.toString() || ''} to={params.getValue('endedAt')?.toString()} />
    }
  ];

  return <DataGrid columns={columns} rows={entries} loading={loading} />;
}
