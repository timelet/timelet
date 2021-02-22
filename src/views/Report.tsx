import styled from '@emotion/styled';
import { CircularProgress, Typography, withTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PredefinedDateRangePicker from '../components/PredefinedDateRangePicker';
import CategoryTagPieChart from '../components/report/CategoryTagPieChart';
import EntryTable from '../components/report/EntryTable';
import SummaryTable from '../components/report/SummaryTable';
import { useDatabase } from '../contexts/DatabaseContext';
import { EntryDocumentType } from '../domain/collections/entryCollection';
import ContentElement from '../layout/default/ContentElement';
import { createSubscriptionEffect } from '../utils/rxdb';

const ReportContentContainer = withTheme(
  styled(ContentElement)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    & > *:first-of-type {
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

const ReportContentElement = withTheme(
  styled.div`
    margin: ${({ theme }) => theme.spacing(2)}px 0;
  `
);

type RenderElementsProps = {
  entries: EntryDocumentType[];
};

function RenderElements({ entries }: RenderElementsProps) {
  if (entries.length <= 0) {
    return <FormattedMessage id="label.noEntriesFound" defaultMessage="Couldn't find any entries" />;
  }
  return (
    <>
      <ReportContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.overviewOfCategoriesAndTags" defaultMessage="Overview of categories and tags" />
        </Typography>
        <CategoryTagPieChart entries={entries} />
      </ReportContentElement>
      <ReportContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.summary" defaultMessage="Summary" />
        </Typography>
        <SummaryTable entries={entries} />
      </ReportContentElement>
      <ReportContentElement>
        <Typography variant="h3">
          <FormattedMessage id="title.selectedEntries" defaultMessage="Selected entries" />
        </Typography>
        <EntryTable entries={entries} />
      </ReportContentElement>
    </>
  );
}

export default function Report() {
  const database = useDatabase();
  const [dateRange, setDateRange] = useState<{ from: number; to: number }>();
  const [entries, setEntries] = useState<EntryDocumentType[]>([]);
  const [loading, setLoading] = useState(false);
  const getEntries = React.useCallback(
    () =>
      createSubscriptionEffect(() =>
        database?.entries.find({ selector: { startedAt: { $gte: dateRange?.from }, endedAt: { $lte: dateRange?.to } } }).$.subscribe((docs) => {
          setEntries(docs);
          setLoading(false);
        })
      ),
    [database, dateRange]
  );

  useEffect(() => getEntries(), [getEntries]);

  const handlePredefinedDateRangeSelect = (from: number, to: number) => {
    setLoading(true);
    setDateRange({ from, to });
  };

  return (
    <>
      <ReportContentContainer>
        <PredefinedDateRangePicker onSelect={handlePredefinedDateRangeSelect} />
        {loading ? <CircularProgress /> : <RenderElements entries={entries} />}
      </ReportContentContainer>
    </>
  );
}
