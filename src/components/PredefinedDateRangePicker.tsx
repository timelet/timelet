import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, withTheme } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays, subMonths } from 'date-fns';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const Container = withTheme(
  styled.div`
    display: flex;

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

const predefinedRanges = ['thisWeek', 'lastWeek', 'thisMonth', 'lastMonth'] as const;
type PredefinedRanges = typeof predefinedRanges[number];

type RecentDateTimePickerProps = {
  onSelect: (from: number, to: number) => void;
};

export default function PredefinedDateRangePicker({ onSelect }: RecentDateTimePickerProps) {
  const intl = useIntl();
  const [predefinedDateRange, setPredefinedDateRange] = React.useState<PredefinedRanges>();
  const [from, setFrom] = React.useState<Date | null>(null);
  const [to, setTo] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (from && to) {
      onSelect(from.getTime(), to.getTime());
    }
  }, [from, to]);

  const updateDateRange = (predefined: PredefinedRanges) => {
    switch (predefined) {
      case 'thisWeek':
        setFrom(startOfWeek(new Date()));
        setTo(endOfWeek(new Date()));
        break;
      case 'lastWeek':
        setFrom(startOfWeek(subDays(new Date(), 7)));
        setTo(endOfWeek(subDays(new Date(), 7)));
        break;
      case 'thisMonth':
        setFrom(startOfMonth(new Date()));
        setTo(endOfMonth(new Date()));
        break;
      case 'lastMonth':
        setFrom(startOfMonth(subMonths(new Date(), 1)));
        setTo(endOfMonth(subMonths(new Date(), 1)));
        break;
      default:
        break;
    }
  };

  const handlePredefinedTimeRange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newPredefinedDateRange = e.target.value as PredefinedRanges;
    setPredefinedDateRange(newPredefinedDateRange);
    updateDateRange(newPredefinedDateRange);
  };

  const handleFrom = (date: Date | null) => {
    setFrom(date);
    setPredefinedDateRange(undefined);
  };

  const handleTo = (date: Date | null) => {
    setTo(date);
    setPredefinedDateRange(undefined);
  };

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.predefinedTimeRanges" defaultMessage="Predefined time ranges" />
        </InputLabel>
        <Select onChange={handlePredefinedTimeRange} value={predefinedDateRange ?? ''}>
          <MenuItem value="">
            <em>
              <FormattedMessage id="label.noSelection" defaultMessage="No selection" />
            </em>
          </MenuItem>
          {predefinedRanges.map((recentTime) => (
            <MenuItem value={recentTime} key={recentTime}>
              <FormattedMessage id={`label.${recentTime}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <KeyboardDatePicker
        name="from"
        value={from}
        onChange={handleFrom}
        format={intl.formatMessage({
          id: 'format.date',
          defaultMessage: 'yyyy/MM/dd',
          description: 'Format which represents date'
        })}
        label={intl.formatMessage({
          id: 'label.from',
          defaultMessage: 'From'
        })}
      />
      <KeyboardDatePicker
        name="to"
        value={to}
        onChange={handleTo}
        format={intl.formatMessage({
          id: 'format.date',
          defaultMessage: 'yyyy/MM/dd',
          description: 'Format which represents date'
        })}
        label={intl.formatMessage({
          id: 'label.to',
          defaultMessage: 'To'
        })}
        showTodayButton
      />
    </Container>
  );
}
