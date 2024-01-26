'use client';

import { Card, CardContent } from './ui/card';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import React from 'react';

type ChartCardProps = {
  data: any[];
  className?: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const getRandomRgbColor = () => {
  // In this format: 255, 99, 132
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const rgb = `rgb(${r},${g},${b})`;
  const rgba = `rgba(${r},${g},${b},0.4)`;
  return [rgb, rgba];
};

const ChartCard: React.FC<ChartCardProps> = ({ data, className }) => {
  if (!data.length)
    return (
      <Card className={className}>
        <CardContent className='grid place-items-center p-20'>
          <p>No data</p>
        </CardContent>
      </Card>
    );

  const parsedData = data.map((item) => {
    const newItem = { ...item };
    Object.keys(newItem).forEach((key) => {
      const value = newItem[key];
      if (!isNaN(value)) {
        newItem[key] = Number(value);
      }
    });
    return newItem;
  });

  const numericHeaders = Object.keys(parsedData[0]).filter(
    (key) => !isNaN(parsedData[0][key]),
  );

  const nonNumericHeaders = Object.keys(parsedData[0]).filter((key) =>
    isNaN(parsedData[0][key]),
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <Card className={className}>
      <CardContent>
        <Line
          options={options}
          data={{
            labels: parsedData.map((item) => item[nonNumericHeaders[0]]),
            datasets: numericHeaders.map((header) => {
              const [rgb, rgba] = getRandomRgbColor();
              return {
                label: header,
                data: parsedData.map((item) => item[header]),
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
