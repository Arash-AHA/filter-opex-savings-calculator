
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
    return totalArea * emcCleaningFactor;
  }, [emcCleaningFactor]);
  
  // Calculate results
  const results = useMemo(() => {
    // Calculate total filter area based on design type
    const totalFilterArea = calculateFilterArea();
    const netFilterArea = calculateNetFilterArea(totalFilterArea);
    
    // Calculate OPEX metrics
    const acRatioGross = parseFloat(airVolumeM3h) / totalFilterArea || 0;
    const acRatioNet = parseFloat(airVolumeM3h) / netFilterArea || 0;
    const baselinePowerConsumption = parseFloat(airVolumeM3h) * 0.0002 || 0; // 0.0002 kW per m³/h
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
  }, [
    calculateFilterArea, calculateNetFilterArea, airVolumeM3h, 
    numEMCFlaps, bagsPerRow, bagChangeTime, numPeople, 
    bagPrice, bagReplacementCost, currentLifeTime, scheuchLifeTime,
    currentAirConsumption, scheuchAirConsumption, workingHours
  ]);

  // Formatted results
  const formattedResults = useMemo(() => {
    if (designType === 'bolt-weld') {
      // Metric units
      return {
        filterArea: `${results.filterArea.toFixed(2)} m²`,
        netFilterArea: `${results.netFilterArea.toFixed(2)} m²`,
        acRatioGross: `${results.acRatioGross.toFixed(2)} m³/h/m²`,
        acRatioNet: `${results.acRatioNet.toFixed(2)} m³/h/m²`,
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
  }, [
    designType, results, bagPrice, m2ToSqFtFactor, conversionFactor
  ]);

  // Calculate total savings
  const totalSavings = useMemo(() => {
    // Bag Material and Labor
    const bagSavings = ((((savingYears * 12) / currentLifeTime) * ((results.totalBags * bagPrice) + travelCost)) - 
                       (((savingYears * 12) / scheuchLifeTime) * ((results.totalBags * bagPrice) + travelCost)));
    
    // Fan Power Consumption
    const fanPowerSavings = (((parseFloat(airVolumeM3h) * (currentDiffPressure - scheuchDiffPressure) * 100) / 
                           (3600 * 1000 * 0.8)) * kwhCost * workingHours * savingYears);
    
    // Compressed Air Consumption
    const airSavings = compressedAirCost 
      ? (currentAirConsumption - scheuchAirConsumption) * parseFloat(compressedAirCost) * workingHours * savingYears
      : (currentMotorKW - scheuchMotorKW) * kwhCost * workingHours * savingYears;
    
    return {
      bagSavings,
      fanPowerSavings,
      airSavings,
      total: bagSavings + fanPowerSavings + airSavings
    };
  }, [
    savingYears, currentLifeTime, scheuchLifeTime, results.totalBags, 
    bagPrice, travelCost, airVolumeM3h, currentDiffPressure, 
    scheuchDiffPressure, kwhCost, workingHours, compressedAirCost, 
    currentAirConsumption, scheuchAirConsumption, currentMotorKW, scheuchMotorKW
  ]);

  return {
    results,
    formattedResults,
    totalSavings
  };
};
