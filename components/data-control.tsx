'use client';

import { Card, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDataStore } from '@/stores/data-store';

const DataControl = () => {
  const numericProps = useDataStore((state) => state.numericProps);
  const nonNumericProps = useDataStore((state) => state.nonNumericProps);
  const toggleSelectedNumericProp = useDataStore(
    (state) => state.toggleSelectedNumericProp,
  );
  const parsedData = useDataStore((state) => state.parsedData);

  if (parsedData.length < 1)
    return (
      <Card>
        <CardContent className='grid h-full place-items-center p-6'>
          <p>No data</p>
        </CardContent>
      </Card>
    );
  return (
    <Card>
      <CardContent className='grid h-full grid-rows-2 p-4'>
        <div className='flex items-center justify-start gap-3'>
          <span className='font-bold'>X-Axis</span>
          <RadioGroup
            className='flex items-center justify-start gap-3'
            defaultValue={useDataStore.getState().selectedNonNumericProp}
          >
            {nonNumericProps.map((prop, idx) => (
              <div key={prop} className='flex items-center space-x-1'>
                <RadioGroupItem
                  value={prop}
                  id={prop}
                  defaultChecked={idx === 0}
                  onClick={() => {
                    useDataStore.getState().setSelectedNonNumericProp(prop);
                  }}
                />
                <Label htmlFor={prop}>{prop}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className='flex items-center justify-start gap-3'>
          <span className='font-bold'>Y-Axis</span>
          {numericProps.map((prop) => (
            <div key={prop} className='flex items-center space-x-1'>
              <Checkbox
                id={prop}
                defaultChecked={true}
                onCheckedChange={() => {
                  // useDataStore.getState().
                  toggleSelectedNumericProp(prop);
                }}
              />
              <label
                htmlFor={prop}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {prop}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataControl;
