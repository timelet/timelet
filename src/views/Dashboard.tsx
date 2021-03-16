import styled from '@emotion/styled';
import React from 'react';
import ContentElement from '../layout/default/ContentElement';
import Entries from './Entries';

const DashboardContentElement = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 40vw;
`;

export default function Dashboard() {
  return (
    <>
      <DashboardContentElement>
        <Entries />
      </DashboardContentElement>
    </>
  );
}
