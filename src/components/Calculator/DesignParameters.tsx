
import React from 'react';
import { Button } from '@/components/ui/button';
import FilterDesignType from './DesignParametersComponents/FilterDesignType';
import FilterInputs from './DesignParametersComponents/FilterInputs';
import AdditionalParameters from './AdditionalParameters';
import FilterDimensions from './DesignParametersComponents/FilterDimensions';
import DesignParamsCard from './DesignParametersComponents/DesignParamsCard';

interface DesignParametersProps {
  designType: string;
  setDesignType: (value: string) => void;
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  bagLength: number;
  filterRowType: string;
  setFilterRowType: (value: string) => void;
  showDimensions: boolean;
  setShowDimensions: (value: boolean) => void;
  showOtherParams: boolean;
  setShowOtherParams: (value: boolean) => void;
  channelWidthMm: number;
  setChannelWidthMm: (value: number) => void;
  channelHeightMm: number;
  setChannelHeightMm: (value: number) => void;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
  setNumEMCFlaps: (value: number) => void;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
  formattedResults: any;
  results: any;
  m2ToSqFtFactor: number;
  conversionFactor: number;
  // Additional parameters
  gasTempC: number;
  gasTempF: number;
  dustConcGramAm3: number;
  dustConcGrainACF: number;
  handleGasTempCChange: (value: string) => void;
  handleGasTempFChange: (value: string) => void;
  handleDustConcGramAm3Change: (value: string) => void;
  handleDustConcGrainACFChange: (value: string) => void;
  dustConcGramNm3: number | null;
  dustConcGrainSCF: number | null;
  handleDustConcGramNm3Change: (value: string) => void;
  handleDustConcGrainSCFChange: (value: string) => void;
  // Outlet dust parameters
  outletDustKgH: number | null;
  outletDustLbH: number | null;
  handleOutletDustKgHChange: (value: string) => void;
  handleOutletDustLbHChange: (value: string) => void;
  estimateOutletDust: () => void;
  // Target emission parameters
  targetEmissionMgNm3: number | null;
  targetEmissionGrainDscf: number | null;
  handleTargetEmissionMgNm3Change: (value: string) => void;
  handleTargetEmissionGrainDscfChange: (value: string) => void;
}

const DesignParameters: React.FC<DesignParametersProps> = ({
  designType,
  setDesignType,
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  filterRowType,
  setFilterRowType,
  showDimensions,
  setShowDimensions,
  showOtherParams,
  setShowOtherParams,
  channelWidthMm,
  setChannelWidthMm,
  channelHeightMm,
  setChannelHeightMm,
  handleAirVolumeM3hChange,
  handleAirVolumeACFMChange,
  setNumEMCFlaps,
  setBagsPerRow,
  setBagLength,
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor,
  // Additional parameters
  gasTempC,
  gasTempF,
  dustConcGramAm3,
  dustConcGrainACF,
  dustConcGramNm3,
  dustConcGrainSCF,
  handleGasTempCChange,
  handleGasTempFChange,
  handleDustConcGramAm3Change,
  handleDustConcGrainACFChange,
  handleDustConcGramNm3Change,
  handleDustConcGrainSCFChange,
  // Outlet dust parameters
  outletDustKgH,
  outletDustLbH,
  handleOutletDustKgHChange,
  handleOutletDustLbHChange,
  estimateOutletDust,
  // Target emission parameters
  targetEmissionMgNm3,
  targetEmissionGrainDscf,
  handleTargetEmissionMgNm3Change,
  handleTargetEmissionGrainDscfChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <FilterDesignType 
          designType={designType} 
          setDesignType={setDesignType} 
        />
        
        <FilterInputs 
          airVolumeM3h={airVolumeM3h}
          airVolumeACFM={airVolumeACFM}
          numEMCFlaps={numEMCFlaps}
          bagsPerRow={bagsPerRow}
          bagLength={bagLength}
          designType={designType}
          handleAirVolumeM3hChange={handleAirVolumeM3hChange}
          handleAirVolumeACFMChange={handleAirVolumeACFMChange}
          setNumEMCFlaps={setNumEMCFlaps}
          setBagsPerRow={setBagsPerRow}
          setBagLength={setBagLength}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex-1">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowOtherParams(!showOtherParams)}
            >
              {showOtherParams ? 'Hide Other Parameters' : 'Show Other Filter Design Parameters'}
            </Button>
          </div>
          {designType === 'bolt-weld' && (
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowDimensions(!showDimensions)}
              >
                {showDimensions ? 'Hide Filter Dimensions / Footprint' : 'Show Filter Dimensions / Footprint'}
              </Button>
            </div>
          )}
        </div>
        
        {showOtherParams && (
          <AdditionalParameters 
            gasTempC={gasTempC}
            gasTempF={gasTempF}
            dustConcGramAm3={dustConcGramAm3}
            dustConcGrainACF={dustConcGrainACF}
            dustConcGramNm3={dustConcGramNm3}
            dustConcGrainSCF={dustConcGrainSCF}
            outletDustKgH={outletDustKgH}
            outletDustLbH={outletDustLbH}
            targetEmissionMgNm3={targetEmissionMgNm3}
            targetEmissionGrainDscf={targetEmissionGrainDscf}
            handleGasTempCChange={handleGasTempCChange}
            handleGasTempFChange={handleGasTempFChange}
            handleDustConcGramAm3Change={handleDustConcGramAm3Change}
            handleDustConcGrainACFChange={handleDustConcGrainACFChange}
            handleDustConcGramNm3Change={handleDustConcGramNm3Change}
            handleDustConcGrainSCFChange={handleDustConcGrainSCFChange}
            handleOutletDustKgHChange={handleOutletDustKgHChange}
            handleOutletDustLbHChange={handleOutletDustLbHChange}
            handleTargetEmissionMgNm3Change={handleTargetEmissionMgNm3Change}
            handleTargetEmissionGrainDscfChange={handleTargetEmissionGrainDscfChange}
            estimateOutletDust={estimateOutletDust}
          />
        )}
        
        {showDimensions && designType === 'bolt-weld' && (
          <FilterDimensions
            filterRowType={filterRowType}
            setFilterRowType={setFilterRowType}
            channelWidthMm={channelWidthMm}
            setChannelWidthMm={setChannelWidthMm}
            channelHeightMm={channelHeightMm}
            setChannelHeightMm={setChannelHeightMm}
            airVolumeM3h={airVolumeM3h}
            numEMCFlaps={numEMCFlaps}
            bagsPerRow={bagsPerRow}
          />
        )}
      </div>
      
      <DesignParamsCard 
        formattedResults={formattedResults}
        results={results}
        m2ToSqFtFactor={m2ToSqFtFactor}
        conversionFactor={conversionFactor}
      />
    </div>
  );
};

export default DesignParameters;
