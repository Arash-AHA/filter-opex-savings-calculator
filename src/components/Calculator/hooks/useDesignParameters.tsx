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
      // Set current values to bolt-weld specific values
      airVolumeState.setAirVolumeM3h(airVolumeState.boltWeldAirVolume);
      airVolumeState.setAirVolumeACFM((parseFloat(airVolumeState.boltWeldAirVolume) * conversionFactor).toFixed(0));
      airVolumeState.setNumEMCFlaps(airVolumeState.boltWeldNumEMCFlaps);
      airVolumeState.setBagsPerRow(airVolumeState.boltWeldBagsPerRow);
      airVolumeState.setBagLength(airVolumeState.boltWeldBagLength);
    } else {
      // For modular design, use stored modular values but don't apply defaults
      // If modular values are empty, keep them empty
      if (airVolumeState.modularAirVolume) {
        airVolumeState.setAirVolumeM3h(airVolumeState.modularAirVolume);
        airVolumeState.setAirVolumeACFM((parseFloat(airVolumeState.modularAirVolume) * conversionFactor).toFixed(0));
      } else {
        // Clear the values if no stored modular values
        airVolumeState.setAirVolumeM3h('');
        airVolumeState.setAirVolumeACFM('');
      }
      
      // Only set values if they exist, otherwise leave them empty for user input
      airVolumeState.setNumEMCFlaps(airVolumeState.modularNumEMCFlaps || '');
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

  // Handle air volume changes and update the design-specific values
  const handleAirVolumeM3hChange = useCallback((value: string) => {
    airVolumeState.handleAirVolumeM3hChange(value);
    
    // Also update the design-specific value
    if (designTypeState.designType === 'bolt-weld') {
      airVolumeState.setBoltWeldAirVolume(value);
    } else {
      airVolumeState.setModularAirVolume(value);
    }
  }, [designTypeState.designType, airVolumeState]);

  const handleAirVolumeACFMChange = useCallback((value: string) => {
    airVolumeState.handleAirVolumeACFMChange(value);
    
    // The M3h value will be updated by the handler, so we need to update the design-specific value
    if (designTypeState.designType === 'bolt-weld') {
      // The M3h value is calculated in the handler, so we need to wait for the next tick
      setTimeout(() => {
        airVolumeState.setBoltWeldAirVolume(airVolumeState.airVolumeM3h);
      }, 150);
    } else {
      setTimeout(() => {
        airVolumeState.setModularAirVolume(airVolumeState.airVolumeM3h);
      }, 150);
    }
  }, [designTypeState.designType, airVolumeState]);

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
      // For modular, store exactly what user entered
      airVolumeState.setModularNumEMCFlaps(value);
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
    
    // Override handlers to update design-specific values
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange,
  };
};
