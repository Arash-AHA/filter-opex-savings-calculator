
import { useState, useEffect } from 'react';

export const useSavingsCalculation = () => {
  // Results section parameters
  const [savingYears, setSavingYears] = useState(10); // Changed default from 0 to 10
  const [daysPerYear, setDaysPerYear] = useState(240); // Default working days in a year
  const [hoursPerDay, setHoursPerDay] = useState(8); // Default working hours in a day
  const [workingHours, setWorkingHours] = useState(daysPerYear * hoursPerDay);
  const [kwhCost, setKwhCost] = useState(0);
  const [compressedAirCost, setCompressedAirCost] = useState('');
  
  // Update workingHours when daysPerYear or hoursPerDay changes
  useEffect(() => {
    setWorkingHours(daysPerYear * hoursPerDay);
  }, [daysPerYear, hoursPerDay]);
  
  return {
    savingYears,
    setSavingYears,
    daysPerYear,
    setDaysPerYear,
    hoursPerDay,
    setHoursPerDay,
    workingHours,
    setWorkingHours,
    kwhCost,
    setKwhCost,
    compressedAirCost,
    setCompressedAirCost
  };
};
