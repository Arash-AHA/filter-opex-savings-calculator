
import { useState, useCallback } from 'react';

export const useAirVolumeParameters = (conversionFactor: number) => {
  // Bolt-weld specific parameters
  const [boltWeldAirVolume, setBoltWeldAirVolume] = useState('');
  const [boltWeldNumEMCFlaps, setBoltWeldNumEMCFlaps] = useState<number | string>('');
  const [boltWeldBagsPerRow, setBoltWeldBagsPerRow] = useState(18);
  const [boltWeldBagLength, setBoltWeldBagLength] = useState(10);
  
  // Modular specific parameters
  const [modularAirVolume, setModularAirVolume] = useState('');
  const [modularNumEMCFlaps, setModularNumEMCFlaps] = useState<number | string>('');
  const [modularBagsPerRow, setModularBagsPerRow] = useState(15);
  const [modularBagLength, setModularBagLength] = useState(24);

  // Current values based on design type
  const [airVolumeM3h, setAirVolumeM3h] = useState(boltWeldAirVolume);
  const [airVolumeACFM, setAirVolumeACFM] = useState('');
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
    } else if (!value) {
      setAirVolumeACFM('');
    }
  }, [isACFMUpdating, conversionFactor]);

  const handleAirVolumeACFMChange = useCallback((value: string) => {
    setAirVolumeACFM(value);
    if (!isM3hUpdating && value) {
      setIsACFMUpdating(true);
      const m3hValue = (parseFloat(value) / conversionFactor).toFixed(0);
      setAirVolumeM3h(m3hValue);
      setTimeout(() => setIsACFMUpdating(false), 100);
    } else if (!value) {
      setAirVolumeM3h('');
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
