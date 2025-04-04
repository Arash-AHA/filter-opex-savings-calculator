
import { useState, useCallback, useEffect } from 'react';

export const useDesignParameters = () => {
  // Constants
  const conversionFactor = 0.588774; // 1 m³/h = 0.588774 ACFM
  const emcCleaningFactor = 0.85; // 85% of total area is available for filtration during EMC cleaning
  const m2ToSqFtFactor = 10.7639; // 1 m² = 10.7639 sq ft
  
  // State for input values
  const [designType, setDesignType] = useState('bolt-weld');
  const [airVolumeM3h, setAirVolumeM3h] = useState('375000'); // Updated default value
  const [airVolumeACFM, setAirVolumeACFM] = useState((375000 * 0.588774).toFixed(0)); // Converted default value
  const [numEMCFlaps, setNumEMCFlaps] = useState(14);
  const [bagsPerRow, setBagsPerRow] = useState(18);
  const [bagLength, setBagLength] = useState(10);
  const [filterRowType, setFilterRowType] = useState('single'); // This won't affect gas velocity calculation now
  
  // New state for dimensions - storing in mm directly now
  const [showDimensions, setShowDimensions] = useState(false);
  const [showOtherParams, setShowOtherParams] = useState(false);
  const [channelWidthMm, setChannelWidthMm] = useState(3150); // width in mm
  const [channelHeightMm, setChannelHeightMm] = useState(3000); // height in mm
  
  // New state for gas temperature and dust concentration
  const [gasTempC, setGasTempC] = useState(150);
  const [gasTempF, setGasTempF] = useState(302); // 150°C = 302°F
  const [dustConcGramAm3, setDustConcGramAm3] = useState(10);
  const [dustConcGrainACF, setDustConcGrainACF] = useState(4.37); // Conversion factor
  const [dustConcGramNm3, setDustConcGramNm3] = useState(20);
  const [dustConcGrainSCF, setDustConcGrainSCF] = useState(8.74); // Conversion factor
  
  // Flags to prevent infinite loops in unit conversion
  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);
  const [isCUpdating, setIsCUpdating] = useState(false);
  const [isFUpdating, setIsFUpdating] = useState(false);
  const [isGramAm3Updating, setIsGramAm3Updating] = useState(false);
  const [isGrainACFUpdating, setIsGrainACFUpdating] = useState(false);
  const [isGramNm3Updating, setIsGramNm3Updating] = useState(false);
  const [isGrainSCFUpdating, setIsGrainSCFUpdating] = useState(false);

  // Only hide dimensions if modular design is selected
  useEffect(() => {
    if (designType === 'modular') {
      setShowDimensions(false);
    }
  }, [designType]);
  
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
  
  // Handle temperature unit conversion
  const handleGasTempCChange = useCallback((value: string) => {
    const tempC = parseFloat(value);
    setGasTempC(isNaN(tempC) ? 0 : tempC);
    if (!isFUpdating && !isNaN(tempC)) {
      setIsCUpdating(true);
      // Convert Celsius to Fahrenheit: (°C × 9/5) + 32 = °F
      const tempF = (tempC * 9/5) + 32;
      setGasTempF(isNaN(tempF) ? 0 : tempF);
      setTimeout(() => setIsCUpdating(false), 100);
    }
  }, [isFUpdating]);
  
  const handleGasTempFChange = useCallback((value: string) => {
    const tempF = parseFloat(value);
    setGasTempF(isNaN(tempF) ? 0 : tempF);
    if (!isCUpdating && !isNaN(tempF)) {
      setIsFUpdating(true);
      // Convert Fahrenheit to Celsius: (°F - 32) × 5/9 = °C
      const tempC = (tempF - 32) * 5/9;
      setGasTempC(isNaN(tempC) ? 0 : tempC);
      setTimeout(() => setIsFUpdating(false), 100);
    }
  }, [isCUpdating]);
  
  // Handle dust concentration conversions
  const handleDustConcGramAm3Change = useCallback((value: string) => {
    const concGramAm3 = parseFloat(value);
    setDustConcGramAm3(isNaN(concGramAm3) ? 0 : concGramAm3);
    if (!isGrainACFUpdating && !isNaN(concGramAm3)) {
      setIsGramAm3Updating(true);
      // 1 g/Am³ = 0.437 grain/ACF
      const grainACF = concGramAm3 * 0.437;
      setDustConcGrainACF(isNaN(grainACF) ? 0 : grainACF);
      setTimeout(() => setIsGramAm3Updating(false), 100);
    }
  }, [isGrainACFUpdating]);
  
  const handleDustConcGrainACFChange = useCallback((value: string) => {
    const concGrainACF = parseFloat(value);
    setDustConcGrainACF(isNaN(concGrainACF) ? 0 : concGrainACF);
    if (!isGramAm3Updating && !isNaN(concGrainACF)) {
      setIsGrainACFUpdating(true);
      // 1 grain/ACF = 2.288 g/Am³
      const gramAm3 = concGrainACF / 0.437;
      setDustConcGramAm3(isNaN(gramAm3) ? 0 : gramAm3);
      setTimeout(() => setIsGrainACFUpdating(false), 100);
    }
  }, [isGramAm3Updating]);
  
  const handleDustConcGramNm3Change = useCallback((value: string) => {
    const concGramNm3 = parseFloat(value);
    setDustConcGramNm3(isNaN(concGramNm3) ? null : concGramNm3);
    if (!isGrainSCFUpdating && !isNaN(concGramNm3)) {
      setIsGramNm3Updating(true);
      // 1 g/Nm³ = 0.437 grain/SCF
      const grainSCF = concGramNm3 * 0.437;
      setDustConcGrainSCF(isNaN(grainSCF) ? null : grainSCF);
      setTimeout(() => setIsGramNm3Updating(false), 100);
    }
  }, [isGrainSCFUpdating]);
  
  const handleDustConcGrainSCFChange = useCallback((value: string) => {
    const concGrainSCF = parseFloat(value);
    setDustConcGrainSCF(isNaN(concGrainSCF) ? null : concGrainSCF);
    if (!isGramNm3Updating && !isNaN(concGrainSCF)) {
      setIsGrainSCFUpdating(true);
      // 1 grain/SCF = 2.288 g/Nm³
      const gramNm3 = concGrainSCF / 0.437;
      setDustConcGramNm3(isNaN(gramNm3) ? null : gramNm3);
      setTimeout(() => setIsGrainSCFUpdating(false), 100);
    }
  }, [isGramNm3Updating]);
  
  return {
    designType,
    setDesignType,
    airVolumeM3h,
    airVolumeACFM,
    numEMCFlaps,
    bagsPerRow,
    bagLength,
    filterRowType,
    setFilterRowType,
    showDimensions,
    setShowDimensions,
    showOtherParams,
    setShowOtherParams,
    channelWidthMm,
    setChannelWidthMm,
    channelHeightMm,
    setChannelHeightMm,
    gasTempC,
    gasTempF,
    dustConcGramAm3,
    dustConcGrainACF,
    dustConcGramNm3,
    dustConcGrainSCF,
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange,
    handleGasTempCChange,
    handleGasTempFChange,
    handleDustConcGramAm3Change,
    handleDustConcGrainACFChange,
    handleDustConcGramNm3Change,
    handleDustConcGrainSCFChange,
    setNumEMCFlaps,
    setBagsPerRow,
    setBagLength,
    m2ToSqFtFactor,
    conversionFactor,
    emcCleaningFactor
  };
};
