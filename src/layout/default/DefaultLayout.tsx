import styled from '@emotion/styled';
import { Container, withTheme } from '@material-ui/core';
import React from 'react';
import Header from './Header';

const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;

const NativeMain = withTheme(
  styled.main`
    flex-grow: 1;
    margin: ${({ theme }) => theme.spacing(4)}px 0;
  `
);

type DefaultLayoutProps = React.PropsWithChildren<{}>;

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <LayoutContainer maxWidth={false}>
      <header>
        <Header />
      </header>
      <NativeMain>{children}</NativeMain>
      <footer />
    </LayoutContainer>
  );
}
