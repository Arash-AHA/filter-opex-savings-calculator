
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
  // Ensure default values if empty
  const airVolumeM3h = props.airVolumeM3h || '375000';
  const airVolumeACFM = props.airVolumeACFM || '221000';

  return (
    <FilterInputs 
      airVolumeM3h={airVolumeM3h}
      airVolumeACFM={airVolumeACFM}
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
