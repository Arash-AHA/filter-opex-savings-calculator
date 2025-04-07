import { useMemo } from 'react';

export interface BagSavingsParams {
  savingYears: number;
  currentLifeTime: number;
  scheuchLifeTime: number;
  totalBags: number;
  bagPrice: number;
  travelCost: number;
}

export interface PowerSavingsParams {
  airVolumeM3h: string;
  currentDiffPressure: number;
  scheuchDiffPressure: number;
  kwhCost: number;
  workingHours: number;
  savingYears: number;
}

export interface AirSavingsParams {
  currentAirConsumption: number;
  scheuchAirConsumption: number;
  compressedAirCost: string;
  currentMotorKW: number;
  scheuchMotorKW: number;
  kwhCost: number;
  workingHours: number;
  savingYears: number;
}

export const useCalculateSavings = (
  bagParams: BagSavingsParams,
  powerParams: PowerSavingsParams,
  airParams: AirSavingsParams
) => {
  // Calculate total savings
  const totalSavings = useMemo(() => {
    try {
      // Bag Material and Labor
      const bagSavings = ((((bagParams.savingYears * 12) / bagParams.currentLifeTime) * 
                          ((bagParams.totalBags * bagParams.bagPrice) + bagParams.travelCost)) - 
                         (((bagParams.savingYears * 12) / bagParams.scheuchLifeTime) * 
                          ((bagParams.totalBags * bagParams.bagPrice) + bagParams.travelCost)));
      
      // Fan Power Consumption
      const fanPowerSavings = (((parseFloat(powerParams.airVolumeM3h) * 
                               (powerParams.currentDiffPressure - powerParams.scheuchDiffPressure) * 100) / 
                               (3600 * 1000 * 0.8)) * powerParams.kwhCost * 
                               powerParams.workingHours * powerParams.savingYears);
      
      // Compressed Air Consumption
      let airSavings = 0;
      const airConsumptionDiff = airParams.currentAirConsumption - airParams.scheuchAirConsumption;
      
      // If USD/Nm³ has a value, use it for calculation
      if (airParams.compressedAirCost && airParams.compressedAirCost.trim() !== '') {
        airSavings = airConsumptionDiff * parseFloat(airParams.compressedAirCost) * 
                    airParams.workingHours * airParams.savingYears;
      } 
      // Otherwise, use the motor KW difference
      else {
        airSavings = (airParams.currentMotorKW - airParams.scheuchMotorKW) * 
                     airParams.kwhCost * airParams.workingHours * airParams.savingYears;
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
    bagParams.savingYears, bagParams.currentLifeTime, bagParams.scheuchLifeTime, 
    bagParams.totalBags, bagParams.bagPrice, bagParams.travelCost,
    powerParams.airVolumeM3h, powerParams.currentDiffPressure, powerParams.scheuchDiffPressure,
    powerParams.kwhCost, powerParams.workingHours, powerParams.savingYears,
    airParams.currentAirConsumption, airParams.scheuchAirConsumption, airParams.compressedAirCost,
    airParams.currentMotorKW, airParams.scheuchMotorKW, airParams.kwhCost,
    airParams.workingHours, airParams.savingYears
  ]);

  return totalSavings;
};
