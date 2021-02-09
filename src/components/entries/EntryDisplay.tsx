import { IconButton } from '@material-ui/core';
import { CellParams, ColDef, DataGrid, SortModel } from '@material-ui/data-grid';
import { Stop as StopIcon } from '@material-ui/icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { CategoryDocumentType } from '../../domain/collections/categoryCollection';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import { EntryDisplayViewModel } from '../../domain/viewModels/entryDisplayViewModel';
import InteractiveDuration from '../InteractiveDuration';
import EntryForm from './EntryForm';

type EntryDisplayProps = {
  entries: EntryDisplayViewModel[];
  categories: CategoryDocumentType[];
  stop?: (entryId: string) => void;
  update: (entry: EntryDocumentType) => void;
  loading?: boolean;
};

const defaultSortModel: SortModel = [
  {
    field: 'startedAt',
    sort: 'desc'
  }
];

export default function EntryDisplay({ entries, categories, loading, update, stop }: EntryDisplayProps) {
  const intl = useIntl();

  const renderStopButton = (params: CellParams) => (
    <IconButton
      disabled={!!params.getValue('endedAt')}
      onClick={() => {
        const entryId = params.getValue('entryId')?.toString();
        if (entryId && stop) {
          stop(entryId);
        }
      }}
    >
      <StopIcon />
    </IconButton>
  );

  const renderEditButton = (params: CellParams) => {
    const currentEntry = entries.find((e) => e.entryId === params.getValue('entryId'));
    if (currentEntry) {
      return <EntryForm entry={currentEntry} update={update} />;
    }
    return null;
  };

  const renderDateTime = (params: CellParams) => (
    <span>
      {params.value
        ? `${intl.formatDate(params.value as string)} ${intl.formatTime(params.value as string)}`
        : intl.formatMessage({ id: 'label.undefined', defaultMessage: 'Undefined', description: 'An undefined value' })}
    </span>
  );

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
      field: 'category',
      headerName: intl.formatMessage({ id: 'label.category', defaultMessage: 'Category' }),
      flex: 0.2,
      renderCell: (params) => <>{categories.find((c) => c.categoryId === params.value?.toString())?.name}</>
    },
    {
      field: 'startedAt',
      headerName: intl.formatMessage({ id: 'label.startedAt', defaultMessage: 'Started at' }),
      width: 180,
      renderCell: renderDateTime
    },
    {
      field: 'endedAt',
      headerName: intl.formatMessage({ id: 'label.endedAt', defaultMessage: 'Ended at' }),
      width: 180,
      renderCell: renderDateTime
    },
    {
      field: 'duration',
      headerName: intl.formatMessage({ id: 'label.duration', defaultMessage: 'Duration' }),
      width: 130,
      renderCell: (params) => (
        <InteractiveDuration from={params.getValue('startedAt')?.toString() || ''} to={params.getValue('endedAt')?.toString()} />
      )
    },
    {
      field: 'actions',
      headerName: intl.formatMessage({ id: 'label.actions', defaultMessage: 'Actions' }),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          {renderStopButton(params)}
          {renderEditButton(params)}
        </>
      )
    }
  ];

  return <DataGrid columns={columns} rows={entries} loading={loading} sortModel={defaultSortModel} />;
}
