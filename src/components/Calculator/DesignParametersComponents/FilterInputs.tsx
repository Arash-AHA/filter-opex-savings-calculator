
import React, { useEffect, useState } from 'react';
import { suggestEMCFlaps } from '../hooks/utils/calculationUtils';
import AirVolumeInputs from './AirVolumeInputs';
import EMCFlapsInput from './EMCFlapsInput';
import BagsConfig from './BagsConfig';

interface FilterInputsProps {
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

const FilterInputs: React.FC<FilterInputsProps> = ({
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  designType,
  handleAirVolumeM3hChange,
  handleAirVolumeACFMChange,
  setNumEMCFlaps,
  setBagsPerRow,
  setBagLength
}) => {
  const [suggestedFlaps, setSuggestedFlaps] = useState<number | null>(null);
  
  useEffect(() => {
    let suggested = suggestEMCFlaps(
      designType,
      bagLength,
      bagsPerRow,
      airVolumeM3h,
      airVolumeACFM
    );

    if (designType === 'modular' && suggested) {
      const remainder = suggested % 3;
      if (remainder !== 0) {
        suggested = suggested + (3 - remainder);
      }
      
      const areaPerFlap = bagLength * bagsPerRow * 5 * 1.6;
      const totalArea = areaPerFlap * suggested;
      const airVolume = parseFloat(airVolumeACFM) || 0;
      const acRatio = totalArea > 0 ? airVolume / totalArea : 0;
      
      if (acRatio > 3.2) {
        suggested += 3;
      }
    }
    
    setSuggestedFlaps(suggested);
  }, [designType, bagLength, bagsPerRow, airVolumeM3h, airVolumeACFM]);
  
  const calculateAcRatio = () => {
    if (designType === 'bolt-weld') {
      const areaPerFlap = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow;
      const totalArea = areaPerFlap * (typeof numEMCFlaps === 'string' ? 
                                       (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : 
                                       numEMCFlaps);
      
      const airVolume = parseFloat(airVolumeM3h) || 0;
      return totalArea > 0 ? (airVolume / 60) / totalArea : 0;
    } else {
      const numEMCFlapsValue = typeof numEMCFlaps === 'string' ? 
                               (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : 
                               numEMCFlaps;
      const totalArea = bagLength * bagsPerRow * numEMCFlapsValue * 5 * 1.6;
      
      const airVolume = parseFloat(airVolumeACFM) || 0;
      return totalArea > 0 ? airVolume / totalArea : 0;
    }
  };

  const currentAcRatio = calculateAcRatio();
  
  return (
    <>
      <AirVolumeInputs
        airVolumeM3h={airVolumeM3h}
        airVolumeACFM={airVolumeACFM}
        handleAirVolumeM3hChange={handleAirVolumeM3hChange}
        handleAirVolumeACFMChange={handleAirVolumeACFMChange}
      />
      
      <EMCFlapsInput
        numEMCFlaps={numEMCFlaps}
        setNumEMCFlaps={setNumEMCFlaps}
        suggestedFlaps={suggestedFlaps}
        designType={designType}
        airVolumeM3h={airVolumeM3h}
        airVolumeACFM={airVolumeACFM}
        bagsPerRow={bagsPerRow}
        bagLength={bagLength}
        currentAcRatio={currentAcRatio}
      />
      
      <BagsConfig
        bagsPerRow={bagsPerRow}
        bagLength={bagLength}
        designType={designType}
        setBagsPerRow={setBagsPerRow}
        setBagLength={setBagLength}
      />
    </>
  );
};

export default FilterInputs;
