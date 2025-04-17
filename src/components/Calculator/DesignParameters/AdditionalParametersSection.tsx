
import React from 'react';
import AdditionalParameters from '../AdditionalParameters';

interface AdditionalParametersSectionProps {
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
  outletDustKgH: number | null;
  outletDustLbH: number | null;
  handleOutletDustKgHChange: (value: string) => void;
  handleOutletDustLbHChange: (value: string) => void;
  estimateOutletDust: () => void;
  targetEmissionMgNm3: number | null;
  targetEmissionGrainDscf: number | null;
  handleTargetEmissionMgNm3Change: (value: string) => void;
  handleTargetEmissionGrainDscfChange: (value: string) => void;
  negativePressureMbar: number | null;
  negativePressureInchWG: number | null;
  handleNegativePressureMbarChange: (value: string) => void;
  handleNegativePressureInchWGChange: (value: string) => void;
  airVolumeM3h: string;
  designType: string;
}

const AdditionalParametersSection: React.FC<AdditionalParametersSectionProps> = (props) => {
  return (
    <AdditionalParameters 
      gasTempC={props.gasTempC}
      gasTempF={props.gasTempF}
      dustConcGramAm3={props.dustConcGramAm3}
      dustConcGrainACF={props.dustConcGrainACF}
      dustConcGramNm3={props.dustConcGramNm3}
      dustConcGrainSCF={props.dustConcGrainSCF}
      outletDustKgH={props.outletDustKgH}
      outletDustLbH={props.outletDustLbH}
      targetEmissionMgNm3={props.targetEmissionMgNm3}
      targetEmissionGrainDscf={props.targetEmissionGrainDscf}
      negativePressureMbar={props.negativePressureMbar}
      negativePressureInchWG={props.negativePressureInchWG}
      handleGasTempCChange={props.handleGasTempCChange}
      handleGasTempFChange={props.handleGasTempFChange}
      handleDustConcGramAm3Change={props.handleDustConcGramAm3Change}
      handleDustConcGrainACFChange={props.handleDustConcGrainACFChange}
      handleDustConcGramNm3Change={props.handleDustConcGramNm3Change}
      handleDustConcGrainSCFChange={props.handleDustConcGrainSCFChange}
      handleOutletDustKgHChange={props.handleOutletDustKgHChange}
      handleOutletDustLbHChange={props.handleOutletDustLbHChange}
      handleTargetEmissionMgNm3Change={props.handleTargetEmissionMgNm3Change}
      handleTargetEmissionGrainDscfChange={props.handleTargetEmissionGrainDscfChange}
      handleNegativePressureMbarChange={props.handleNegativePressureMbarChange}
      handleNegativePressureInchWGChange={props.handleNegativePressureInchWGChange}
      estimateOutletDust={props.estimateOutletDust}
      airVolumeM3h={props.airVolumeM3h}
      designType={props.designType}
    />
  );
};

export default AdditionalParametersSection;
