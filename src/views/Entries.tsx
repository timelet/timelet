import styled from '@emotion/styled';
import { Container, Paper, withTheme } from '@material-ui/core';
import React from 'react';
import EntryForm from '../components/entries/EntryForm';

const EntryFormContainer = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
  `
);

export default function Entries() {
  return (
    <Container>
      <EntryFormContainer>
        <EntryForm />
      </EntryFormContainer>
    </Container>
  );
}
