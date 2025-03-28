import { useState, useCallback } from 'react';

export const useDesignParameters = () => {
  // Constants
  const conversionFactor = 0.588774; // 1 m³/h = 0.588774 ACFM
  const emcCleaningFactor = 0.85; // 85% of total area is available for filtration during EMC cleaning
  const m2ToSqFtFactor = 10.7639; // 1 m² = 10.7639 sq ft
  
  // State for input values
  const [designType, setDesignType] = useState('bolt-weld');
  const [airVolumeM3h, setAirVolumeM3h] = useState('');
  const [airVolumeACFM, setAirVolumeACFM] = useState('');
  const [numEMCFlaps, setNumEMCFlaps] = useState(20);
  const [bagsPerRow, setBagsPerRow] = useState(18);
  const [bagLength, setBagLength] = useState(10);
  
  // New state for dimensions
  const [showDimensions, setShowDimensions] = useState(false);
  const [channelWidth, setChannelWidth] = useState(3.150); // Convert mm to m (3150 mm = 3.150 m)
  const [channelHeight, setChannelHeight] = useState(3.000); // Convert mm to m (3000 mm = 3.000 m)
  
  // Flags to prevent infinite loops in unit conversion
  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);
  
  // Handle air volume unit conversion
  const handleAirVolumeM3hChange = useCallback((value) => {
    setAirVolumeM3h(value);
    if (!isACFMUpdating && value) {
      setIsM3hUpdating(true);
      setAirVolumeACFM((parseFloat(value) * conversionFactor).toFixed(0));
      setTimeout(() => setIsM3hUpdating(false), 100);
    }
  }, [isACFMUpdating, conversionFactor]);
  
  const handleAirVolumeACFMChange = useCallback((value) => {
    setAirVolumeACFM(value);
    if (!isM3hUpdating && value) {
      setIsACFMUpdating(true);
      setAirVolumeM3h((parseFloat(value) / conversionFactor).toFixed(0));
      setTimeout(() => setIsACFMUpdating(false), 100);
    }
  }, [isM3hUpdating, conversionFactor]);
  
  return {
    designType,
    setDesignType,
    airVolumeM3h,
    airVolumeACFM,
    numEMCFlaps,
    bagsPerRow,
    bagLength,
    showDimensions,
    setShowDimensions,
    channelWidth,
    setChannelWidth,
    channelHeight,
    setChannelHeight,
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange,
    setNumEMCFlaps,
    setBagsPerRow,
    setBagLength,
    m2ToSqFtFactor,
    conversionFactor,
    emcCleaningFactor
  };
};
