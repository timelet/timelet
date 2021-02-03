import styled from '@emotion/styled';
import { Paper, withTheme } from '@material-ui/core';

const ContentElement = withTheme(
  styled(Paper)`
    padding: ${({ theme }) => theme.spacing(2)}px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  `
);

export default ContentElement;
