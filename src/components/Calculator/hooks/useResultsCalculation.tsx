
import { useMemo } from 'react';
import { useFilterAreaCalculation } from './useFilterAreaCalculation';
import { useBagReplacementCalculation } from './useBagReplacementCalculation';
import { useFormattedResults } from './useFormattedResults';
import { EnergyUnit } from './useSavingsCalculation';

export const useResultsCalculation = (
  designType: string,
  bagLength: number, 
  bagsPerRow: number, 
  numEMCFlaps: number,
  airVolumeM3h: string,
  emcCleaningFactor: number,
  bagPrice: number,
  cagePrice: number,
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
  energyUnit: EnergyUnit = 'kWh',
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
  
  // Use the bag replacement calculation hook with cagePrice
  const bagResults = useBagReplacementCalculation(
    numEMCFlaps,
    bagsPerRow,
    bagChangeTime,
    numPeople,
    bagPrice,
    cagePrice
  );
  
  // Calculate life extension
  const lifeExtension = scheuchLifeTime - currentLifeTime;
  
  // Calculate lifetime savings
  const standardReplacements = 120 / currentLifeTime;
  const emcReplacements = 120 / scheuchLifeTime;
  const replacementSavings = (standardReplacements - emcReplacements) * (bagResults.totalBags * bagPrice + parseFloat(bagReplacementCost.toString()));
  
  // Calculate compressed air savings based on working hours
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
  
  // Conversion factors to kWh
  const CONVERSION_FACTORS = {
    'kWh': 1,
    'MMBtu': 293.07107, // 1 MMBtu = 293.07107 kWh
    'therms': 29.3071, // 1 therm = 29.3071 kWh
  };
  
  // Calculate effective kWh cost
  const effectiveKwhCost = kwhCost / CONVERSION_FACTORS[energyUnit] * CONVERSION_FACTORS['kWh'];
  
  // Calculate total savings
  const totalSavings = useMemo(() => {
    try {
      // Bag Material and Labor
      const bagSavings = ((((savingYears * 12) / currentLifeTime) * 
                          ((bagResults.totalBags * bagPrice) + travelCost)) - 
                         (((savingYears * 12) / scheuchLifeTime) * 
                          ((bagResults.totalBags * bagPrice) + travelCost)));
      
      // Fan Power Consumption using the effective kWh cost
      const fanPowerSavings = (((parseFloat(airVolumeM3h) * 
                               (currentDiffPressure - scheuchDiffPressure) * 100) / 
                               (3600 * 1000 * 0.8)) * effectiveKwhCost * 
                               workingHours * savingYears);
      
      // Compressed Air Consumption
      let airSavings = 0;
      const airConsumptionDiff = currentAirConsumption - scheuchAirConsumption;
      
      // If USD/Nm³ has a value, use it for calculation
      if (compressedAirCost && compressedAirCost.trim() !== '') {
        airSavings = airConsumptionDiff * parseFloat(compressedAirCost) * 
                    workingHours * savingYears;
      } 
      // Otherwise, use the motor KW difference with the effective kWh cost
      else {
        airSavings = (currentMotorKW - scheuchMotorKW) * 
                     effectiveKwhCost * workingHours * savingYears;
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
    effectiveKwhCost, workingHours,
    currentAirConsumption, scheuchAirConsumption, compressedAirCost,
    currentMotorKW, scheuchMotorKW
  ]);

  return {
    results,
    formattedResults,
    totalSavings,
    effectiveKwhCost
  };
};
