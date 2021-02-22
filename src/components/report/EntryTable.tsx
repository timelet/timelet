import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import InteractiveDuration from '../InteractiveDuration';

type EntryTableProps = {
  entries: EntryDocumentType[];
};

export default function EntryTable({ entries }: EntryTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <FormattedMessage id="label.category" defaultMessage="Category" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="label.tag" defaultMessage="Tag" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="label.description" defaultMessage="Description" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="label.startedAt" defaultMessage="Started at" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="label.endedAt" defaultMessage="Ended at" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="label.duration" defaultMessage="Duration" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e) => (
          <TableRow>
            <TableCell>{e.category}</TableCell>
            <TableCell>{e.tag}</TableCell>
            <TableCell>{e.description}</TableCell>
            <TableCell>
              <FormattedDate value={e.startedAt} /> <FormattedTime value={e.startedAt} />
            </TableCell>
            <TableCell>
              <FormattedDate value={e.endedAt} /> <FormattedTime value={e.endedAt} />
            </TableCell>
            <TableCell>
              <InteractiveDuration from={e.startedAt} to={e.endedAt} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
