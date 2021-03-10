import React from 'react';
import styled from '@emotion/styled';
import { EChartsOption, PieSeriesOption } from 'echarts';
import { useIntl } from 'react-intl';
import { EntryDocumentType } from '../../domain/collections/entryCollection';
import EChartsIntegration from '../EChartsIntegration';

const CategoryTagPieChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
`;

type CategoryTagPieChartProps = {
  entries: EntryDocumentType[];
};

export default function CategoryTagPieChart({ entries }: CategoryTagPieChartProps) {
  const intl = useIntl();
  const categoryDurationSeries = [
    ...entries
      .reduce((map, curr) => {
        if (curr.endedAt) {
          const name = curr.category;
          const value = curr.endedAt - curr.startedAt;
          const prev = map.get(name);

          if (prev) {
            prev.value += value;
          } else {
            map.set(name, { name, value });
          }
        }

        return map;
      }, new Map<string, { name: string; value: number }>())
      .values()
  ];

  const tagDurationSeries = [
    ...entries
      .reduce((map, curr) => {
        if (curr.endedAt) {
          const name = curr.tag || intl.formatMessage({ id: 'label.noSelection', defaultMessage: 'No selection' });
          const value = curr.endedAt - curr.startedAt;
          const prev = map.get(name);

          if (prev) {
            prev.value += value;
          } else {
            map.set(name, { name, value });
          }
        }

        return map;
      }, new Map<string, { name: string; value: number }>())
      .values()
  ];

  const commonSeriesOptions: PieSeriesOption = {
    type: 'pie',
    radius: '50%',
    label: {
      formatter: ({ name, value, percent }) => {
        let duration = intl.formatMessage({ id: 'label.undefined', defaultMessage: 'Undefined', description: 'An undefined value' });
        if (typeof value === 'number') {
          duration = intl.formatMessage(
            { id: 'format.duration', defaultMessage: '{minutes}min {seconds}s' },
            { minutes: Math.floor(value / 1000 / 60), seconds: Math.floor((value / 1000) % 60) }
          );
        }
        return `${name}\n${duration}\n${percent ?? 0}%`;
      }
    }
  };

  const options: EChartsOption = {
    series: [
      {
        ...commonSeriesOptions,
        name: 'Category',
        center: ['25%', '50%'],
        data: categoryDurationSeries
      },
      {
        ...commonSeriesOptions,
        name: 'Tag',
        center: ['75%', '50%'],
        data: tagDurationSeries
      }
    ]
  };

  return (
    <CategoryTagPieChartContainer>
      <EChartsIntegration option={options} />
    </CategoryTagPieChartContainer>
  );
}
