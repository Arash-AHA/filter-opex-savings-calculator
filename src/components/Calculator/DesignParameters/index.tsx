
import React from 'react';
import DesignTypeSection from './DesignTypeSection';
import InputsSection from './InputsSection';
import ActionButtons from './ActionButtons';
import AdditionalParametersSection from './AdditionalParametersSection';
import DimensionsSection from './DimensionsSection';
import DesignParamsCard from '../DesignParametersComponents/DesignParamsCard';

interface DesignParametersProps {
  designType: string;
  setDesignType: (value: string) => void;
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number | string;
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
  setNumEMCFlaps: (value: number | string) => void;
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
  dustConcGramNm3: number | null;
  dustConcGrainSCF: number | null;
  handleGasTempCChange: (value: string) => void;
  handleGasTempFChange: (value: string) => void;
  handleDustConcGramAm3Change: (value: string) => void;
  handleDustConcGrainACFChange: (value: string) => void;
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
  // Negative pressure parameters
  negativePressureMbar: number | null;
  negativePressureInchWG: number | null;
  handleNegativePressureMbarChange: (value: string) => void;
  handleNegativePressureInchWGChange: (value: string) => void;
  eraseInputs?: () => void;
}

const DesignParameters: React.FC<DesignParametersProps> = (props) => {
  // Parse numEMCFlaps to a number when needed for functions expecting a number
  const parsedNumEMCFlaps = typeof props.numEMCFlaps === 'string' 
    ? (props.numEMCFlaps === '' ? 0 : parseInt(props.numEMCFlaps))
    : props.numEMCFlaps;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <DesignTypeSection 
          designType={props.designType} 
          setDesignType={props.setDesignType} 
        />
        
        <InputsSection 
          airVolumeM3h={props.airVolumeM3h}
          airVolumeACFM={props.airVolumeACFM}
          numEMCFlaps={props.numEMCFlaps}
          bagsPerRow={props.bagsPerRow}
          bagLength={props.bagLength}
          designType={props.designType}
          handleAirVolumeM3hChange={props.handleAirVolumeM3hChange}
          handleAirVolumeACFMChange={props.handleAirVolumeACFMChange}
          setNumEMCFlaps={props.setNumEMCFlaps}
          setBagsPerRow={props.setBagsPerRow}
          setBagLength={props.setBagLength}
        />
        
        <ActionButtons 
          showOtherParams={props.showOtherParams}
          setShowOtherParams={props.setShowOtherParams}
          showDimensions={props.showDimensions}
          setShowDimensions={props.setShowDimensions}
        />
        
        {props.showOtherParams && (
          <AdditionalParametersSection 
            {...props}
          />
        )}
        
        {props.showDimensions && (
          <DimensionsSection
            filterRowType={props.filterRowType}
            setFilterRowType={props.setFilterRowType}
            channelWidthMm={props.channelWidthMm}
            setChannelWidthMm={props.setChannelWidthMm}
            channelHeightMm={props.channelHeightMm}
            setChannelHeightMm={props.setChannelHeightMm}
            airVolumeM3h={props.airVolumeM3h}
            numEMCFlaps={parsedNumEMCFlaps}
            bagsPerRow={props.bagsPerRow}
            designType={props.designType}
          />
        )}
      </div>
      
      <DesignParamsCard 
        formattedResults={props.formattedResults}
        results={props.results}
        m2ToSqFtFactor={props.m2ToSqFtFactor}
        conversionFactor={props.conversionFactor}
        designType={props.designType}
        numEMCFlaps={props.numEMCFlaps}
        bagsPerRow={props.bagsPerRow}
        bagLength={props.bagLength}
        airVolumeM3h={props.airVolumeM3h}
        airVolumeACFM={props.airVolumeACFM}
        onEraseInputs={props.eraseInputs}
      />
    </div>
  );
};

export default DesignParameters;
