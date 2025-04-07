import { useCallback, useMemo } from 'react';

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
  // Calculate filter area
  const calculateFilterArea = useCallback(() => {
    if (designType === 'bolt-weld') {
      // PI()*165/1000*Bag length*5*No. bags in a row*No. EMC flaps
      return Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * numEMCFlaps;
    } else {
      // For Modular design
      const surfaceAreaPerFoot = 4 * 0.292 * 0.3048; // Surface area per foot
      return numEMCFlaps * bagsPerRow * bagLength * surfaceAreaPerFoot;
    }
  }, [designType, bagLength, bagsPerRow, numEMCFlaps]);
  
  // Calculate net filter area (accounting for EMC cleaning)
  const calculateNetFilterArea = useCallback((totalArea) => {
    if (designType === 'bolt-weld') {
      // For bolt-weld design, use numEMCFlaps-1 in the calculation
      return Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * (numEMCFlaps - 1);
    } else {
      // For modular design, keep using the emcCleaningFactor
      return totalArea * emcCleaningFactor;
    }
  }, [designType, bagLength, bagsPerRow, numEMCFlaps, emcCleaningFactor]);
  
  // Calculate results
  const results = useMemo(() => {
    try {
      // Calculate total filter area based on design type
      const totalFilterArea = calculateFilterArea();
      const netFilterArea = calculateNetFilterArea(totalFilterArea);
      
      // Calculate OPEX metrics - check for valid inputs to prevent NaN
      const parsedAirVolume = parseFloat(airVolumeM3h) || 0;
      const acRatioGross = parsedAirVolume / totalFilterArea || 0;
      const acRatioNet = parsedAirVolume / netFilterArea || 0;
      const baselinePowerConsumption = parsedAirVolume * 0.0002 || 0; // 0.0002 kW per m³/h
      const improvedPowerConsumption = baselinePowerConsumption * 0.8 || 0; // 20% reduction
      
      // Calculate total bags
      const totalBags = numEMCFlaps * bagsPerRow * 5;
      
      // Calculate days to replace
      const daysToReplace = (totalBags * bagChangeTime / 60 / 10 / numPeople * 2) || 0;
      
      // Calculate bag lifetime savings
      const bagTotalCost = bagPrice * totalBags;
      const lifeExtension = scheuchLifeTime - currentLifeTime;
      const standardReplacements = 120 / currentLifeTime;
      const emcReplacements = 120 / scheuchLifeTime;
      const replacementSavings = (standardReplacements - emcReplacements) * (bagTotalCost + parseFloat(bagReplacementCost.toString()));
      
      // Calculate compressed air savings
      const compressedAirSavings = (currentAirConsumption - scheuchAirConsumption) * workingHours;
      
      return {
        filterArea: totalFilterArea,
        netFilterArea: netFilterArea,
        acRatioGross: acRatioGross,
        acRatioNet: acRatioNet,
        baselinePower: baselinePowerConsumption,
        improvedPower: improvedPowerConsumption,
        annualSavings: 0, // Kept for state compatibility
        totalBags,
        daysToReplace: daysToReplace,
        totalReplacementCost: parseFloat(bagReplacementCost.toString()),
        tenYearSavings: replacementSavings,
        lifeExtension,
        compressedAirSavings: compressedAirSavings
      };
    } catch (error) {
      console.error("Error calculating results:", error);
      // Return default values if calculation fails
      return {
        filterArea: 0,
        netFilterArea: 0,
        acRatioGross: 0,
        acRatioNet: 0,
        baselinePower: 0,
        improvedPower: 0,
        annualSavings: 0,
        totalBags: 0,
        daysToReplace: 0,
        totalReplacementCost: 0,
        tenYearSavings: 0,
        lifeExtension: 0,
        compressedAirSavings: 0
      };
    }
  }, [
    calculateFilterArea, calculateNetFilterArea, airVolumeM3h, 
    numEMCFlaps, bagsPerRow, bagChangeTime, numPeople, 
    bagPrice, bagReplacementCost, currentLifeTime, scheuchLifeTime,
    currentAirConsumption, scheuchAirConsumption, workingHours
  ]);

  // Formatted results
  const formattedResults = useMemo(() => {
    try {
      if (designType === 'bolt-weld') {
        // Metric units - divide A/C ratios by 60 and change unit to m³/min/m²
        return {
          filterArea: `${results.filterArea.toFixed(2)} m²`,
          netFilterArea: `${results.netFilterArea.toFixed(2)} m²`,
          acRatioGross: `${(results.acRatioGross / 60).toFixed(2)} m³/min/m²`,
          acRatioNet: `${(results.acRatioNet / 60).toFixed(2)} m³/min/m²`,
          baselinePower: `${results.baselinePower.toFixed(2)} kW`,
          improvedPower: `${results.improvedPower.toFixed(2)} kW`,
          totalBags: results.totalBags,
          daysToReplace: results.daysToReplace.toFixed(2),
          bagMaterialCost: results.totalBags * bagPrice,
          tenYearSavings: `${Number(results.tenYearSavings).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
          lifeExtension: `${results.lifeExtension} months`
        };
      } else {
        // Imperial units
        const filterAreaSqFt = (results.filterArea * m2ToSqFtFactor).toFixed(2);
        const netFilterAreaSqFt = (results.netFilterArea * m2ToSqFtFactor).toFixed(2);
        const acRatioGrossImperial = (results.acRatioGross / m2ToSqFtFactor * conversionFactor).toFixed(2);
        const acRatioNetImperial = (results.acRatioNet / m2ToSqFtFactor * conversionFactor).toFixed(2);
        
        return {
          filterArea: `${filterAreaSqFt} sq ft`,
          netFilterArea: `${netFilterAreaSqFt} sq ft`,
          acRatioGross: `${acRatioGrossImperial} cfm/sq ft`,
          acRatioNet: `${acRatioNetImperial} cfm/sq ft`,
          baselinePower: `${results.baselinePower.toFixed(2)} kW`,
          improvedPower: `${results.improvedPower.toFixed(2)} kW`,
          totalBags: results.totalBags,
          daysToReplace: results.daysToReplace.toFixed(2),
          bagMaterialCost: results.totalBags * bagPrice,
          tenYearSavings: `${Number(results.tenYearSavings).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
          lifeExtension: `${results.lifeExtension} months`
        };
      }
    } catch (error) {
      console.error("Error formatting results:", error);
      // Return default values if formatting fails
      return {
        filterArea: "0.00 m²",
        netFilterArea: "0.00 m²",
        acRatioGross: "0.00 m³/min/m²",
        acRatioNet: "0.00 m³/min/m²",
        baselinePower: "0.00 kW",
        improvedPower: "0.00 kW",
        totalBags: 0,
        daysToReplace: "0.00",
        bagMaterialCost: 0,
        tenYearSavings: "0.00",
        lifeExtension: "0 months"
      };
    }
  }, [
    designType, results, bagPrice, m2ToSqFtFactor, conversionFactor
  ]);

  // Calculate total savings
  const totalSavings = useMemo(() => {
    try {
      // Bag Material and Labor
      const bagSavings = ((((savingYears * 12) / currentLifeTime) * ((results.totalBags * bagPrice) + travelCost)) - 
                        (((savingYears * 12) / scheuchLifeTime) * ((results.totalBags * bagPrice) + travelCost)));
      
      // Fan Power Consumption
      const fanPowerSavings = (((parseFloat(airVolumeM3h) * (currentDiffPressure - scheuchDiffPressure) * 100) / 
                            (3600 * 1000 * 0.8)) * kwhCost * workingHours * savingYears);
      
      // Compressed Air Consumption
      let airSavings = 0;
      const airConsumptionDiff = currentAirConsumption - scheuchAirConsumption;
      
      // If USD/Nm³ has a value, use it for calculation
      if (compressedAirCost && compressedAirCost.trim() !== '') {
        airSavings = airConsumptionDiff * parseFloat(compressedAirCost) * workingHours * savingYears;
      } 
      // Otherwise, use the motor KW difference
      else {
        airSavings = (currentMotorKW - scheuchMotorKW) * kwhCost * workingHours * savingYears;
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
    savingYears, currentLifeTime, scheuchLifeTime, results.totalBags, 
    bagPrice, travelCost, airVolumeM3h, currentDiffPressure, 
    scheuchDiffPressure, kwhCost, workingHours,
    currentAirConsumption, scheuchAirConsumption,
    compressedAirCost, currentMotorKW, scheuchMotorKW
  ]);

  return {
    results,
    formattedResults,
    totalSavings
  };
};
