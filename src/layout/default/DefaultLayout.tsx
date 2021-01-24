import styled from '@emotion/styled';
import { Container } from '@material-ui/core';
import React from 'react';
import Header from './Header';

const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;

const NativeMain = styled.main`
  flex-grow: 1;
`;

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
