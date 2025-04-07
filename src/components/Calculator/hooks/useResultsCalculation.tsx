
import { useMemo } from 'react';
import { useFilterAreaCalculation } from './useFilterAreaCalculation';
import { useBagReplacementCalculation } from './useBagReplacementCalculation';
import { useCalculateSavings } from './useSavingsCalculation';
import { useFormattedResults } from './useFormattedResults';

export const useResultsCalculation = (
  designType: string,
  bagLength: number, 
  bagsPerRow: number, 
  numEMCFlaps: number,
  airVolumeM3h: string,
  emcCleaningFactor: number,
  bagPrice: number,
  bagChangeTime: number,
  numPeople: number,
  travelCost: number,
  bagReplacementCost: number,
  currentLifeTime: number,
  scheuchLifeTime: number,
  currentDiffPressure: number,
  scheuchDiffPressure: number,
  currentAirConsumption: number,
  scheuchAirConsumption: number,
  currentMotorKW: number,
  scheuchMotorKW: number,
  savingYears: number,
  workingHours: number,
  kwhCost: number,
  compressedAirCost: string,
  m2ToSqFtFactor: number,
  conversionFactor: number
) => {
  // Use the filter area calculation hook
  const filterResults = useFilterAreaCalculation(
    designType,
    bagLength,
    bagsPerRow,
    numEMCFlaps,
    emcCleaningFactor,
    airVolumeM3h
  );
  
  // Use the bag replacement calculation hook
  const bagResults = useBagReplacementCalculation(
    numEMCFlaps,
    bagsPerRow,
    bagChangeTime,
    numPeople,
    bagPrice
  );
  
  // Calculate life extension
  const lifeExtension = scheuchLifeTime - currentLifeTime;
  
  // Calculate lifetime savings
  const standardReplacements = 120 / currentLifeTime;
  const emcReplacements = 120 / scheuchLifeTime;
  const replacementSavings = (standardReplacements - emcReplacements) * (bagResults.totalBags * bagPrice + parseFloat(bagReplacementCost.toString()));
  
  // Calculate compressed air savings
  const compressedAirSavings = (currentAirConsumption - scheuchAirConsumption) * workingHours;
  
  // Combined results
  const results = useMemo(() => {
    return {
      ...filterResults,
      annualSavings: 0, // Kept for state compatibility
      totalBags: bagResults.totalBags,
      daysToReplace: bagResults.daysToReplace,
      totalReplacementCost: parseFloat(bagReplacementCost.toString()),
      tenYearSavings: replacementSavings,
      lifeExtension,
      compressedAirSavings
    };
  }, [filterResults, bagResults, bagReplacementCost, replacementSavings, lifeExtension, compressedAirSavings]);
  
  // Use the formatted results hook
  const formattedResults = useFormattedResults(
    designType,
    filterResults,
    bagResults,
    lifeExtension,
    bagPrice,
    m2ToSqFtFactor,
    conversionFactor
  );
  
  // Use the savings calculation hook
  const totalSavings = useCalculateSavings(
    {
      savingYears,
      currentLifeTime,
      scheuchLifeTime,
      totalBags: bagResults.totalBags,
      bagPrice,
      travelCost
    },
    {
      airVolumeM3h,
      currentDiffPressure,
      scheuchDiffPressure,
      kwhCost,
      workingHours,
      savingYears
    },
    {
      currentAirConsumption,
      scheuchAirConsumption,
      compressedAirCost,
      currentMotorKW,
      scheuchMotorKW,
      kwhCost,
      workingHours,
      savingYears
    }
  );

  return {
    results,
    formattedResults,
    totalSavings
  };
};
