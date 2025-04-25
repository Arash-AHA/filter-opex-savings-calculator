
import React from 'react';
import CalculatorSection from '../Calculator/CalculatorSection';
import Transition from '../UI/Transition';
import DesignParameters from '../Calculator/DesignParameters';
import { useBaghouseDesignState } from './hooks/useBaghouseDesignState';

const BaghouseDesignCalculator: React.FC = () => {
  const calculatorState = useBaghouseDesignState();
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <Transition animation="slide-in-left" delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
            <h1 className="text-3xl font-medium text-gray-900">Baghouse Design Calculator</h1>
          </div>
        </Transition>
        <Transition animation="slide-in-right" delay={300}>
          <p className="text-sm text-gray-500 italic mt-2">
            By Arash Haghi, Scheuch North America
          </p>
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
      </div>

      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Baghouse Design Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BaghouseDesignCalculator;
