import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { useInterval } from 'react-use';
import Duration from './Duration';

type StopwatchProps = {
  from: string;
};

export default function Stopwatch({ from }: StopwatchProps) {
  const fromDateTime = new Date(from);
  const formatDuration = (_fromDateTime: Date) => differenceInSeconds(new Date(), _fromDateTime);
  const [duration, setDuration] = React.useState(formatDuration(fromDateTime));

  useInterval(() => {
    setDuration(formatDuration(fromDateTime));
  }, 1000);

  return <Duration seconds={duration} />;
}
