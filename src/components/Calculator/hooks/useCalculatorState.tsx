
import { useState, useEffect } from 'react';
import { useDesignParameters } from './useDesignParameters';
import { useBagReplacement } from './useBagReplacement';
import { useOperationalParameters } from './useOperationalParameters';
import { useSavingsCalculation } from './useSavingsCalculation';
import { useResultsCalculation } from './useResultsCalculation';

export const useCalculatorState = () => {
  // Import all sub-hooks
  const designParams = useDesignParameters();
  const bagReplacement = useBagReplacement();
  const operationalParams = useOperationalParameters();
  const savingsCalc = useSavingsCalculation();

  // State for calculated results
  const [results, setResults] = useState({
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
  });

  // Calculate all values when inputs change  
  const { results: calculatedResults, formattedResults, totalSavings } = useResultsCalculation(
    designParams.designType,
    designParams.bagLength,
    designParams.bagsPerRow,
    designParams.numEMCFlaps,
    designParams.airVolumeM3h,
    designParams.emcCleaningFactor,
    bagReplacement.bagPrice,
    bagReplacement.bagChangeTime,
    bagReplacement.numPeople,
    bagReplacement.travelCost,
    bagReplacement.bagReplacementCost,
    operationalParams.currentLifeTime,
    operationalParams.scheuchLifeTime,
    operationalParams.currentDiffPressure,
    operationalParams.scheuchDiffPressure,
    operationalParams.currentAirConsumption,
    operationalParams.scheuchAirConsumption,
    operationalParams.currentMotorKW,
    operationalParams.scheuchMotorKW,
    savingsCalc.savingYears,
    savingsCalc.workingHours,
    savingsCalc.kwhCost,
    savingsCalc.compressedAirCost,
    designParams.m2ToSqFtFactor,
    designParams.conversionFactor
  );

  // Update results whenever calculated values change
  useEffect(() => {
    setResults(calculatedResults);
  }, [calculatedResults]);

  // Update travel cost when results change
  useEffect(() => {
    if (results.daysToReplace > 0) {
      bagReplacement.calculateTravelCost(results.daysToReplace);
    }
  }, [results.daysToReplace, bagReplacement]);

  return {
    // Design parameters
    ...designParams,
    
    // Filter bag replacement
    ...bagReplacement,
    
    // Operational parameters
    ...operationalParams,
    
    // Savings calculation parameters
    savingYears: savingsCalc.savingYears,
    setSavingYears: savingsCalc.setSavingYears,
    workingHours: savingsCalc.workingHours,
    setWorkingHours: savingsCalc.setWorkingHours,
    kwhCost: savingsCalc.kwhCost,
    setKwhCost: savingsCalc.setKwhCost,
    compressedAirCost: savingsCalc.compressedAirCost,
    setCompressedAirCost: savingsCalc.setCompressedAirCost,
    
    // Calculated results
    results,
    formattedResults,
    totalSavings
  };
};
