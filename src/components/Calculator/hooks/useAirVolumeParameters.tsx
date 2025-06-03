
import { useState, useCallback } from 'react';

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

  // Track which field is being actively edited to prevent conversion loops
  const [activeField, setActiveField] = useState<'m3h' | 'acfm' | null>(null);

  const handleAirVolumeM3hChange = useCallback((value: string) => {
    console.log('M3h change called with:', value, 'activeField:', activeField);
    
    // Always update the M3h field
    setAirVolumeM3h(value);
    
    // Only convert to ACFM if we're actively editing M3h field or no field is active
    if (activeField !== 'acfm') {
      setActiveField('m3h');
      const acfmValue = value ? (parseFloat(value || '0') * conversionFactor).toFixed(0) : '';
      setAirVolumeACFM(acfmValue);
      
      // Clear active field after a brief delay
      setTimeout(() => setActiveField(null), 100);
    }
  }, [activeField, conversionFactor]);

  const handleAirVolumeACFMChange = useCallback((value: string) => {
    console.log('ACFM change called with:', value, 'activeField:', activeField);
    
    // Always update the ACFM field
    setAirVolumeACFM(value);
    
    // Only convert to M3h if we're actively editing ACFM field or no field is active
    if (activeField !== 'm3h') {
      setActiveField('acfm');
      const m3hValue = value ? (parseFloat(value || '0') / conversionFactor).toFixed(0) : '';
      setAirVolumeM3h(m3hValue);
      
      // Clear active field after a brief delay
      setTimeout(() => setActiveField(null), 100);
    }
  }, [activeField, conversionFactor]);

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
