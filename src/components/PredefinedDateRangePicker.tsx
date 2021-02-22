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

type Range = 'from' | 'to';
const predefinedRanges = ['thisWeek', 'lastWeek', 'thisMonth', 'lastMonth'] as const;
type PredefinedRanges = typeof predefinedRanges[number];

type RecentDateTimePickerProps = {
  onSelect: (from: number, to: number) => void;
};

export default function PredefinedDateRangePicker({ onSelect }: RecentDateTimePickerProps) {
  const intl = useIntl();
  const [predefinedDateRange, setPredefinedDateRange] = React.useState<PredefinedRanges>();
  const [range, setRange] = React.useState<Record<Range, Date | null>>({ from: null, to: null });

  const getPredefinedRange = (predefined: PredefinedRanges) => {
    switch (predefined) {
      case 'thisWeek':
        return { from: startOfWeek(new Date()), to: endOfWeek(new Date()) };
      case 'lastWeek':
        return { from: startOfWeek(subDays(new Date(), 7)), to: endOfWeek(subDays(new Date(), 7)) };
      case 'thisMonth':
        return { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
      case 'lastMonth':
        return { from: startOfMonth(subMonths(new Date(), 7)), to: endOfMonth(subMonths(new Date(), 7)) };
      default:
        return { from: null, to: null };
    }
  };

  const handleOnSelect = (selectedRange: Record<Range, Date | null>) => {
    if (selectedRange.from && selectedRange.to) {
      onSelect(selectedRange.from.getTime(), selectedRange.to.getTime());
    }
  };

  const handlePredefinedTimeRange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newPredefinedDateRange = e.target.value as PredefinedRanges;
    const newRange = getPredefinedRange(newPredefinedDateRange);
    setPredefinedDateRange(newPredefinedDateRange);
    setRange(newRange);
    handleOnSelect(newRange);
  };

  const handleRangeChange = (name: Range) => (date: Date | null) => {
    const newRange = { ...range, [name]: date };
    setRange(newRange);
    setPredefinedDateRange(undefined);
    handleOnSelect(newRange);
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
        value={range.from}
        onChange={handleRangeChange('from')}
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
        value={range.to}
        onChange={handleRangeChange('to')}
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
