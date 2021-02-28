import styled from '@emotion/styled';
import { IconButton } from '@material-ui/core';
import { ValueGetterParams, GridColDef, DataGrid, GridSortModel } from '@material-ui/data-grid';
import { Stop as StopIcon, Delete as DeleteIcon, PlayArrow as PlayIcon, Timer as RecordIcon } from '@material-ui/icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import { CategoryViewModel } from '../../domain/viewModels/categoryViewModel';
import { EntryViewModel } from '../../domain/viewModels/entryViewModel';
import { TagViewModel } from '../../domain/viewModels/tagViewModel';
import ConfirmDialog from '../ConfirmDialog';
import InteractiveDuration from '../InteractiveDuration';
import EntryForm from './EntryForm';

const StyledRecordIcon = styled(RecordIcon)`
  margin-right: 0.2rem;
`;

type EntryDisplayProps = {
  entries: EntryViewModel[];
  categories: CategoryViewModel[];
  tags: TagViewModel[];
  stop: (entryId: string) => void;
  copy: (entryId: string) => void;
  update: (entry: EntryDocumentType) => void;
  remove: (entryId: string) => void;
  loading?: boolean;
};

export default function EntryDisplay({ entries, categories, tags, loading, update, remove, stop, copy }: EntryDisplayProps) {
  const intl = useIntl();

  const renderStopButton = (params: ValueGetterParams) => (
    <IconButton
      onClick={() => {
        const entryId = params.getValue('entryId')?.toString();
        if (entryId) {
          if (params.getValue('endedAt')) {
            copy(entryId);
          } else {
            stop(entryId);
          }
        }
      }}
    >
      {params.getValue('endedAt') ? <PlayIcon /> : <StopIcon />}
    </IconButton>
  );

  const renderEditButton = (params: ValueGetterParams) => {
    const currentEntry = entries.find((e) => e.entryId === params.getValue('entryId'));
    return currentEntry ? <EntryForm entry={currentEntry} categories={categories} tags={tags} update={update} /> : null;
  };

  const renderRemoveButton = (params: ValueGetterParams) => {
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

  const renderDateTime = (params: ValueGetterParams) => (
    <span>
      {params.value
        ? `${intl.formatDate(params.value as string)} ${intl.formatTime(params.value as string)}`
        : intl.formatMessage({ id: 'label.undefined', defaultMessage: 'Undefined', description: 'An undefined value' })}
    </span>
  );

  const columns: GridColDef[] = [
    {
      field: 'entryId',
      headerName: intl.formatMessage({ id: 'label.id', defaultMessage: 'Id' }),
      width: 150,
      hide: true
    },
    {
      field: 'category',
      headerName: intl.formatMessage({ id: 'label.category', defaultMessage: 'Category' }),
      flex: 0.2
    },
    {
      field: 'tag',
      headerName: intl.formatMessage({ id: 'label.tag', defaultMessage: 'Tag' }),
      flex: 0.2
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'label.description', defaultMessage: 'Description' }),
      flex: 0.5
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
      renderCell: renderDateTime,
      hide: true
    },
    {
      field: 'duration',
      headerName: intl.formatMessage({ id: 'label.duration', defaultMessage: 'Duration' }),
      width: 130,
      renderCell: (params: ValueGetterParams) => (
        <>
          {params.getValue('endedAt')?.toString() ? null : <StyledRecordIcon color="primary" fontSize="small" />}
          <InteractiveDuration from={params.getValue('startedAt')?.valueOf() as number} to={params.getValue('endedAt')?.valueOf() as number} />
        </>
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

  return (
    <DataGrid
      columns={columns}
      rows={entries}
      loading={loading}
      sortModel={[
        {
          field: 'startedAt',
          sort: 'desc'
        }
      ]}
      density="compact"
    />
  );
}
