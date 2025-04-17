
import React from 'react';
import FilterInputs from '../DesignParametersComponents/FilterInputs';

interface InputsSectionProps {
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number | string;
  bagsPerRow: number;
  bagLength: number;
  designType: string;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
  setNumEMCFlaps: (value: number | string) => void;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
}

const InputsSection: React.FC<InputsSectionProps> = (props) => {
  return (
    <FilterInputs 
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
  );
};

export default InputsSection;
