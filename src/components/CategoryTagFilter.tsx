import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, withTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { EntryDocumentType } from '../domain/collections/entryCollection';

const CategoryTagFilterContainer = withTheme(
  styled.div`
    display: flex;

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }
  `
);

type Fields = 'categories' | 'tags';

type CategoryTagFilterProps = {
  entries: EntryDocumentType[];
  onSelect: (entries: EntryDocumentType[]) => void;
};

export default function CategoryTagFilter({ entries, onSelect }: CategoryTagFilterProps) {
  const [filter, setFilter] = React.useState<Record<Fields, string[]>>({ categories: [], tags: [] });

  const handleOnSelect = (currentFilter: Record<Fields, string[]>) => {
    let filteredEntries = entries;
    if (currentFilter.categories.length > 0) {
      filteredEntries = filteredEntries.filter((e) => currentFilter.categories.indexOf(e.category) !== -1);
    }
    if (currentFilter.tags.length > 0) {
      filteredEntries = filteredEntries.filter((e) => (e.tag ? currentFilter.tags.indexOf(e.tag) !== -1 : false));
    }
    onSelect(filteredEntries);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { name } = event.target as HTMLSelectElement;
    const values = event.target.value as string[];
    const newFilter = { ...filter, [name]: values };
    setFilter(newFilter);
    handleOnSelect(newFilter);
  };

  return (
    <CategoryTagFilterContainer>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.filterByCategories" defaultMessage="Filter by categories" />
        </InputLabel>
        <Select multiple value={filter.categories} name="categories" onChange={handleChange}>
          {[...new Set(entries.map((e) => e.category))].map((category) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.filterByTags" defaultMessage="Filter by tags" />
        </InputLabel>
        <Select multiple value={filter.tags} name="tags" onChange={handleChange}>
          {[...new Set(entries.map((e) => e.tag))].map((tag) => (
            <MenuItem value={tag} key={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CategoryTagFilterContainer>
  );
}
