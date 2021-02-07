import React from 'react';
import { FormattedMessage } from 'react-intl';

type DurationProps = {
  seconds: number;
};

export default function Duration({ seconds }: DurationProps) {
  return (
    <FormattedMessage
      id="format.duration"
      defaultMessage="{minutes}min {seconds}s"
      values={{ minutes: Math.floor(seconds / 60), seconds: seconds % 60 }}
    />
  );
}
