
import { useCallback, useEffect } from 'react';
import { useDesignType } from './useDesignType';
import { useAirVolumeParameters } from './useAirVolumeParameters';
import { useProcessParameters } from './useProcessParameters';

export const useDesignParameters = () => {
  // Constants
  const conversionFactor = 0.588774;
  const emcCleaningFactor = 0.85;
  const m2ToSqFtFactor = 10.7639;

  // Use the split hooks
  const designTypeState = useDesignType();
  const airVolumeState = useAirVolumeParameters(conversionFactor);
  const processState = useProcessParameters();

  // Update current values when design type changes
  useEffect(() => {
    if (designTypeState.designType === 'bolt-weld') {
      // Only update if boltWeldAirVolume is not empty
      if (airVolumeState.boltWeldAirVolume) {
        airVolumeState.setAirVolumeM3h(airVolumeState.boltWeldAirVolume);
        airVolumeState.setAirVolumeACFM((parseFloat(airVolumeState.boltWeldAirVolume) * conversionFactor).toFixed(0));
      }
      
      // Update EMC flaps and other parameters
      airVolumeState.setNumEMCFlaps(airVolumeState.boltWeldNumEMCFlaps);
      airVolumeState.setBagsPerRow(airVolumeState.boltWeldBagsPerRow);
      airVolumeState.setBagLength(airVolumeState.boltWeldBagLength);
    } else {
      // Only update if modularAirVolume is not empty
      if (airVolumeState.modularAirVolume) {
        airVolumeState.setAirVolumeM3h(airVolumeState.modularAirVolume);
        airVolumeState.setAirVolumeACFM((parseFloat(airVolumeState.modularAirVolume) * conversionFactor).toFixed(0));
      }
      
      // Update EMC flaps and other parameters
      airVolumeState.setNumEMCFlaps(airVolumeState.modularNumEMCFlaps);
      airVolumeState.setBagsPerRow(airVolumeState.modularBagsPerRow);
      airVolumeState.setBagLength(airVolumeState.modularBagLength);
    }
  }, [
    designTypeState.designType,
    airVolumeState.boltWeldAirVolume,
    airVolumeState.modularAirVolume,
    airVolumeState.boltWeldNumEMCFlaps,
    airVolumeState.modularNumEMCFlaps,
    airVolumeState.boltWeldBagsPerRow,
    airVolumeState.modularBagsPerRow,
    airVolumeState.boltWeldBagLength,
    airVolumeState.modularBagLength,
    conversionFactor
  ]);

  // Estimate outlet dust calculation
  const estimateOutletDust = useCallback(() => {
    if (processState.dustConcGramAm3 && airVolumeState.airVolumeM3h) {
      const estimatedOutletKgH = (processState.dustConcGramAm3 / 1000) * parseFloat(airVolumeState.airVolumeM3h);
      processState.handleOutletDustKgHChange(estimatedOutletKgH.toFixed(3));
    }
  }, [processState.dustConcGramAm3, airVolumeState.airVolumeM3h, processState.handleOutletDustKgHChange]);

  // Handle EMC Flaps changes
  const setDesignSpecificNumEMCFlaps = useCallback((value: number | string) => {
    airVolumeState.setNumEMCFlaps(value);
    if (designTypeState.designType === 'bolt-weld') {
      airVolumeState.setBoltWeldNumEMCFlaps(value);
    } else {
      airVolumeState.setModularNumEMCFlaps(value);
    }
    
    // Store the current air volume values based on design type when changing EMC flaps
    if (designTypeState.designType === 'bolt-weld' && airVolumeState.airVolumeM3h) {
      airVolumeState.setBoltWeldAirVolume(airVolumeState.airVolumeM3h);
    } else if (designTypeState.designType === 'modular' && airVolumeState.airVolumeM3h) {
      airVolumeState.setModularAirVolume(airVolumeState.airVolumeM3h);
    }
  }, [designTypeState.designType, airVolumeState]);
  
  // Handle Bags Per Row changes
  const setDesignSpecificBagsPerRow = useCallback((value: number) => {
    airVolumeState.setBagsPerRow(value);
    if (designTypeState.designType === 'bolt-weld') {
      airVolumeState.setBoltWeldBagsPerRow(value);
    } else {
      airVolumeState.setModularBagsPerRow(value);
    }
  }, [designTypeState.designType, airVolumeState]);
  
  // Handle Bag Length changes
  const setDesignSpecificBagLength = useCallback((value: number) => {
    airVolumeState.setBagLength(value);
    if (designTypeState.designType === 'bolt-weld') {
      airVolumeState.setBoltWeldBagLength(value);
    } else {
      airVolumeState.setModularBagLength(value);
    }
  }, [designTypeState.designType, airVolumeState]);

  return {
    // Constants
    conversionFactor,
    emcCleaningFactor,
    m2ToSqFtFactor,
    
    // Design type state
    ...designTypeState,
    
    // Air volume and EMC parameters
    ...airVolumeState,
    
    // Process parameters
    ...processState,
    
    // Functions
    estimateOutletDust,
    setNumEMCFlaps: setDesignSpecificNumEMCFlaps,
    setBagsPerRow: setDesignSpecificBagsPerRow,
    setBagLength: setDesignSpecificBagLength,
  };
};
