'use client';

import ChartCard from '@/components/chart-card';
import DataControl from '@/components/data-control';
import UploadForm from '@/components/upload-form';
import { UserAuth } from '@/contexts/auth-context';

export default function Home() {
  const { user } = UserAuth();

  return (
    <main className='mx-auto max-w-5xl px-2 py-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        {user ? (
          <>
            <UploadForm />
            <DataControl />
            <ChartCard />
          </>
        ) : (
          <>
            <h1 className='col-span-full place-self-center text-3xl font-bold'>
              Welcome to Nexus
            </h1>
            <p className='col-span-full place-self-center text-lg'>
              Please login to upload data and view charts
            </p>
          </>
        )}
      </div>
    </main>
  );
}
