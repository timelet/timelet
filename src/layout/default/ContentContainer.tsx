import styled from '@emotion/styled';
import { Container, Typography, withTheme } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';

const StyledContentContainer = withTheme(
  styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `
);

type ContentContainerProps = PropsWithChildren<{
  title: string;
}>;

export default function ContentContainer({ children, title }: ContentContainerProps) {
  return (
    <StyledContentContainer>
      <Typography variant="h2">{title}</Typography>
      {children}
    </StyledContentContainer>
  );
}
