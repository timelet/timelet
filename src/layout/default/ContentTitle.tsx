import styled from '@emotion/styled';
import { Typography, withTheme } from '@material-ui/core';
import React from 'react';

const Title = withTheme(
  styled(Typography)`
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  `
);

type ContentTitleProps = React.PropsWithChildren<{}>;

export default function ContentTitle({ children }: ContentTitleProps) {
  return <Title variant="h2">{children}</Title>;
}
