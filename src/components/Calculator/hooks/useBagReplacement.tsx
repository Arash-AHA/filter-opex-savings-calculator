
import { useState, useCallback } from 'react';

export const useBagReplacement = () => {
  // Filter bag replacement parameters with default values
  const [bagPrice, setBagPrice] = useState(190);
  const [bagChangeTime, setBagChangeTime] = useState(15);
  const [numPeople, setNumPeople] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(200);
  const [siteDistance, setSiteDistance] = useState(1700);
  const [travelCost, setTravelCost] = useState(0);
  const [bagReplacementCost, setBagReplacementCost] = useState(0);
  
  // Calculate travel cost
  const calculateTravelCost = useCallback((daysToReplace: number) => {
    const calculatedDays = Math.ceil(daysToReplace);
    const calculatedCost = 
      (numPeople * (calculatedDays - 1) * hourlyRate) + 
      (numPeople * Math.ceil(numPeople) * 100) + 
      (siteDistance * 2 * 0.5) + 
      (numPeople * 150);
    setTravelCost(calculatedCost);
  }, [numPeople, hourlyRate, siteDistance]);
  
  return {
    bagPrice,
    setBagPrice,
    bagChangeTime,
    setBagChangeTime,
    numPeople,
    setNumPeople,
    hourlyRate,
    setHourlyRate,
    siteDistance,
    setSiteDistance,
    travelCost,
    setTravelCost,
    bagReplacementCost,
    setBagReplacementCost,
    calculateTravelCost
  };
};
