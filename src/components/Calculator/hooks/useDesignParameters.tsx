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
  const [dustConcGramNm3, setDustConcGramNm3] = useState<number | null>(20);
  const [dustConcGrainSCF, setDustConcGrainSCF] = useState<number | null>(8.74); // Conversion factor
  
  // New state for outlet dust concentration (emissions)
  const [outletDustKgH, setOutletDustKgH] = useState<number | null>(1.2);
  const [outletDustLbH, setOutletDustLbH] = useState<number | null>(2.65); // 1.2 kg/h ≈ 2.65 lb/h
  
  // New state for target emission values
  const [targetEmissionMgNm3, setTargetEmissionMgNm3] = useState<number | null>(5);
  const [targetEmissionGrainDscf, setTargetEmissionGrainDscf] = useState<number | null>(0.0022); // 5 mg/Nm³ ≈ 0.0022 grain/dscf

  // New state for Negative Pressure
  const [negativePressureMbar, setNegativePressureMbar] = useState<number | null>(50);
  const [negativePressureInchesWG, setNegativePressureInchesWG] = useState<number | null>(2);
  
  // Flags to prevent infinite loops in unit conversion
  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);
  const [isCUpdating, setIsCUpdating] = useState(false);
  const [isFUpdating, setIsFUpdating] = useState(false);
  const [isGramAm3Updating, setIsGramAm3Updating] = useState(false);
  const [isGrainACFUpdating, setIsGrainACFUpdating] = useState(false);
  const [isGramNm3Updating, setIsGramNm3Updating] = useState(false);
  const [isGrainSCFUpdating, setIsGrainSCFUpdating] = useState(false);
  const [isKgHUpdating, setIsKgHUpdating] = useState(false);
  const [isLbHUpdating, setIsLbHUpdating] = useState(false);
  const [isMgNm3Updating, setIsMgNm3Updating] = useState(false);
  const [isGrainDscfUpdating, setIsGrainDscfUpdating] = useState(false);
  const [isNegativePressureMbarUpdating, setIsNegativePressureMbarUpdating] = useState(false);
  const [isNegativePressureInchesWGUpdating, setIsNegativePressureInchesWGUpdating] = useState(false);

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
  
  // Handle outlet dust concentration conversions
  const handleOutletDustKgHChange = useCallback((value: string) => {
    const dustKgH = parseFloat(value);
    setOutletDustKgH(isNaN(dustKgH) ? null : dustKgH);
    if (!isLbHUpdating && !isNaN(dustKgH)) {
      setIsKgHUpdating(true);
      // 1 kg ≈ 2.20462 lb
      const dustLbH = dustKgH * 2.20462;
      setOutletDustLbH(isNaN(dustLbH) ? null : dustLbH);
      setTimeout(() => setIsKgHUpdating(false), 100);
    }
  }, [isLbHUpdating]);
  
  const handleOutletDustLbHChange = useCallback((value: string) => {
    const dustLbH = parseFloat(value);
    setOutletDustLbH(isNaN(dustLbH) ? null : dustLbH);
    if (!isKgHUpdating && !isNaN(dustLbH)) {
      setIsLbHUpdating(true);
      // 1 lb ≈ 0.453592 kg
      const dustKgH = dustLbH * 0.453592;
      setOutletDustKgH(isNaN(dustKgH) ? null : dustKgH);
      setTimeout(() => setIsLbHUpdating(false), 100);
    }
  }, [isKgHUpdating]);
  
  // Handle target emission conversions
  const handleTargetEmissionMgNm3Change = useCallback((value: string) => {
    const emissionMgNm3 = parseFloat(value);
    setTargetEmissionMgNm3(isNaN(emissionMgNm3) ? null : emissionMgNm3);
    if (!isGrainDscfUpdating && !isNaN(emissionMgNm3)) {
      setIsMgNm3Updating(true);
      // 1 mg/Nm³ ≈ 0.00044 grain/dscf
      const grainDscf = emissionMgNm3 * 0.00044;
      setTargetEmissionGrainDscf(isNaN(grainDscf) ? null : grainDscf);
      setTimeout(() => setIsMgNm3Updating(false), 100);
    }
  }, [isGrainDscfUpdating]);
  
  const handleTargetEmissionGrainDscfChange = useCallback((value: string) => {
    const emissionGrainDscf = parseFloat(value);
    setTargetEmissionGrainDscf(isNaN(emissionGrainDscf) ? null : emissionGrainDscf);
    if (!isMgNm3Updating && !isNaN(emissionGrainDscf)) {
      setIsGrainDscfUpdating(true);
      // 1 grain/dscf ≈ 2290 mg/Nm³
      const mgNm3 = emissionGrainDscf / 0.00044;
      setTargetEmissionMgNm3(isNaN(mgNm3) ? null : mgNm3);
      setTimeout(() => setIsGrainDscfUpdating(false), 100);
    }
  }, [isMgNm3Updating]);

  // Conversion handlers for Negative Pressure
  const handleNegativePressureMbarChange = useCallback((value: string) => {
    const pressureMbar = parseFloat(value);
    setNegativePressureMbar(isNaN(pressureMbar) ? null : pressureMbar);
    if (!isNegativePressureInchesWGUpdating && !isNaN(pressureMbar)) {
      setIsNegativePressureMbarUpdating(true);
      // 1 mbar = 0.4 Inches W.G.
      const pressureInchesWG = pressureMbar * 0.4;
      setNegativePressureInchesWG(isNaN(pressureInchesWG) ? null : pressureInchesWG);
      setTimeout(() => setIsNegativePressureMbarUpdating(false), 100);
    }
  }, [isNegativePressureInchesWGUpdating]);

  const handleNegativePressureInchesWGChange = useCallback((value: string) => {
    const pressureInchesWG = parseFloat(value);
    setNegativePressureInchesWG(isNaN(pressureInchesWG) ? null : pressureInchesWG);
    if (!isNegativePressureMbarUpdating && !isNaN(pressureInchesWG)) {
      setIsNegativePressureInchesWGUpdating(true);
      // 1 Inch W.G. = 2.5 mbar
      const pressureMbar = pressureInchesWG * 2.5;
      setNegativePressureMbar(isNaN(pressureMbar) ? null : pressureMbar);
      setTimeout(() => setIsNegativePressureInchesWGUpdating(false), 100);
    }
  }, [isNegativePressureMbarUpdating]);
  
  // Update the estimateOutletDust function
  const estimateOutletDust = useCallback(() => {
    if (dustConcGramAm3 && airVolumeM3h) {
      // Calculate outlet dust by multiplying inlet dust concentration by air volume
      const estimatedOutletKgH = (dustConcGramAm3 / 1000) * parseFloat(airVolumeM3h);
      
      // Update both kg/h and lb/h values
      handleOutletDustKgHChange(estimatedOutletKgH.toFixed(3));
    }
  }, [dustConcGramAm3, airVolumeM3h, handleOutletDustKgHChange]);
  
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
    outletDustKgH,
    outletDustLbH,
    targetEmissionMgNm3,
    targetEmissionGrainDscf,
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange,
    handleGasTempCChange,
    handleGasTempFChange,
    handleDustConcGramAm3Change,
    handleDustConcGrainACFChange,
    handleDustConcGramNm3Change,
    handleDustConcGrainSCFChange,
    handleOutletDustKgHChange,
    handleOutletDustLbHChange,
    handleTargetEmissionMgNm3Change,
    handleTargetEmissionGrainDscfChange,
    estimateOutletDust,
    setNumEMCFlaps,
    setBagsPerRow,
    setBagLength,
    m2ToSqFtFactor,
    conversionFactor,
    emcCleaningFactor,
    negativePressureMbar,
    negativePressureInchesWG,
    handleNegativePressureMbarChange,
    handleNegativePressureInchesWGChange,
  };
};
