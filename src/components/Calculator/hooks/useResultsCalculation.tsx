
import { useMemo } from 'react';
import { useFilterAreaCalculation } from './useFilterAreaCalculation';
import { useBagReplacementCalculation } from './useBagReplacementCalculation';
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
  conversionFactor: number,
  airVolumeACFM?: string
) => {
  // Use the filter area calculation hook with the additional airVolumeACFM parameter
  const filterResults = useFilterAreaCalculation(
    designType,
    bagLength,
    bagsPerRow,
    numEMCFlaps,
    emcCleaningFactor,
    airVolumeM3h,
    airVolumeACFM
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
  
  // Calculate total savings
  const totalSavings = useMemo(() => {
    // Bag savings parameters
    const bagParams = {
      savingYears,
      currentLifeTime,
      scheuchLifeTime,
      totalBags: bagResults.totalBags,
      bagPrice,
      travelCost
    };

    // Power savings parameters
    const powerParams = {
      airVolumeM3h,
      currentDiffPressure,
      scheuchDiffPressure,
      kwhCost,
      workingHours,
      savingYears
    };

    // Air savings parameters
    const airParams = {
      currentAirConsumption,
      scheuchAirConsumption,
      compressedAirCost,
      currentMotorKW,
      scheuchMotorKW,
      kwhCost,
      workingHours,
      savingYears
    };

    // Calculate savings directly
    try {
      // Bag Material and Labor
      const bagSavings = ((((savingYears * 12) / currentLifeTime) * 
                          ((bagResults.totalBags * bagPrice) + travelCost)) - 
                         (((savingYears * 12) / scheuchLifeTime) * 
                          ((bagResults.totalBags * bagPrice) + travelCost)));
      
      // Fan Power Consumption
      const fanPowerSavings = (((parseFloat(airVolumeM3h) * 
                               (currentDiffPressure - scheuchDiffPressure) * 100) / 
                               (3600 * 1000 * 0.8)) * kwhCost * 
                               workingHours * savingYears);
      
      // Compressed Air Consumption
      let airSavings = 0;
      const airConsumptionDiff = currentAirConsumption - scheuchAirConsumption;
      
      // If USD/Nm³ has a value, use it for calculation
      if (compressedAirCost && compressedAirCost.trim() !== '') {
        airSavings = airConsumptionDiff * parseFloat(compressedAirCost) * 
                    workingHours * savingYears;
      } 
      // Otherwise, use the motor KW difference
      else {
        airSavings = (currentMotorKW - scheuchMotorKW) * 
                     kwhCost * workingHours * savingYears;
      }
      
      return {
        bagSavings,
        fanPowerSavings,
        airSavings,
        total: bagSavings + fanPowerSavings + airSavings
      };
    } catch (error) {
      console.error("Error calculating total savings:", error);
      // Return default values if calculation fails
      return {
        bagSavings: 0,
        fanPowerSavings: 0,
        airSavings: 0,
        total: 0
      };
    }
  }, [
    savingYears, currentLifeTime, scheuchLifeTime, 
    bagResults.totalBags, bagPrice, travelCost,
    airVolumeM3h, currentDiffPressure, scheuchDiffPressure,
    kwhCost, workingHours,
    currentAirConsumption, scheuchAirConsumption, compressedAirCost,
    currentMotorKW, scheuchMotorKW
  ]);

  return {
    results,
    formattedResults,
    totalSavings
  };
};
