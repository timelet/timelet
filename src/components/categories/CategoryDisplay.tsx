import { CellParams, ColDef, DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { CategoryDocumentType } from '../../domain/collections/categoryCollection';
import { CategoryDisplayViewModel } from '../../domain/viewModels/categoryDisplayViewModel';
import CategoryForm from './CategoryForm';

type CategoryDisplayProps = {
  categories: CategoryDisplayViewModel[];
  update: (category: CategoryDocumentType) => void;
  loading?: boolean;
};

export default function CategoryDisplay({ categories, update, loading }: CategoryDisplayProps) {
  const intl = useIntl();

  const renderEditButton = (params: CellParams) => {
    const currentEntry = categories.find((e) => e.categoryId === params.getValue('categoryId'));
    if (currentEntry) {
      return <CategoryForm category={currentEntry} update={update} />;
    }
    return null;
  };

  const columns: ColDef[] = [
    {
      field: 'categoryId',
      headerName: intl.formatMessage({ id: 'label.id', defaultMessage: 'Id' }),
      width: 150,
      hide: true
    },
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

  return <DataGrid columns={columns} rows={categories} loading={loading} />;
}
