import styled from '@emotion/styled';
import { Container, withTheme } from '@material-ui/core';

const ContentContainer = withTheme(
  styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `
);

export default ContentContainer;
