import styled from '@emotion/styled';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { CategoryDocumentType } from '../../domain/collections/categoryCollection';

const CustomDialogContent = withTheme(
  styled(DialogContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type CategoryFormProps = {
  category: CategoryDocumentType;
  update: (category: CategoryDocumentType) => void;
};

export default function CategoryForm({ category, update }: CategoryFormProps) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const { reset, register, handleSubmit } = useForm<CategoryDocumentType>({ defaultValues: category });
  const toggleDialog = () => setOpen(!open);

  React.useEffect(() => {
    reset(category);
  }, [category]);

  const onSubmit = (data: CategoryDocumentType) => {
    const updatedCategory: CategoryDocumentType = {
      categoryId: category.categoryId,
      name: data.name,
      description: data.description
    };
    update(updatedCategory);
    toggleDialog();
  };

  return (
    <>
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <FormattedMessage id="heading.editCategory" defaultMessage="Edit category" description="Heading of the category edit form dialog" />
          </DialogTitle>
          <CustomDialogContent>
            <TextField
              name="name"
              inputRef={register}
              label={intl.formatMessage({
                id: 'label.name',
                defaultMessage: 'Name'
              })}
              required
            />
            <TextField
              name="description"
              inputRef={register}
              label={intl.formatMessage({
                id: 'label.description',
                defaultMessage: 'Description'
              })}
              multiline
            />
          </CustomDialogContent>
          <DialogActions>
            <Button color="secondary" onClick={toggleDialog}>
              <FormattedMessage id="action.cancel" defaultMessage="Cancel" description="Cancel an action" />
            </Button>
            <Button color="primary" type="submit">
              <FormattedMessage id="action.submit" defaultMessage="Submit" description="Submit a form" />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
