'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import React, { useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import { getRandomRgbColor } from '@/lib/utils';
import { useDataStore } from '@/stores/data-store';

const ChartCard = () => {
  useEffect(() => {
    import('chartjs-plugin-zoom').then((zoomPlugin) => {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend,
        // @ts-expect-error
        zoomPlugin,
      );
    });
  }, []);

  const parsedData = useDataStore((state) => state.parsedData);
  const numericProps = useDataStore((state) => state.numericProps);
  const selectedNumericProps = useDataStore(
    (state) => state.selectedNumericProps,
  );
  const selectedNonNumericProp = useDataStore(
    (state) => state.selectedNonNumericProp,
  );

  if (parsedData.length < 1)
    return (
      <Card className='col-span-full'>
        <CardContent className='grid place-items-center p-20'>
          <p>No data</p>
        </CardContent>
      </Card>
    );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as const,
        },
      },
    },
  };

  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>
          {selectedNonNumericProp} vs (
          {selectedNumericProps.length > 0 && selectedNumericProps.join(', ')})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Line
          options={options}
          data={{
            labels: parsedData.map((item: any) => item[selectedNonNumericProp]),
            datasets: numericProps
              .filter((prop) =>
                // useDataStore.getState().
                selectedNumericProps.includes(prop),
              )
              .map((header) => {
                const [rgb, rgba] = getRandomRgbColor();
                return {
                  label: header,
                  data: parsedData.map((item: any) => item[header]),
                  backgroundColor: rgb,
                  borderColor: rgba,
                };
              }),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
