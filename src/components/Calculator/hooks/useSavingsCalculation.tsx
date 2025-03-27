
import { useState } from 'react';

export const useSavingsCalculation = () => {
  // Results section parameters
  const [savingYears, setSavingYears] = useState(10); // Changed default from 0 to 10
  const [workingHours, setWorkingHours] = useState(7920); // Updated default to 7920 (330*24)
  const [kwhCost, setKwhCost] = useState(0.25); // Updated default to 0.25
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
