import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { useInterval } from 'react-use';

type StopwatchProps = {
  from: string;
};

export default function Stopwatch({ from }: StopwatchProps) {
  const fromDate = new Date(from);
  const formatDuration = (_fromDate: Date) => `${formatDistanceToNowStrict(_fromDate, { unit: 'minute' })}`;
  const [duration, setDuration] = React.useState(formatDuration(fromDate));

  useInterval(() => {
    setDuration(formatDuration(fromDate));
  }, 1000);

  return <span>{duration}</span>;
}
