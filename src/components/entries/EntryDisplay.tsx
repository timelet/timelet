import { IconButton } from '@material-ui/core';
import { CellParams, ColDef, DataGrid, SortModel } from '@material-ui/data-grid';
import { Stop as StopIcon, Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import { EntryViewModel } from '../../domain/viewModels/entryViewModel';
import ConfirmDialog from '../ConfirmDialog';
import InteractiveDuration from '../InteractiveDuration';
import EntryForm from './EntryForm';

type EntryDisplayProps = {
  entries: EntryViewModel[];
  stop?: (entryId: string) => void;
  update: (entry: EntryDocumentType) => void;
  remove: (entryId: string) => void;
  loading?: boolean;
};

const defaultSortModel: SortModel = [
  {
    field: 'startedAt',
    sort: 'desc'
  }
];

export default function EntryDisplay({ entries, loading, update, remove, stop }: EntryDisplayProps) {
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
    return currentEntry ? <EntryForm entry={currentEntry} update={update} /> : null;
  };

  const renderRemoveButton = (params: CellParams) => {
    const currentEntryId = params.getValue('entryId')?.toString();
    return currentEntryId ? (
      <ConfirmDialog
        title={intl.formatMessage({ id: 'label.confirmation', defaultMessage: 'Confirmation' })}
        description={intl.formatMessage({ id: 'dialog.confirmRemove', defaultMessage: 'Confirm the removal of the selected entry.' })}
        onConfirm={() => remove(currentEntryId)}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ConfirmDialog>
    ) : null;
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
      flex: 0.2
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
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          {renderStopButton(params)}
          {renderEditButton(params)}
          {renderRemoveButton(params)}
        </>
      )
    }
  ];

  return <DataGrid columns={columns} rows={entries} loading={loading} sortModel={defaultSortModel} />;
}
