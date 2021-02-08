import styled from '@emotion/styled';
import { IconButton, TextField, withTheme } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Add as AddIcon } from '@material-ui/icons';
import { CategoryDocumentType } from '../../domain/collections/categoryCollection';

const StyledForm = withTheme(
  styled.form`
    display: flex;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type CategoryInlineFormProps = {
  create: (category: CategoryDocumentType) => void;
};

export default function CategoryInlineForm({ create }: CategoryInlineFormProps) {
  const intl = useIntl();
  const { reset, register, handleSubmit } = useForm<CategoryDocumentType>();

  const onSubmit = (data: CategoryDocumentType) => {
    create(data);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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

      <IconButton type="submit">
        <AddIcon />
      </IconButton>
    </StyledForm>
  );
}
