import styled from '@emotion/styled';
import { Container, Paper, withTheme } from '@material-ui/core';
import React from 'react';
import EntryDisplay from '../components/entries/EntryDisplay';
import EntryForm from '../components/entries/EntryForm';

const EntryContainer = withTheme(
  styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `
);

const EntryFormContainer = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  `
);

const EntryDisplayContainer = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
    flex-grow: 1;
  `
);

export default function Entries() {
  return (
    <EntryContainer>
      <EntryFormContainer>
        <EntryForm />
      </EntryFormContainer>
      <EntryDisplayContainer>
        <EntryDisplay />
      </EntryDisplayContainer>
    </EntryContainer>
  );
}
