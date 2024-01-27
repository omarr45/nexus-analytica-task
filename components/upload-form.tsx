'use client';

import { Card, CardContent } from './ui/card';
import React, { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { parseData } from '@/lib/utils';
import { useDataStore } from '@/stores/data-store';
import { useForm } from 'react-hook-form';

const UploadForm = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const setParsedData = useDataStore((state) => state.setParsedData);
  const setNumericProps = useDataStore((state) => state.setNumericProps);
  const setNonNumericProps = useDataStore((state) => state.setNonNumericProps);
  const toggleSelectedNumericProp = useDataStore(
    (state) => state.toggleSelectedNumericProp,
  );
  const setSelectedNonNumericProp = useDataStore(
    (state) => state.setSelectedNonNumericProp,
  );

  const onSubmit = (data: any) => {
    // Check if file is csv
    if (!data.csvFile[0].name.endsWith('.csv')) {
      setError('Only .csv files accepted');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', data.csvFile[0]);

    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const { parsedData, numericProps, nonNumericProps } = parseData(
          res.data,
        );
        setParsedData(parsedData);
        setNumericProps(numericProps);
        setNonNumericProps(nonNumericProps);
        // Set all numeric props to selected
        numericProps.forEach((prop) => toggleSelectedNumericProp(prop));
        // Set the 1st non-numeric prop to selected
        setSelectedNonNumericProp(nonNumericProps[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <div className='flex min-h-5 items-center justify-between gap-2'>
            <Label htmlFor='csvFile' className=''>
              Please upload a <code className='rounded bg-muted p-1'>.csv</code>{' '}
              file
            </Label>
            <p className='text-sm font-medium text-red-500'>{error}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Input
              {...register('csvFile', { required: true })}
              type='file'
              id='csvFile'
              name='csvFile'
            />
            <Button type='submit'>Upload</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
