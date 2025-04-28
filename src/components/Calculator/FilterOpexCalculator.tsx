import React, { useState } from 'react';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';
import CalculatorSection from './CalculatorSection';

const FilterOpexCalculator = () => {
  const {
    // Design parameters
    designType,
    setDesignType,
    airVolumeM3h,
    setAirVolumeM3h,
    airVolumeACFM,
    setAirVolumeACFM,
    numEMCFlaps,
    setNumEMCFlaps,
    bagLength,
    setBagLength,
    bagsPerRow,
    setBagsPerRow,
    m2ToSqFtFactor,
    setM2ToSqFtFactor,
    conversionFactor,
    setConversionFactor,
    emcCleaningFactor,
    setEmcCleaningFactor,
    
    // Filter bag replacement
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
    calculateTravelCost,
    
    // Operational parameters
    currentLifeTime,
    setCurrentLifeTime,
    scheuchLifeTime,
    setScheuchLifeTime,
    currentDiffPressure,
    setCurrentDiffPressure,
    scheuchDiffPressure,
    setScheuchDiffPressure,
    currentAirConsumption,
    setCurrentAirConsumption,
    scheuchAirConsumption,
    setScheuchAirConsumption,
    currentMotorKW,
    setCurrentMotorKW,
    scheuchMotorKW,
    setScheuchMotorKW,
    
    // Savings calculation parameters
    savingYears,
    setSavingYears,
    workingHours,
    setWorkingHours,
    kwhCost,
    setKwhCost,
    compressedAirCost,
    setCompressedAirCost,
    
    // Calculated results
    results,
    formattedResults,
    totalSavings
  } = useCalculatorState();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Filter OPEX Savings Calculator
      </h1>

      <div className="space-y-6">
        <CalculatorSection 
          title="Design Parameters"
          defaultOpen={true}
        >
          <DesignParameters {...designParams} />
        </CalculatorSection>

        <CalculatorSection 
          title="Filter Bag Replacement"
          defaultOpen={true}
        >
          <FilterBagReplacement {...bagReplacement} formattedResults={formattedResults} />
        </CalculatorSection>

        <CalculatorSection 
          title="Operational Parameters"
          defaultOpen={true}
        >
          <OperationalParameters {...operationalParams} />
        </CalculatorSection>

        <SavingsResults
          savingYears={savingYears}
          setSavingYears={setSavingYears}
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
          kwhCost={kwhCost}
          setKwhCost={setKwhCost}
          compressedAirCost={compressedAirCost}
          setCompressedAirCost={setCompressedAirCost}
          totalSavings={totalSavings}
          {...operationalParams}
          {...designParams}
          formattedResults={formattedResults}
        />
      </div>
    </div>
  );
};

export default FilterOpexCalculator;
