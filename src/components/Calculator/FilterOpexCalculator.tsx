import React from 'react';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';

const FilterOpexCalculator: React.FC = () => {
  const calculatorState = useCalculatorState();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Filter Baghouse OPEX Savings Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Design Parameters
        </h2>
        <DesignParameters
          designType={calculatorState.designType}
          setDesignType={calculatorState.setDesignType}
          bagLength={calculatorState.bagLength}
          setBagLength={calculatorState.setBagLength}
          bagsPerRow={calculatorState.bagsPerRow}
          setBagsPerRow={calculatorState.setBagsPerRow}
          numEMCFlaps={calculatorState.numEMCFlaps}
          setNumEMCFlaps={calculatorState.setNumEMCFlaps}
          airVolumeM3h={calculatorState.airVolumeM3h}
          setAirVolumeM3h={calculatorState.setAirVolumeM3h}
          airVolumeACFM={calculatorState.airVolumeACFM}
          setAirVolumeACFM={calculatorState.setAirVolumeACFM}
          emcCleaningFactor={calculatorState.emcCleaningFactor}
          setEmcCleaningFactor={calculatorState.setEmcCleaningFactor}
          m2ToSqFtFactor={calculatorState.m2ToSqFtFactor}
          setM2ToSqFtFactor={calculatorState.setM2ToSqFtFactor}
          conversionFactor={calculatorState.conversionFactor}
          setConversionFactor={calculatorState.setConversionFactor}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Filter Bag Replacement
        </h2>
        <FilterBagReplacement
          bagPrice={calculatorState.bagPrice}
          setBagPrice={calculatorState.setBagPrice}
          cagePrice={calculatorState.cagePrice}
          setCagePrice={calculatorState.setCagePrice}
          bagChangeTime={calculatorState.bagChangeTime}
          setBagChangeTime={calculatorState.setBagChangeTime}
          numPeople={calculatorState.numPeople}
          setNumPeople={calculatorState.setNumPeople}
          hourlyRate={calculatorState.hourlyRate}
          setHourlyRate={calculatorState.setHourlyRate}
          siteDistance={calculatorState.siteDistance}
          setSiteDistance={calculatorState.setSiteDistance}
          travelCost={calculatorState.travelCost}
          setTravelCost={calculatorState.setTravelCost}
          bagReplacementCost={calculatorState.bagReplacementCost}
          setBagReplacementCost={calculatorState.setBagReplacementCost}
          calculateTravelCost={calculatorState.calculateTravelCost}
          formattedResults={calculatorState.formattedResults}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Operational Parameters
        </h2>
        <OperationalParameters
          currentLifeTime={calculatorState.currentLifeTime}
          setCurrentLifeTime={calculatorState.setCurrentLifeTime}
          scheuchLifeTime={calculatorState.scheuchLifeTime}
          setScheuchLifeTime={calculatorState.setScheuchLifeTime}
          currentDiffPressure={calculatorState.currentDiffPressure}
          setCurrentDiffPressure={calculatorState.setCurrentDiffPressure}
          scheuchDiffPressure={calculatorState.scheuchDiffPressure}
          setScheuchDiffPressure={calculatorState.setScheuchDiffPressure}
          currentAirConsumption={calculatorState.currentAirConsumption}
          setCurrentAirConsumption={calculatorState.setCurrentAirConsumption}
          scheuchAirConsumption={calculatorState.scheuchAirConsumption}
          setScheuchAirConsumption={calculatorState.setScheuchAirConsumption}
          currentMotorKW={calculatorState.currentMotorKW}
          setCurrentMotorKW={calculatorState.setCurrentMotorKW}
          scheuchMotorKW={calculatorState.scheuchMotorKW}
          setScheuchMotorKW={calculatorState.setScheuchMotorKW}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Savings Results
        </h2>
        <SavingsResults
          savingYears={calculatorState.savingYears}
          setSavingYears={calculatorState.setSavingYears}
          workingHours={calculatorState.workingHours}
          setWorkingHours={calculatorState.setWorkingHours}
          kwhCost={calculatorState.kwhCost}
          setKwhCost={calculatorState.setKwhCost}
          compressedAirCost={calculatorState.compressedAirCost}
          setCompressedAirCost={calculatorState.setCompressedAirCost}
          energyUnit={calculatorState.energyUnit}
          setEnergyUnit={calculatorState.setEnergyUnit}
          totalSavings={calculatorState.totalSavings}
          currentLifeTime={calculatorState.currentLifeTime}
          scheuchLifeTime={calculatorState.scheuchLifeTime}
          currentDiffPressure={calculatorState.currentDiffPressure}
          scheuchDiffPressure={calculatorState.scheuchDiffPressure}
          currentAirConsumption={calculatorState.currentAirConsumption}
          scheuchAirConsumption={calculatorState.scheuchAirConsumption}
          currentMotorKW={calculatorState.currentMotorKW}
          scheuchMotorKW={calculatorState.scheuchMotorKW}
          designType={calculatorState.designType}
          airVolumeM3h={calculatorState.airVolumeM3h}
          airVolumeACFM={calculatorState.airVolumeACFM}
          numEMCFlaps={calculatorState.numEMCFlaps}
          bagLength={calculatorState.bagLength}
          formattedResults={calculatorState.formattedResults}
          cagePrice={calculatorState.cagePrice}
        />
      </section>
    </div>
  );
};

export default FilterOpexCalculator;
