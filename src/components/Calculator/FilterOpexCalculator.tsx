import React, { useState, useEffect, useCallback, useMemo } from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';
import CalculatorSection from './CalculatorSection';
import Transition from '../UI/Transition';

const FilterOpexCalculator = () => {
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
  const [bagPrice, setBagPrice] = useState(190);
  const [bagChangeTime, setBagChangeTime] = useState(15);
  const [bagQuality, setBagQuality] = useState('needle-felt');
  const [cleaningPressure, setCleaningPressure] = useState('6-bar');
  const [cleaningCycle, setCleaningCycle] = useState('continuous');
  const [minPulseInterval, setMinPulseInterval] = useState(5);
  const [avgPulseInterval, setAvgPulseInterval] = useState(10);
  const [minCycleTime, setMinCycleTime] = useState(100);
  const [avgCycleTime, setAvgCycleTime] = useState(200);
  const [numPeople, setNumPeople] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(200);
  const [siteDistance, setSiteDistance] = useState(1700);
  const [travelCost, setTravelCost] = useState(15000);
  const [currentLifeTime, setCurrentLifeTime] = useState(24);
  const [scheuchLifeTime, setScheuchLifeTime] = useState(48);
  const [currentDiffPressure, setCurrentDiffPressure] = useState(15);
  const [scheuchDiffPressure, setScheuchDiffPressure] = useState(10);
  const [currentAirConsumption, setCurrentAirConsumption] = useState(75);
  const [scheuchAirConsumption, setScheuchAirConsumption] = useState(40);
  const [currentMotorKW, setCurrentMotorKW] = useState(22);
  const [scheuchMotorKW, setScheuchMotorKW] = useState(15);
  const [savingYears, setSavingYears] = useState(10);
  const [workingHours, setWorkingHours] = useState(7920);
  const [kwhCost, setKwhCost] = useState(0.25);
  const [compressedAirCost, setCompressedAirCost] = useState('');
  const [bagReplacementCost, setBagReplacementCost] = useState(75000);
  
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
        acRatioNet: `${results.acRatioNet.toFixed(2)} m³/h/m²`,
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <Transition animation="slide-in-left" delay={100}>
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Filter OPEX Savings Calculator</h1>
        </Transition>
        <Transition animation="slide-in-right" delay={300}>
          <p className="text-gray-600 max-w-xl mx-auto">Calculate potential operational savings by implementing EMC cleaning technology in your filtration systems.</p>
        </Transition>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Design Type Selection */}
        <CalculatorSection 
          title="Filter Design Configuration" 
          delay={100}
          className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-100"
        >
          <div className="mb-6">
            <div className="font-medium text-gray-700 mb-2">Filter Design Type:</div>
            <div className="flex gap-4 flex-wrap">
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 shadow-sm focus:outline-none">
                <input 
                  type="radio" 
                  name="designType" 
                  value="bolt-weld" 
                  checked={designType === 'bolt-weld'} 
                  onChange={() => setDesignType('bolt-weld')}
                  className="peer sr-only"
                />
                <span className="absolute top-0 right-0 block h-3 w-3">
                  <span className={`absolute inline-flex h-full w-full animate-pulse rounded-full ${designType === 'bolt-weld' ? 'bg-primary/70' : 'bg-transparent'} opacity-75`}></span>
                </span>
                <span className="flex h-full flex-col">
                  <span className="block text-sm font-semibold">Bolt/Weld Design</span>
                  <span className="mt-1 flex items-center text-xs text-gray-500">Standard industrial configuration</span>
                </span>
              </label>
              
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 shadow-sm focus:outline-none">
                <input 
                  type="radio" 
                  name="designType" 
                  value="modular" 
                  checked={designType === 'modular'} 
                  onChange={() => setDesignType('modular')}
                  className="peer sr-only"
                />
                <span className="absolute top-0 right-0 block h-3 w-3">
                  <span className={`absolute inline-flex h-full w-full animate-pulse rounded-full ${designType === 'modular' ? 'bg-primary/70' : 'bg-transparent'} opacity-75`}></span>
                </span>
                <span className="flex h-full flex-col">
                  <span className="block text-sm font-semibold">Modular Design</span>
                  <span className="mt-1 flex items-center text-xs text-gray-500">Modern sectional design</span>
                </span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 & 2: Labels & Inputs */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center mb-4">
                <div className="calculator-field-label">Air Volume:</div>
                <div className="calculator-field-input flex items-center space-x-2">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={airVolumeM3h}
                      onChange={(e) => handleAirVolumeM3hChange(e.target.value)}
                      className="calculator-input rounded-r-none border-r-0 w-24 md:w-32"
                      placeholder="Enter value"
                    />
                    <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-r-md">
                      m³/h
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={airVolumeACFM}
                      onChange={(e) => handleAirVolumeACFMChange(e.target.value)}
                      className="calculator-input rounded-r-none border-r-0 w-24 md:w-32"
                      placeholder="Enter value"
                    />
                    <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-r-md">
                      ACFM
                    </span>
                  </div>
                </div>
              </div>
              
              <InputField
                label="TOTAL No. EMC Flaps:"
                value={numEMCFlaps}
                onChange={(value) => setNumEMCFlaps(parseInt(value) || 0)}
                type="number"
                min={1}
              />
              
              <InputField
                label="No. Bags in a Row:"
                value={bagsPerRow}
                onChange={(value) => setBagsPerRow(parseInt(value) || 0)}
                type="select"
                options={
                  designType === 'bolt-weld'
                    ? [
                        { value: 15, label: '15' },
                        { value: 18, label: '18' }
                      ]
                    : [
                        { value: 15, label: '15' }
                      ]
                }
              />
              
              <InputField
                label="Bag Length:"
                value={bagLength}
                onChange={(value) => setBagLength(parseInt(value) || 0)}
                type="select"
                options={
                  designType === 'bolt-weld'
                    ? [
                        { value: 8, label: '8 m' },
                        { value: 9, label: '9 m' },
                        { value: 10, label: '10 m' }
                      ]
                    : [
                        { value: 16, label: '16 ft' },
                        { value: 24, label: '24 ft' },
                        { value: 28, label: '28 ft' }
                      ]
                }
              />
            </div>
            
            {/* Column 3: Results */}
            <div className="bg-white rounded-xl shadow-soft p-5 border border-gray-100 md:mt-0 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Design Parameters</h3>
              
              <div className="space-y-4 animate-stagger">
                <ResultCard
                  label="Total Filtration Area"
                  value={formattedResults.filterArea}
                  subValue={`(${(results.filterArea * m2ToSqFtFactor).toFixed(2)} sq ft)`}
                  delay={100}
                />
                
                <ResultCard
                  label="Net Area (EMC cleaning)"
                  value={formattedResults.netFilterArea}
                  subValue={`(${(results.netFilterArea * m2ToSqFtFactor).toFixed(2)} sq ft)`}
                  delay={200}
                />
                
                <ResultCard
                  label="A/C Ratio Gross"
                  value={formattedResults.acRatioGross}
                  subValue={`(${(results.acRatioGross / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)`}
                  delay={300}
                />
                
                <ResultCard
                  label="A/C Ratio Net"
                  value={formattedResults.acRatioNet}
                  subValue={`(${(results.acRatioNet / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)`}
                  delay={400}
                />
              </div>
            </div>
          </div>
        </CalculatorSection>
        
        {/* Filter Bag Replacement Section */}
        <CalculatorSection 
          title="Filter Bag Replacement" 
          delay={300}
          className="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 & 2: Labels & Inputs */}
            <div className="md:col-span-2 space-y-4">
              <InputField
                label="Filter Bag Price per Piece (USD):"
                value={bagPrice}
                onChange={(value) => setBagPrice(parseFloat(value) || 0)}
                type="number"
                min={0}
              />
              
              <InputField
                label="Ave. time for changing one bag (minute):"
                value={bagChangeTime}
                onChange={(value) => setBagChangeTime(parseFloat(value) || 0)}
                type="number"
                min={0}
                step={0.5}
              />
              
              <InputField
                label="No. People:"
                value={numPeople}
                onChange={(value) => setNumPeople(parseInt(value) || 0)}
                type="number"
                min={1}
              />
              
              <InputField
                label="Hourly rate (USD):"
                value={hourlyRate}
                onChange={(value) => setHourlyRate(parseFloat(value) || 0)}
                type="number"
                min={0}
                step={0.01}
              />
              
              <InputField
                label="Site Distance from Auburn (miles):"
                value={siteDistance}
                onChange={(value) => setSiteDistance(parseFloat(value) || 0)}
                type="number"
                min={0}
              />
              
              <InputField
                label="Travel/accommodation cost for crew:"
                value={travelCost}
                onChange={(value) => setTravelCost(parseFloat(value) || 0)}
                type="number"
                min={0}
                estimateButton={{
                  onClick: calculateTravelCost,
                  label: "Estimate"
                }}
              />
              
              <InputField
                label="Bag replacement cost (USD):"
                value={bagReplacementCost}
                onChange={(value) => setBagReplacementCost(parseFloat(value) || 0)}
                type="number"
                min={0}
              />
            </div>
            
            {/* Column 3: Results */}
            <div className="bg-white rounded-xl shadow-soft p-5 border border-gray-100 md:mt-0 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Replacement Parameters</h3>
              
              <div className="space-y-4 animate-stagger">
                <ResultCard
                  label="Total Number of Bags"
                  value={formattedResults.totalBags}
                  delay={100}
                />
                
                <ResultCard
                  label="Days to Replace Bags"
                  value={formattedResults.daysToReplace}
                  delay={200}
                />
                
                <ResultCard
                  label="Bag Material Cost (1 replacement)"
                  value={`$${(formattedResults.bagMaterialCost).toLocaleString()}`}
                  delay={300}
                />
                
                <ResultCard
                  label="Total Replacement Cost"
                  value={`$${(formattedResults.bagMaterialCost + travelCost).toLocaleString()}`}
                  highlight={true}
                  delay={400}
                />
              </div>
            </div>
          </div>
        </CalculatorSection>
        
        {/* Savings with Filter Bags Life time Section */}
        <CalculatorSection 
          title="Filter Bags Lifetime & Operational Parameters" 
          delay={500}
          className="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 & 2: Labels & Inputs */}
            <div className="md:col-span-2">
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Bag Lifetime</h3>
                
                <InputField
                  label={
                    <div>
                      <div>Filter Bag Life time</div>
                      <div className="text-sm text-gray-500">Current Situation (Months):</div>
                    </div>
                  }
                  value={currentLifeTime}
                  onChange={(value) => setCurrentLifeTime(parseFloat(value) || 0)}
                  type="number"
                  min={1}
                />
                
                <InputField
                  label={
                    <div>
                      <div>Filter Bag Life time</div>
                      <div className="text-sm text-gray-500">Scheuch EMC Technology (Months):</div>
                    </div>
                  }
                  value={scheuchLifeTime}
                  onChange={(value) => setScheuchLifeTime(parseFloat(value) || 0)}
                  type="number"
                  min={1}
                />
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Differential Pressure</h3>
                
                <InputField
                  label={
                    <div>
                      <div>Filter Differential Pressure</div>
                      <div className="text-sm text-gray-500">Current Situation:</div>
                    </div>
                  }
                  value={currentDiffPressure}
                  onChange={(value) => setCurrentDiffPressure(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="mbar"
                  secondaryInput={{
                    value: (currentDiffPressure * 0.4).toFixed(2),
                    onChange: (value) => setCurrentDiffPressure(parseFloat(value) / 0.4 || 0),
                    units: "Inches W.G.",
                  }}
                />
                
                <InputField
                  label={
                    <div>
                      <div>Filter Differential Pressure</div>
                      <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
                    </div>
                  }
                  value={scheuchDiffPressure}
                  onChange={(value) => setScheuchDiffPressure(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="mbar"
                  secondaryInput={{
                    value: (scheuchDiffPressure * 0.4).toFixed(2),
                    onChange: (value) => setScheuchDiffPressure(parseFloat(value) / 0.4 || 0),
                    units: "Inches W.G.",
                  }}
                />
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Compressed Air</h3>
                
                <InputField
                  label={
                    <div>
                      <div>Compressed air Consumption</div>
                      <div className="text-sm text-gray-500">Current Situation:</div>
                    </div>
                  }
                  value={currentAirConsumption}
                  onChange={(value) => setCurrentAirConsumption(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="Nm³/h"
                  secondaryInput={{
                    value: (currentAirConsumption * 0.589).toFixed(1),
                    onChange: (value) => setCurrentAirConsumption(parseFloat(value) / 0.589 || 0),
                    units: "SCFM",
                  }}
                />
                
                <InputField
                  label={
                    <div>
                      <div>Compressed air Consumption</div>
                      <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
                    </div>
                  }
                  value={scheuchAirConsumption}
                  onChange={(value) => setScheuchAirConsumption(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="Nm³/h"
                  secondaryInput={{
                    value: (scheuchAirConsumption * 0.589).toFixed(1),
                    onChange: (value) => setScheuchAirConsumption(parseFloat(value) / 0.589 || 0),
                    units: "SCFM",
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Motor Power</h3>
                
                <InputField
                  label={
                    <div>
                      <div>Motor KW for standalone compressor</div>
                      <div className="text-sm text-gray-500">Current Situation:</div>
                    </div>
                  }
                  value={currentMotorKW}
                  onChange={(value) => setCurrentMotorKW(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="kW"
                  secondaryInput={{
                    value: (currentMotorKW * 1.34102).toFixed(1),
                    onChange: (value) => setCurrentMotorKW(parseFloat(value) / 1.34102 || 0),
                    units: "HP",
                  }}
                />
                
                <InputField
                  label={
                    <div>
                      <div>Motor KW for standalone compressor</div>
                      <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
                    </div>
                  }
                  value={scheuchMotorKW}
                  onChange={(value) => setScheuchMotorKW(parseFloat(value) || 0)}
                  type="number"
                  min={0}
                  units="kW"
                  secondaryInput={{
                    value: (scheuchMotorKW * 1.34102).toFixed(1),
                    onChange: (value) => setScheuchMotorKW(parseFloat(value) / 1.34102 || 0),
                    units: "HP",
                  }}
                />
              </div>
            </div>
            
            {/* Column 3: Parameters */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/40 rounded-xl p-5 border border-amber-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4 border-b border-amber-200 pb-2">Filter Specifications</h3>
              
              <div className="mb-6">
                <div className="font-medium text-gray-700 mb-3">Filter Bag:</div>
                <div className="space-y-2">
                  <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
                    <input 
                      type="radio" 
                      name="bagQuality" 
                      value="needle-felt" 
                      checked={bagQuality === 'needle-felt'} 
                      onChange={() => setBagQuality('needle-felt')}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col">
                      <span className="flex items-center">
                        <span className={`mr-2 h-4 w-4 rounded-full border ${bagQuality === 'needle-felt' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                          {bagQuality === 'needle-felt' && (
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">Needle felt quality</span>
                      </span>
                    </span>
                  </label>
                  
                  <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
                    <input 
                      type="radio" 
                      name="bagQuality" 
                      value="ptfe-membrane" 
                      checked={bagQuality === 'ptfe-membrane'} 
                      onChange={() => setBagQuality('ptfe-membrane')}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col">
                      <span className="flex items-center">
                        <span className={`mr-2 h-4 w-4 rounded-full border ${bagQuality === 'ptfe-membrane' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                          {bagQuality === 'ptfe-membrane' && (
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">PTFE-Membrane</span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="font-medium text-gray-700 mb-3">Cleaning Pressure:</div>
                <div className="space-y-2">
                  <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
                    <input 
                      type="radio" 
                      name="cleaningPressure" 
                      value="6-bar" 
                      checked={cleaningPressure === '6-bar'} 
                      onChange={() => setCleaningPressure('6-bar')}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col">
                      <span className="flex items-center">
                        <span className={`mr-2 h-4 w-4 rounded-full border ${cleaningPressure === '6-bar' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                          {cleaningPressure === '6-bar' && (
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">6 bar (87 psi)</span>
                      </span>
                    </span>
                  </label>
                  
                  <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
                    <input 
                      type="radio" 
                      name="cleaningPressure" 
                      value="2-3-bar" 
                      checked={cleaningPressure === '2-3-bar'} 
                      onChange={() => setCleaningPressure('2-3-bar')}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col">
                      <span className="flex items-center">
                        <span className={`mr-2 h-4 w-4 rounded-full border ${cleaningPressure === '2-3-bar' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                          {cleaningPressure === '2-3-bar' && (
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span className="text-sm font-medium">2 to 3 bar (29-44 psi)</span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="font-medium text-gray-700 mb-2">Cleaning cycle parameters:</div>
                
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <InputField
                      label="Min. interval (sec):"
                      labelClassName="text-xs text-gray-600 mb-1"
                      value={minPulseInterval}
                      onChange={(value) => setMinPulseInterval(parseFloat(value) || 0)}
                      type="number"
                      min={0}
                      step={1}
                      className="mb-0"
                    />
                  </div>
                  <div>
                    <InputField
                      label="Ave. interval (sec):"
                      labelClassName="text-xs text-gray-600 mb-1"
                      value={avgPulseInterval}
                      onChange={(value) => setAvgPulseInterval(parseFloat(value) || 0)}
                      type="number"
                      min={0}
                      step={1}
                      className="mb-0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
                    <div className="text-xs text-gray-600 mb-1">Min. complete cycle:</div>
                    <div className="font-medium text-sm">
                      {((numEMCFlaps * 5 * minPulseInterval) / 60).toFixed(1)} min
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
                    <div className="text-xs text-gray-600 mb-1">Ave. complete cycle:</div>
                    <div className="font-medium text-sm">
                      {((numEMCFlaps * 5 * avgPulseInterval) / 60).toFixed(1)} min
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="font-medium text-gray-700 mb-2">
                  {bagQuality === 'needle-felt' 
                    ? 'Life Time - EMC / Needlefelt' 
                    : 'Life Time - EMC / PTFE-Membrane'}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
                  <div className="mb-2">
                    <span className="font-medium text-sm">Minimum: </span>
                    <span className="text-sm">
                      {cleaningPressure === '2-3-bar' ? (
                        bagQuality === 'needle-felt' ? 
                          `${((300000 * ((numEMCFlaps * 5 * minPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years` : 
                          `${((150000 * ((numEMCFlaps * 5 * minPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years`
                      ) : (
                        "-"
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Average: </span>
                    <span className="text-sm">
                      {cleaningPressure === '2-3-bar' ? (
                        bagQuality === 'needle-felt' ? 
                          `${((450000 * ((numEMCFlaps * 5 * avgPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years` : 
                          `${((250000 * ((numEMCFlaps * 5 * avgPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years`
                      ) : (
                        "-"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CalculatorSection>
        
        {/* Results Section */}
        <CalculatorSection 
          title="OPEX Savings Analysis" 
          delay={700}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Calculation Parameters</h3>
              
              <InputField
                label="Saving in x years:"
                value={savingYears}
                onChange={(value) => setSavingYears(parseInt(value) || 0)}
                type="number"
                min={1}
                className="mb-6"
              />
              
              <InputField
                label="Working hours per year:"
                value={workingHours}
                onChange={(value) => setWorkingHours(parseInt(value) || 0)}
                type="number"
                min={1}
                className="mb-6"
              />
              
              <InputField
                label="USD per kWh for plant:"
                value={kwhCost}
                onChange={(value) => setKwhCost(parseFloat(value) || 0)}
                type="number"
                min={0}
                step={0.01}
                className="mb-6"
              />
              
              <InputField
                label="USD/Nm³ from Plant Network:"
                value={compressedAirCost}
                onChange={(value) => setCompressedAirCost(value)}
                type="number"
                min={0}
                step={0.01}
                placeholder="Leave empty if not available"
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b">Improvement Metrics</h3>
                  
                  <div className="space-y-4">
                    <ResultCard
                      label="Bag Life Time Extension"
                      value={`${(scheuchLifeTime - currentLifeTime)} months (${((scheuchLifeTime - currentLifeTime) / currentLifeTime * 100).toFixed(0)}%)`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <ResultCard
                      label="Saving in Differential Pressure"
                      value={`${(currentDiffPressure - scheuchDiffPressure) * savingYears} mbar (${((currentDiffPressure - scheuchDiffPressure) / currentDiffPressure * 100).toFixed(0)}%)`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <ResultCard
                      label="Saving in Compressed Air"
                      value={`${(currentAirConsumption - scheuchAirConsumption) * savingYears} Nm³/h (${((currentAirConsumption - scheuchAirConsumption) / currentAirConsumption * 100).toFixed(0)}%)`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <ResultCard
                      label="Saving in Motor KW"
                      value={`${(currentMotorKW - scheuchMotorKW) * savingYears} kW (${((currentMotorKW - scheuchMotorKW) / currentMotorKW * 100).toFixed(0)}%)`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-center text-sm font-medium text-gray-700 mb-4 pb-2 border-b">OPEX Savings in {savingYears} years</h3>
                  
                  <div className="space-y-4">
                    <ResultCard
                      label="Bag Material and Labor"
                      value={`$${totalSavings.bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <ResultCard
                      label="Savings in Fan Power Consumption"
                      value={`$${totalSavings.fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <ResultCard
                      label="Savings in Compressed Air"
                      value={`$${totalSavings.airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                    
                    <div className="h-px bg-gray-200 my-2"></div>
                    
                    <ResultCard
                      label={`Total Savings in ${savingYears} years`}
                      value={`$${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                      valueClassName="text-xl font-bold text-green-600"
                      className="bg-transparent shadow-none border-0 p-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <div className="flex justify-center">
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl max-w-2xl text-center">
                <h3 className="text-xl font-medium text-green-800 mb-4">Total Estimated Savings</h3>
                <div className="text-4xl font-bold text-green-700 mb-1">${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-sm text-green-600">Over {savingYears} years of operation with EMC technology</div>
              </div>
            </div>
          </div>
        </CalculatorSection>
      </div>
    </div>
  );
};

export default FilterOpexCalculator;
