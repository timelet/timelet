import { ColDef, DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { CategoryDisplayViewModel } from '../../domain/viewModels/categoryDisplayViewModel';

type CategoryDisplayProps = {
  categories: CategoryDisplayViewModel[];
  loading?: boolean;
};

export default function CategoryDisplay({ categories, loading }: CategoryDisplayProps) {
  const intl = useIntl();
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
      flex: 1
    },
    {
      field: 'actions',
      headerName: intl.formatMessage({ id: 'label.actions', defaultMessage: 'Actions' }),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <>No actions</>
    }
  ];

  return <DataGrid columns={columns} rows={categories} loading={loading} />;
}
