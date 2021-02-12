import { differenceInSeconds } from 'date-fns';
import React from 'react';
import Duration from './Duration';
import Stopwatch from './Stopwatch';

type DurationProps = {
  from: string;
  to?: string;
};

export default function InteractiveDuration({ from, to }: DurationProps) {
  const fromDateTime = new Date(from);
  const toDateTime = to ? new Date(to) : undefined;

  if (toDateTime) {
    return <Duration seconds={differenceInSeconds(toDateTime, fromDateTime)} />;
  }

  return (
    <div>
      <Stopwatch from={from} />
    </div>
  );
}
