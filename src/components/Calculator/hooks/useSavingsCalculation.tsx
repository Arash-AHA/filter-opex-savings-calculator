
import { useState } from 'react';

export const useSavingsCalculation = () => {
  // Results section parameters
  const [savingYears, setSavingYears] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [kwhCost, setKwhCost] = useState(0);
  const [compressedAirCost, setCompressedAirCost] = useState('');
  
  return {
    savingYears,
    setSavingYears,
    workingHours,
    setWorkingHours,
    kwhCost,
    setKwhCost,
    compressedAirCost,
    setCompressedAirCost
  };
};
