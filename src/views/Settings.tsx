import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentContainer from '../layout/default/ContentContainer';
import ContentElement from '../layout/default/ContentElement';
import ContentTitle from '../layout/default/ContentTitle';

export default function Settings() {
  return (
    <ContentContainer>
      <ContentTitle>
        <FormattedMessage id="title.settings" defaultMessage="Settings" />
      </ContentTitle>
      <ContentElement>asdad</ContentElement>
    </ContentContainer>
  );
}
