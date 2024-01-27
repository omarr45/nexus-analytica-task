import ChartCard from '@/components/chart-card';
import DataControl from '@/components/data-control';
import UploadForm from '@/components/upload-form';

export default function Home() {
  return (
    <main className='mx-auto max-w-5xl px-2 py-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        <UploadForm />
        <DataControl />
        <ChartCard />
      </div>
    </main>
  );
}
