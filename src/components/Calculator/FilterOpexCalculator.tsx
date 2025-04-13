
import React from 'react';
import CalculatorSection from './CalculatorSection';
import Transition from '../UI/Transition';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';

const FilterOpexCalculator = () => {
  const calculatorState = useCalculatorState();
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <Transition animation="slide-in-left" delay={100}>
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Filter OPEX Savings Calculator</h1>
        </Transition>
        <Transition animation="slide-in-right" delay={300}>
          <p className="text-gray-600 max-w-xl mx-auto"></p>
        </Transition>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Design Type Selection */}
        <CalculatorSection 
          title="Filter Design Configuration" 
          delay={100}
          className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-100"
        >
          <DesignParameters 
            designType={calculatorState.designType}
            setDesignType={calculatorState.setDesignType}
            airVolumeM3h={calculatorState.airVolumeM3h}
            airVolumeACFM={calculatorState.airVolumeACFM}
            numEMCFlaps={calculatorState.numEMCFlaps}
            bagsPerRow={calculatorState.bagsPerRow}
            bagLength={calculatorState.bagLength}
            filterRowType={calculatorState.filterRowType}
            setFilterRowType={calculatorState.setFilterRowType}
            showDimensions={calculatorState.showDimensions}
            setShowDimensions={calculatorState.setShowDimensions}
            showOtherParams={calculatorState.showOtherParams}
            setShowOtherParams={calculatorState.setShowOtherParams}
            channelWidthMm={calculatorState.channelWidthMm}
            setChannelWidthMm={calculatorState.setChannelWidthMm}
            channelHeightMm={calculatorState.channelHeightMm}
            setChannelHeightMm={calculatorState.setChannelHeightMm}
            handleAirVolumeM3hChange={calculatorState.handleAirVolumeM3hChange}
            handleAirVolumeACFMChange={calculatorState.handleAirVolumeACFMChange}
            setNumEMCFlaps={calculatorState.setNumEMCFlaps}
            setBagsPerRow={calculatorState.setBagsPerRow}
            setBagLength={calculatorState.setBagLength}
            formattedResults={calculatorState.formattedResults}
            results={calculatorState.results}
            m2ToSqFtFactor={calculatorState.m2ToSqFtFactor}
            conversionFactor={calculatorState.conversionFactor}
            gasTempC={calculatorState.gasTempC}
            gasTempF={calculatorState.gasTempF}
            dustConcGramAm3={calculatorState.dustConcGramAm3}
            dustConcGrainACF={calculatorState.dustConcGrainACF}
            dustConcGramNm3={calculatorState.dustConcGramNm3}
            dustConcGrainSCF={calculatorState.dustConcGrainSCF}
            handleGasTempCChange={calculatorState.handleGasTempCChange}
            handleGasTempFChange={calculatorState.handleGasTempFChange}
            handleDustConcGramAm3Change={calculatorState.handleDustConcGramAm3Change}
            handleDustConcGrainACFChange={calculatorState.handleDustConcGrainACFChange}
            handleDustConcGramNm3Change={calculatorState.handleDustConcGramNm3Change}
            handleDustConcGrainSCFChange={calculatorState.handleDustConcGrainSCFChange}
            outletDustKgH={calculatorState.outletDustKgH}
            outletDustLbH={calculatorState.outletDustLbH}
            handleOutletDustKgHChange={calculatorState.handleOutletDustKgHChange}
            handleOutletDustLbHChange={calculatorState.handleOutletDustLbHChange}
            estimateOutletDust={calculatorState.estimateOutletDust}
            targetEmissionMgNm3={calculatorState.targetEmissionMgNm3}
            targetEmissionGrainDscf={calculatorState.targetEmissionGrainDscf}
            handleTargetEmissionMgNm3Change={calculatorState.handleTargetEmissionMgNm3Change}
            handleTargetEmissionGrainDscfChange={calculatorState.handleTargetEmissionGrainDscfChange}
            negativePressureMbar={calculatorState.negativePressureMbar}
            negativePressureInchWG={calculatorState.negativePressureInchWG}
            handleNegativePressureMbarChange={calculatorState.handleNegativePressureMbarChange}
            handleNegativePressureInchWGChange={calculatorState.handleNegativePressureInchWGChange}
          />
        </CalculatorSection>
        
        {/* Filter Bag Replacement Section - Make always visible */}
        <CalculatorSection 
          title="Filter Bag Replacement" 
          delay={300}
          className="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        >
          <FilterBagReplacement 
            bagPrice={calculatorState.bagPrice}
            setBagPrice={calculatorState.setBagPrice}
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
            calculateTravelCost={() => {
              if (calculatorState.results.daysToReplace > 0) {
                calculatorState.calculateTravelCost(calculatorState.results.daysToReplace);
              }
            }}
            formattedResults={calculatorState.formattedResults}
          />
        </CalculatorSection>
        
        {/* Operational Parameters Section */}
        <CalculatorSection 
          title="Operational Parameters" 
          delay={500}
          className="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        >
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
            bagQuality={calculatorState.bagQuality}
            setBagQuality={calculatorState.setBagQuality}
            cleaningPressure={calculatorState.cleaningPressure}
            setCleaningPressure={calculatorState.setCleaningPressure}
            minPulseInterval={calculatorState.minPulseInterval}
            setMinPulseInterval={calculatorState.setMinPulseInterval}
            avgPulseInterval={calculatorState.avgPulseInterval}
            setAvgPulseInterval={calculatorState.setAvgPulseInterval}
            numEMCFlaps={typeof calculatorState.numEMCFlaps === 'string' ? 
              (calculatorState.numEMCFlaps === '' ? 0 : parseInt(calculatorState.numEMCFlaps)) : 
              calculatorState.numEMCFlaps}
            workingHours={calculatorState.workingHours}
          />
        </CalculatorSection>
        
        {/* Results Section */}
        <CalculatorSection 
          title="OPEX Savings Analysis" 
          delay={700}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        >
          <SavingsResults 
            savingYears={calculatorState.savingYears}
            setSavingYears={calculatorState.setSavingYears}
            workingHours={calculatorState.workingHours}
            setWorkingHours={calculatorState.setWorkingHours}
            kwhCost={calculatorState.kwhCost}
            setKwhCost={calculatorState.setKwhCost}
            compressedAirCost={calculatorState.compressedAirCost}
            setCompressedAirCost={calculatorState.setCompressedAirCost}
            totalSavings={calculatorState.totalSavings}
            currentLifeTime={calculatorState.currentLifeTime}
            scheuchLifeTime={calculatorState.scheuchLifeTime}
            currentDiffPressure={calculatorState.currentDiffPressure}
            scheuchDiffPressure={calculatorState.scheuchDiffPressure}
            currentAirConsumption={calculatorState.currentAirConsumption}
            scheuchAirConsumption={calculatorState.scheuchAirConsumption}
            currentMotorKW={calculatorState.currentMotorKW}
            scheuchMotorKW={calculatorState.scheuchMotorKW}
          />
        </CalculatorSection>
      </div>
    </div>
  );
};

export default FilterOpexCalculator;

