import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseData = (data: any) => {
  const parsedData = data.map((item: any) => {
    const newItem = { ...item };
    Object.keys(newItem).forEach((key) => {
      const value = newItem[key];
      if (!isNaN(value)) {
        newItem[key] = Number(value);
      }
    });
    return newItem;
  });

  const numericProps = Object.keys(parsedData[0]).filter(
    (key) => !isNaN(parsedData[0][key]),
  );

  const nonNumericProps = Object.keys(parsedData[0]).filter((key) =>
    isNaN(parsedData[0][key]),
  );

  return { parsedData, numericProps, nonNumericProps };
};

export const getRandomRgbColor = () => {
  // In this format: 255, 99, 132
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const rgb = `rgb(${r},${g},${b})`;
  const rgba = `rgba(${r},${g},${b},0.4)`;
  return [rgb, rgba];
};
