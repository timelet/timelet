import styled from '@emotion/styled';
import { Container, withTheme } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-use';
import ContentContainer from './ContentContainer';
import Header from './Header';

const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;

const NativeMain = withTheme(
  styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: ${({ theme }) => theme.spacing(4)}px 0;
  `
);

type DefaultLayoutProps = React.PropsWithChildren<{}>;

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  let titleKey = location.pathname || '/';
  titleKey = titleKey.substring(1).replaceAll('/', '.') || 'dashboard';

  const intl = useIntl();
  const title = intl.formatMessage({ id: `title.${titleKey}` });

  return (
    <LayoutContainer maxWidth={false}>
      <header>
        <Header />
      </header>
      <NativeMain>
        <ContentContainer title={title}>{children}</ContentContainer>
      </NativeMain>
      <footer />
    </LayoutContainer>
  );
}
