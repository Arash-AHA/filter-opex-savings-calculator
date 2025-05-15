
import { useState, useCallback } from 'react';

export const useAirVolumeParameters = (conversionFactor: number) => {
  // Bolt-weld specific parameters
  const [boltWeldAirVolume, setBoltWeldAirVolume] = useState('375000');
  const [boltWeldNumEMCFlaps, setBoltWeldNumEMCFlaps] = useState<number | string>(14);
  const [boltWeldBagsPerRow, setBoltWeldBagsPerRow] = useState(18);
  const [boltWeldBagLength, setBoltWeldBagLength] = useState(10);
  
  // Modular specific parameters
  // Set modularAirVolume internally in m³/h so that airVolumeACFM = 221000 at conversion factor 0.588774
  const [modularAirVolume, setModularAirVolume] = useState('375000');
  // Set modularNumEMCFlaps to 24 as requested
  const [modularNumEMCFlaps, setModularNumEMCFlaps] = useState<number | string>(24);
  const [modularBagsPerRow, setModularBagsPerRow] = useState(15);
  const [modularBagLength, setModularBagLength] = useState(24);

  // Current values based on design type
  const [airVolumeM3h, setAirVolumeM3h] = useState(boltWeldAirVolume);
  const [airVolumeACFM, setAirVolumeACFM] = useState((parseFloat(boltWeldAirVolume) * conversionFactor).toFixed(0));
  const [numEMCFlaps, setNumEMCFlaps] = useState<number | string>(boltWeldNumEMCFlaps);
  const [bagsPerRow, setBagsPerRow] = useState(boltWeldBagsPerRow);
  const [bagLength, setBagLength] = useState(boltWeldBagLength);

  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);

  const handleAirVolumeM3hChange = useCallback((value: string) => {
    setAirVolumeM3h(value);
    if (!isACFMUpdating && value) {
      setIsM3hUpdating(true);
      const acfmValue = (parseFloat(value) * conversionFactor).toFixed(0);
      setAirVolumeACFM(acfmValue);
      setTimeout(() => setIsM3hUpdating(false), 100);
    }
  }, [isACFMUpdating, conversionFactor]);

  const handleAirVolumeACFMChange = useCallback((value: string) => {
    setAirVolumeACFM(value);
    if (!isM3hUpdating && value) {
      setIsACFMUpdating(true);
      const m3hValue = (parseFloat(value) / conversionFactor).toFixed(0);
      setAirVolumeM3h(m3hValue);
      setTimeout(() => setIsACFMUpdating(false), 100);
    }
  }, [isM3hUpdating, conversionFactor]);

  return {
    boltWeldAirVolume,
    setBoltWeldAirVolume,
    boltWeldNumEMCFlaps,
    setBoltWeldNumEMCFlaps,
    boltWeldBagsPerRow,
    setBoltWeldBagsPerRow,
    boltWeldBagLength,
    setBoltWeldBagLength,
    modularAirVolume,
    setModularAirVolume,
    modularNumEMCFlaps,
    setModularNumEMCFlaps,
    modularBagsPerRow,
    setModularBagsPerRow,
    modularBagLength,
    setModularBagLength,
    airVolumeM3h,
    setAirVolumeM3h,
    airVolumeACFM,
    setAirVolumeACFM,
    numEMCFlaps,
    setNumEMCFlaps,
    bagsPerRow,
    setBagsPerRow,
    bagLength,
    setBagLength,
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange
  };
};

