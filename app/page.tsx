'use client';

import ChartCard from '@/components/chart-card';
import DataControl from '@/components/data-control';
import UploadForm from '@/components/upload-form';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  return (
    <main className='mx-auto max-w-5xl p-2'>
      <div className='grid grid-cols-2 gap-4'>
        <UploadForm setData={setData} />
        <DataControl />
        <ChartCard className='col-span-full' data={data} />
      </div>
    </main>
  );
}
