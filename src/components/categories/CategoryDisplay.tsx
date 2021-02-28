import { IconButton } from '@material-ui/core';
import { GridColDef, DataGrid, ValueGetterParams } from '@material-ui/data-grid';
import React from 'react';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { CategoryViewModel } from '../../domain/viewModels/categoryViewModel';
import CategoryForm from './CategoryForm';
import ConfirmDialog from '../ConfirmDialog';

type CategoryDisplayProps = {
  categories: CategoryViewModel[];
  update: (previous: CategoryViewModel, next: CategoryViewModel) => void;
  remove: (category: CategoryViewModel) => void;
  loading?: boolean;
};

export default function CategoryDisplay({ categories, update, remove, loading }: CategoryDisplayProps) {
  const intl = useIntl();

  const renderEditButton = (params: ValueGetterParams) => {
    const currentCategory = categories.find((c) => c.name === params.getValue('name'));
    return currentCategory ? <CategoryForm category={currentCategory} update={update} /> : null;
  };

  const renderRemoveButton = (params: ValueGetterParams) => {
    const currentCategory = categories.find((c) => c.name === params.getValue('name'));
    return currentCategory ? (
      <ConfirmDialog
        title={intl.formatMessage({ id: 'label.confirmation', defaultMessage: 'Confirmation' })}
        description={intl.formatMessage({ id: 'dialog.confirmRemove', defaultMessage: 'Confirm the removal of the selected entry.' })}
        onConfirm={() => remove(currentCategory)}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ConfirmDialog>
    ) : null;
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: intl.formatMessage({ id: 'label.name', defaultMessage: 'Name' }),
      flex: 0.25
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'label.description', defaultMessage: 'Description' }),
      flex: 0.75
    },
    {
      field: 'actions',
      headerName: intl.formatMessage({ id: 'label.actions', defaultMessage: 'Actions' }),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          {renderEditButton(params)}
          {renderRemoveButton(params)}
        </>
      )
    }
  ];
  const rows = categories.map((c, id) => ({ ...c, id }));

  return <DataGrid columns={columns} rows={rows} loading={loading} />;
}
