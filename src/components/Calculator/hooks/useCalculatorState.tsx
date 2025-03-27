import { useState, useEffect, useCallback, useMemo } from 'react';

export const useCalculatorState = () => {
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
  
  // State for calculated results
  const [results, setResults] = useState({
    filterArea: 0,
    netFilterArea: 0,
    acRatioGross: 0,
    acRatioNet: 0,
    baselinePower: 0,
    improvedPower: 0,
    annualSavings: 0,
    totalBags: 0,
    daysToReplace: 0,
    totalReplacementCost: 0,
    tenYearSavings: 0,
    lifeExtension: 0,
    compressedAirSavings: 0
  });
  
  // Filter bag replacement parameters with default values from the image
  const [bagPrice, setBagPrice] = useState(190); // Default from image
  const [bagChangeTime, setBagChangeTime] = useState(15); // Default from image
  const [numPeople, setNumPeople] = useState(4); // Default from image
  const [hourlyRate, setHourlyRate] = useState(200); // Default from image
  const [siteDistance, setSiteDistance] = useState(1700); // Default from image
  const [travelCost, setTravelCost] = useState(0);
  const [bagReplacementCost, setBagReplacementCost] = useState(0);
  
  // Operational parameters
  const [currentDiffPressure, setCurrentDiffPressure] = useState(20);
  const [scheuchDiffPressure, setScheuchDiffPressure] = useState(15);
  const [currentAirConsumption, setCurrentAirConsumption] = useState(350);
  const [scheuchAirConsumption, setScheuchAirConsumption] = useState(250);
  const [currentMotorKW, setCurrentMotorKW] = useState(50);
  const [scheuchMotorKW, setScheuchMotorKW] = useState(40);
  const [bagQuality, setBagQuality] = useState('needle-felt');
  const [cleaningPressure, setCleaningPressure] = useState('6-bar');
  const [minPulseInterval, setMinPulseInterval] = useState(0);
  const [avgPulseInterval, setAvgPulseInterval] = useState(0);
  
  // Results section parameters
  const [savingYears, setSavingYears] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [kwhCost, setKwhCost] = useState(0);
  const [compressedAirCost, setCompressedAirCost] = useState('');
  
  // Flags to prevent infinite loops in unit conversion
  const [isM3hUpdating, setIsM3hUpdating] = useState(false);
  const [isACFMUpdating, setIsACFMUpdating] = useState(false);
  
  // Calculate all values when inputs change
  useEffect(() => {
    calculateAll();
  }, [
    designType, airVolumeM3h, numEMCFlaps, bagsPerRow, bagLength,
    bagPrice, bagChangeTime, numPeople, hourlyRate, siteDistance,
    travelCost, bagReplacementCost, currentLifeTime, scheuchLifeTime,
    currentDiffPressure, scheuchDiffPressure, currentAirConsumption, 
    scheuchAirConsumption, currentMotorKW, scheuchMotorKW, savingYears, workingHours, kwhCost
  ]);
  
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
  
  // Memoize expensive calculations to avoid unnecessary recalculations
  const calculateFilterArea = useCallback(() => {
    if (designType === 'bolt-weld') {
      // PI()*165/1000*Bag length*5*No. bags in a row*No. EMC flaps
      return Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * numEMCFlaps;
    } else {
      // For Modular design
      const surfaceAreaPerFoot = 4 * 0.292 * 0.3048; // Surface area per foot
      return numEMCFlaps * bagsPerRow * bagLength * surfaceAreaPerFoot;
    }
  }, [designType, bagLength, bagsPerRow, numEMCFlaps]);
  
  // Calculate net filter area (accounting for EMC cleaning)
  const calculateNetFilterArea = useCallback((totalArea) => {
    return totalArea * emcCleaningFactor;
  }, []);
  
  // Calculate travel cost
  const calculateTravelCost = useCallback(() => {
    const daysToReplace = Math.ceil(results.daysToReplace);
    const calculatedCost = 
      (numPeople * (daysToReplace - 1) * hourlyRate) + 
      (numPeople * Math.ceil(numPeople) * 100) + 
      (siteDistance * 2 * 0.5) + 
      (numPeople * 150);
    setTravelCost(calculatedCost);
  }, [results.daysToReplace, numPeople, hourlyRate, siteDistance]);
  
  // Calculate all values
  const calculateAll = useCallback(() => {
    // Calculate total filter area based on design type
    const totalFilterArea = calculateFilterArea();
    const netFilterArea = calculateNetFilterArea(totalFilterArea);
    
    // Calculate OPEX metrics
    const acRatioGross = parseFloat(airVolumeM3h) / totalFilterArea || 0;
    const acRatioNet = parseFloat(airVolumeM3h) / netFilterArea || 0;
    const baselinePowerConsumption = parseFloat(airVolumeM3h) * 0.0002 || 0; // 0.0002 kW per m³/h
    const improvedPowerConsumption = baselinePowerConsumption * 0.8 || 0; // 20% reduction
    
    // Calculate total bags
    const totalBags = numEMCFlaps * bagsPerRow * 5;
    
    // Calculate days to replace
    const daysToReplace = (totalBags * bagChangeTime / 60 / 10 / numPeople * 2) || 0;
    
    // Calculate bag lifetime savings
    const bagTotalCost = bagPrice * totalBags;
    const lifeExtension = scheuchLifeTime - currentLifeTime;
    const standardReplacements = 120 / currentLifeTime;
    const emcReplacements = 120 / scheuchLifeTime;
    const replacementSavings = (standardReplacements - emcReplacements) * (bagTotalCost + parseFloat(bagReplacementCost.toString()));
    
    // Calculate compressed air savings
    const compressedAirSavings = (currentAirConsumption - scheuchAirConsumption) * workingHours;
    
    setResults({
      filterArea: totalFilterArea,
      netFilterArea: netFilterArea,
      acRatioGross: acRatioGross,
      acRatioNet: acRatioNet,
      baselinePower: baselinePowerConsumption,
      improvedPower: improvedPowerConsumption,
      annualSavings: 0, // Removed but kept for state compatibility
      totalBags,
      daysToReplace: daysToReplace,
      totalReplacementCost: parseFloat(bagReplacementCost.toString()),
      tenYearSavings: replacementSavings,
      lifeExtension,
      compressedAirSavings: compressedAirSavings
    });
  }, [
    airVolumeM3h, bagChangeTime, bagPrice, bagReplacementCost, bagsPerRow, 
    calculateFilterArea, calculateNetFilterArea, currentAirConsumption, 
    currentLifeTime, numEMCFlaps, numPeople, scheuchAirConsumption, 
    scheuchLifeTime, workingHours
  ]);
  
  // Format results based on design type - memoize to prevent unnecessary recalculations
  const formattedResults = useMemo(() => {
    if (designType === 'bolt-weld') {
      // Metric units
      return {
        filterArea: `${results.filterArea.toFixed(2)} m²`,
        netFilterArea: `${results.netFilterArea.toFixed(2)} m²`,
        acRatioGross: `${results.acRatioGross.toFixed(2)} m³/h/m²`,
        acRatioNet: `${results.acRatioNet.toFixed(2)} m��/h/m²`,
        baselinePower: `${results.baselinePower.toFixed(2)} kW`,
        improvedPower: `${results.improvedPower.toFixed(2)} kW`,
        totalBags: results.totalBags,
        daysToReplace: results.daysToReplace.toFixed(2),
        bagMaterialCost: results.totalBags * bagPrice,
        tenYearSavings: `${Number(results.tenYearSavings).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
        lifeExtension: `${results.lifeExtension} months`
      };
    } else {
      // Imperial units
      const filterAreaSqFt = (results.filterArea * m2ToSqFtFactor).toFixed(2);
      const netFilterAreaSqFt = (results.netFilterArea * m2ToSqFtFactor).toFixed(2);
      const acRatioGrossImperial = (results.acRatioGross / m2ToSqFtFactor * conversionFactor).toFixed(2);
      const acRatioNetImperial = (results.acRatioNet / m2ToSqFtFactor * conversionFactor).toFixed(2);
      
      return {
        filterArea: `${filterAreaSqFt} sq ft`,
        netFilterArea: `${netFilterAreaSqFt} sq ft`,
        acRatioGross: `${acRatioGrossImperial} cfm/sq ft`,
        acRatioNet: `${acRatioNetImperial} cfm/sq ft`,
        baselinePower: `${results.baselinePower.toFixed(2)} kW`,
        improvedPower: `${results.improvedPower.toFixed(2)} kW`,
        totalBags: results.totalBags,
        daysToReplace: results.daysToReplace.toFixed(2),
        bagMaterialCost: results.totalBags * bagPrice,
        tenYearSavings: `${Number(results.tenYearSavings).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
        lifeExtension: `${results.lifeExtension} months`
      };
    }
  }, [
    designType, 
    results, 
    bagPrice, 
    m2ToSqFtFactor, 
    conversionFactor
  ]);

  // Calculate total savings
  const totalSavings = useMemo(() => {
    // Bag Material and Labor
    const bagSavings = ((((savingYears * 12) / currentLifeTime) * ((results.totalBags * bagPrice) + travelCost)) - 
                       (((savingYears * 12) / scheuchLifeTime) * ((results.totalBags * bagPrice) + travelCost)));
    
    // Fan Power Consumption
    const fanPowerSavings = (((parseFloat(airVolumeM3h) * (currentDiffPressure - scheuchDiffPressure) * 100) / 
                           (3600 * 1000 * 0.8)) * kwhCost * workingHours * savingYears);
    
    // Compressed Air Consumption
    const airSavings = compressedAirCost 
      ? (currentAirConsumption - scheuchAirConsumption) * parseFloat(compressedAirCost) * workingHours * savingYears
      : (currentMotorKW - scheuchMotorKW) * kwhCost * workingHours * savingYears;
    
    return {
      bagSavings,
      fanPowerSavings,
      airSavings,
      total: bagSavings + fanPowerSavings + airSavings
    };
  }, [
    savingYears, currentLifeTime, scheuchLifeTime, results.totalBags, 
    bagPrice, travelCost, airVolumeM3h, currentDiffPressure, 
    scheuchDiffPressure, kwhCost, workingHours, compressedAirCost, 
    currentAirConsumption, scheuchAirConsumption, currentMotorKW, scheuchMotorKW
  ]);

  return {
    // Design parameters
    designType,
    setDesignType,
    airVolumeM3h,
    airVolumeACFM,
    numEMCFlaps,
    bagsPerRow,
    bagLength,
    handleAirVolumeM3hChange,
    handleAirVolumeACFMChange,
    setNumEMCFlaps,
    setBagsPerRow,
    setBagLength,
    
    // Filter bag replacement
    bagPrice,
    setBagPrice,
    bagChangeTime,
    setBagChangeTime,
    numPeople,
    setNumPeople,
    hourlyRate,
    setHourlyRate,
    siteDistance,
    setSiteDistance,
    travelCost,
    setTravelCost,
    bagReplacementCost,
    setBagReplacementCost,
    calculateTravelCost,
    
    // Operational parameters
    currentDiffPressure,
    setCurrentDiffPressure,
    scheuchDiffPressure,
    setScheuchDiffPressure,
    currentAirConsumption,
    setCurrentAirConsumption,
    scheuchAirConsumption,
    setScheuchAirConsumption,
    currentMotorKW,
    setCurrentMotorKW,
    scheuchMotorKW,
    setScheuchMotorKW,
    bagQuality,
    setBagQuality,
    cleaningPressure,
    setCleaningPressure,
    minPulseInterval,
    setMinPulseInterval,
    avgPulseInterval,
    setAvgPulseInterval,
    
    // Results
    savingYears,
    setSavingYears,
    workingHours,
    setWorkingHours,
    kwhCost,
    setKwhCost,
    compressedAirCost,
    setCompressedAirCost,
    
    // Calculated results
    results,
    formattedResults,
    totalSavings,
    
    // Constants
    m2ToSqFtFactor,
    conversionFactor
  };
};
