import { formatDistanceStrict } from 'date-fns';
import React from 'react';
import Stopwatch from './Stopwatch';

type DurationProps = {
  from: string;
  to?: string;
};

export default function Duration({ from, to }: DurationProps) {
  const fromDateTime = new Date(from);
  const toDateTime = to ? new Date(to) : undefined;

  if (toDateTime) {
    return <span>{formatDistanceStrict(fromDateTime, toDateTime, { unit: 'minute' })}</span>;
  }

  return (
    <div>
      <Stopwatch from={from} />
    </div>
  );
}
