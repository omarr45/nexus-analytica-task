'use client';

import React, { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type UploadFormProps = {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
};

const UploadForm: React.FC<UploadFormProps> = ({ setData }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('csvFile', data.csvFile[0]);

    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
        <Label htmlFor='csvFile' className=''>
          Please upload a <code className='rounded bg-muted p-1'>.csv</code>{' '}
          file
        </Label>
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
    </section>
  );
};

export default UploadForm;
