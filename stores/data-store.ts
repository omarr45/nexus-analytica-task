import { create } from 'zustand';

interface DataState {
  parsedData: any[];
  numericProps: any[];
  nonNumericProps: any[];
  selectedNumericProps: any[];
  selectedNonNumericProp: any;
  setParsedData: (data: any[]) => void;
  setNumericProps: (data: any[]) => void;
  setNonNumericProps: (data: any[]) => void;
  toggleSelectedNumericProp: (data: any) => void;
  setSelectedNonNumericProp: (data: any) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  parsedData: [],
  numericProps: [],
  nonNumericProps: [],
  selectedNumericProps: [],
  selectedNonNumericProp: [],
  setParsedData: (data) => {
    set({ parsedData: data });
  },
  setNumericProps: (data) => {
    set({ numericProps: data });
  },
  setNonNumericProps: (data) => {
    set({ nonNumericProps: data });
  },
  toggleSelectedNumericProp: (data) => {
    const { selectedNumericProps } = get();
    const newSelectedNumericProps = [...selectedNumericProps];
    const index = newSelectedNumericProps.indexOf(data);
    if (index > -1) {
      newSelectedNumericProps.splice(index, 1);
    } else {
      newSelectedNumericProps.push(data);
    }
    set({ selectedNumericProps: newSelectedNumericProps });
  },
  setSelectedNonNumericProp: (data) => {
    set({ selectedNonNumericProp: data });
  },
}));
