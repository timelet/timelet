import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import Duration from '../Duration';

type SummaryTableProps = {
  entries: EntryDocumentType[];
};

export default function SummaryTable({ entries }: SummaryTableProps) {
  const totalDuration = entries.reduce<number>((prev, curr) => {
    if (curr.endedAt) {
      return prev + curr.endedAt - curr.startedAt;
    }
    return prev;
  }, 0);

  return (
    <Table>
      <TableHead>
        <TableCell>
          <FormattedMessage id="label.key" defaultMessage="Key" />
        </TableCell>
        <TableCell>
          <FormattedMessage id="label.value" defaultMessage="Value" />
        </TableCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <FormattedMessage id="label.totalTimeSpent" defaultMessage="Total time spent" />
          </TableCell>
          <TableCell>
            <Duration seconds={Math.floor(totalDuration / 1000)} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <FormattedMessage id="label.amountOfEntries" defaultMessage="Amount of entries" />
          </TableCell>
          <TableCell>{entries.length}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
