
import { useState, useCallback, useEffect } from 'react';

export const useAirVolumeParameters = (conversionFactor: number) => {
  // Bolt-weld specific parameters with empty defaults for user input
  const [boltWeldAirVolume, setBoltWeldAirVolume] = useState('');
  const [boltWeldNumEMCFlaps, setBoltWeldNumEMCFlaps] = useState<number | string>('');
  const [boltWeldBagsPerRow, setBoltWeldBagsPerRow] = useState<number | null>(null);
  const [boltWeldBagLength, setBoltWeldBagLength] = useState<number | null>(null);
  
  // Modular specific parameters with empty defaults for user input
  const [modularAirVolume, setModularAirVolume] = useState('');
  const [modularNumEMCFlaps, setModularNumEMCFlaps] = useState<number | string>('');
  const [modularBagsPerRow, setModularBagsPerRow] = useState<number | null>(null);
  const [modularBagLength, setModularBagLength] = useState<number | null>(null);

  // Current active values (will be switched based on design type)
  const [airVolumeM3h, setAirVolumeM3h] = useState(boltWeldAirVolume);
  const [airVolumeACFM, setAirVolumeACFM] = useState('');
  const [numEMCFlaps, setNumEMCFlaps] = useState<number | string>(boltWeldNumEMCFlaps);
  const [bagsPerRow, setBagsPerRow] = useState<number | null>(boltWeldBagsPerRow);
  const [bagLength, setBagLength] = useState<number | null>(boltWeldBagLength);

  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);

  const handleAirVolumeM3hChange = useCallback((value: string) => {
    if (isACFMUpdating) return; // Prevent feedback loop
    
    setAirVolumeM3h(value);
    setIsM3hUpdating(true);
    
    const acfmValue = value ? (parseFloat(value || '0') * conversionFactor).toFixed(0) : '';
    setAirVolumeACFM(acfmValue);
    
    // Use a shorter timeout to reduce delay
    setTimeout(() => setIsM3hUpdating(false), 50);
  }, [isACFMUpdating, conversionFactor]);

  const handleAirVolumeACFMChange = useCallback((value: string) => {
    if (isM3hUpdating) return; // Prevent feedback loop
    
    setAirVolumeACFM(value);
    setIsACFMUpdating(true);
    
    const m3hValue = value ? (parseFloat(value || '0') / conversionFactor).toFixed(0) : '';
    setAirVolumeM3h(m3hValue);
    
    // Use a shorter timeout to reduce delay
    setTimeout(() => setIsACFMUpdating(false), 50);
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
