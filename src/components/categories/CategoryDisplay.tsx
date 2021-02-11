import { CellParams, ColDef, DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { CategoryViewModel } from '../../domain/viewModels/categoryViewModel';
import CategoryForm from './CategoryForm';

type CategoryDisplayProps = {
  categories: CategoryViewModel[];
  update: (previous: CategoryViewModel, next: CategoryViewModel) => void;
  loading?: boolean;
};

export default function CategoryDisplay({ categories, update, loading }: CategoryDisplayProps) {
  const intl = useIntl();

  const renderEditButton = (params: CellParams) => {
    const currentEntry = categories.find((c) => c.name === params.getValue('name'));
    if (currentEntry) {
      return <CategoryForm category={currentEntry} update={update} />;
    }
    return null;
  };

  const columns: ColDef[] = [
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
      renderCell: (params) => <>{renderEditButton(params)}</>
    }
  ];
  const rows = categories.map((c, id) => ({ ...c, id }));

  return <DataGrid columns={columns} rows={rows} loading={loading} />;
}
