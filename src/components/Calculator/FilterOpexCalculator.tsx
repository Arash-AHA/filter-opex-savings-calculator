import React, { useState, useEffect } from 'react';
import { useDesignParameters } from './hooks/useDesignParameters';
import DesignParameters from './DesignParameters';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

const FilterOpexCalculator = () => {
  const {
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
  } = useDesignParameters();

  const [currentLifeTime, setCurrentLifeTime] = useState(12);
  const [scheuchLifeTime, setScheuchLifeTime] = useState(24);
  const [currentDiffPressure, setCurrentDiffPressure] = useState(12);
  const [scheuchDiffPressure, setScheuchDiffPressure] = useState(8);
  const [currentAirConsumption, setCurrentAirConsumption] = useState(120);
  const [scheuchAirConsumption, setScheuchAirConsumption] = useState(80);
  const [currentMotorKW, setCurrentMotorKW] = useState(132);
  const [scheuchMotorKW, setScheuchMotorKW] = useState(110);
  const [bagQuality, setBagQuality] = useState('Standard');
  const [cleaningPressure, setCleaningPressure] = useState('Standard');
  const [minPulseInterval, setMinPulseInterval] = useState(100);
  const [avgPulseInterval, setAvgPulseInterval] = useState(300);
  const [savingYears, setSavingYears] = useState(5);
  const [workingHours, setWorkingHours] = useState(6000);
  const [kwhCost, setKwhCost] = useState(0.1);
  const [compressedAirCost, setCompressedAirCost] = useState('');
	const { toast } = useToast()

  const [results, setResults] = useState<any>(null);
  const [formattedResults, setFormattedResults] = useState<any>(null);

  useEffect(() => {
    // Validate input values
    if (!airVolumeM3h || !numEMCFlaps || !bagsPerRow || !bagLength) {
      return;
    }

    // Convert input values to numbers
    const airVolume = parseFloat(airVolumeM3h);
    const numFlaps = parseInt(numEMCFlaps.toString());
    const bags = parseInt(bagsPerRow.toString());
    const length = parseInt(bagLength.toString());

    // Validate that the converted values are valid numbers
    if (isNaN(airVolume) || isNaN(numFlaps) || isNaN(bags) || isNaN(length)) {
      return;
    }

    // Perform calculations
    const totalFilterArea = (bags * length * 0.125 * bagsPerRow);
    const totalFilterAreaSqFt = totalFilterArea * m2ToSqFtFactor;
    const totalFilterAreaEMC = totalFilterArea * emcCleaningFactor;
    const totalFilterAreaEMCSqFt = totalFilterAreaEMC * m2ToSqFtFactor;
    const gasVelocity = (airVolume / (numFlaps * 2.25)) * 60;
    const gasVelocityFPM = gasVelocity * conversionFactor;

    // Format results
    const formatted = {
      totalFilterArea: totalFilterArea.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalFilterAreaSqFt: totalFilterAreaSqFt.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalFilterAreaEMC: totalFilterAreaEMC.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalFilterAreaEMCSqFt: totalFilterAreaEMCSqFt.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      gasVelocity: gasVelocity.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      gasVelocityFPM: gasVelocityFPM.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    };

    // Set results
    setResults({
      totalFilterArea,
      totalFilterAreaSqFt,
      totalFilterAreaEMC,
      totalFilterAreaEMCSqFt,
      gasVelocity,
      gasVelocityFPM,
    });

    setFormattedResults(formatted);
  }, [airVolumeM3h, numEMCFlaps, bagsPerRow, bagLength, emcCleaningFactor, m2ToSqFtFactor, conversionFactor]);

  const calculateSavings = () => {
    // Validate input values
    if (!savingYears || !workingHours || !kwhCost) {
			toast({
				title: "Error",
				description: "Please fill in all required fields for savings calculation.",
			})
      return null;
    }

    // Convert input values to numbers
    const years = parseInt(savingYears.toString());
    const hours = parseInt(workingHours.toString());
    const kwh = parseFloat(kwhCost.toString());
    const airCost = parseFloat(compressedAirCost || '0');

    // Validate that the converted values are valid numbers
    if (isNaN(years) || isNaN(hours) || isNaN(kwh)) {
			toast({
				title: "Error",
				description: "Invalid input for savings calculation. Please check your inputs.",
			})
      return null;
    }

    // Perform calculations
    const bagSavings = ((years * 12) / currentLifeTime - (years * 12) / scheuchLifeTime) * 250;
    const fanPowerSavings = (currentDiffPressure - scheuchDiffPressure) * 0.001 * currentMotorKW * hours * kwh * years;
    const airSavings = (currentAirConsumption - scheuchAirConsumption) * airCost * hours * years;
    const total = bagSavings + fanPowerSavings + airSavings;

    return {
      bagSavings,
      fanPowerSavings,
      airSavings,
      total,
    };
  };

  const totalSavings = calculateSavings() || {
    bagSavings: 0,
    fanPowerSavings: 0,
    airSavings: 0,
    total: 0,
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Filter OPEX Savings Calculator</CardTitle>
          <CardDescription>
            Calculate the potential operational expenditure (OPEX) savings by using Scheuch EMC filter bag cleaning technology.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <DesignParameters 
            designType={designType}
            setDesignType={setDesignType}
            airVolumeM3h={airVolumeM3h}
            airVolumeACFM={airVolumeACFM}
            numEMCFlaps={numEMCFlaps}
            bagsPerRow={bagsPerRow}
            bagLength={bagLength}
            filterRowType={filterRowType}
            setFilterRowType={setFilterRowType}
            showDimensions={showDimensions}
            setShowDimensions={setShowDimensions}
            showOtherParams={showOtherParams}
            setShowOtherParams={setShowOtherParams}
            channelWidthMm={channelWidthMm}
            setChannelWidthMm={setChannelWidthMm}
            channelHeightMm={channelHeightMm}
            setChannelHeightMm={setChannelHeightMm}
            handleAirVolumeM3hChange={handleAirVolumeM3hChange}
            handleAirVolumeACFMChange={handleAirVolumeACFMChange}
            setNumEMCFlaps={setNumEMCFlaps}
            setBagsPerRow={setBagsPerRow}
            setBagLength={setBagLength}
            formattedResults={formattedResults}
            results={results}
            m2ToSqFtFactor={m2ToSqFtFactor}
            conversionFactor={conversionFactor}
            // Additional parameters
            gasTempC={gasTempC}
            gasTempF={gasTempF}
            dustConcGramAm3={dustConcGramAm3}
            dustConcGrainACF={dustConcGrainACF}
            dustConcGramNm3={dustConcGramNm3}
            dustConcGrainSCF={dustConcGrainSCF}
            outletDustKgH={outletDustKgH}
            outletDustLbH={outletDustLbH}
            targetEmissionMgNm3={targetEmissionMgNm3}
            targetEmissionGrainDscf={targetEmissionGrainDscf}
            handleGasTempCChange={handleGasTempCChange}
            handleGasTempFChange={handleGasTempFChange}
            handleDustConcGramAm3Change={handleDustConcGramAm3Change}
            handleDustConcGrainACFChange={handleDustConcGrainACFChange}
            handleDustConcGramNm3Change={handleDustConcGramNm3Change}
            handleDustConcGrainSCFChange={handleDustConcGrainSCFChange}
            handleOutletDustKgHChange={handleOutletDustKgHChange}
            handleOutletDustLbHChange={handleOutletDustLbHChange}
            handleTargetEmissionMgNm3Change={handleTargetEmissionMgNm3Change}
            handleTargetEmissionGrainDscfChange={handleTargetEmissionGrainDscfChange}
            estimateOutletDust={estimateOutletDust}
            negativePressureMbar={negativePressureMbar}
            negativePressureInchesWG={negativePressureInchesWG}
            handleNegativePressureMbarChange={handleNegativePressureMbarChange}
            handleNegativePressureInchesWGChange={handleNegativePressureInchesWGChange}
          />
          
          <Separator className="my-4" />
          
          <OperationalParameters 
            currentLifeTime={currentLifeTime}
            setCurrentLifeTime={setCurrentLifeTime}
            scheuchLifeTime={scheuchLifeTime}
            setScheuchLifeTime={setScheuchLifeTime}
            currentDiffPressure={currentDiffPressure}
            setCurrentDiffPressure={setCurrentDiffPressure}
            scheuchDiffPressure={scheuchDiffPressure}
            setScheuchDiffPressure={setScheuchDiffPressure}
            currentAirConsumption={currentAirConsumption}
            setCurrentAirConsumption={setCurrentAirConsumption}
            scheuchAirConsumption={scheuchAirConsumption}
            setScheuchAirConsumption={setScheuchAirConsumption}
            currentMotorKW={currentMotorKW}
            setCurrentMotorKW={setCurrentMotorKW}
            scheuchMotorKW={scheuchMotorKW}
            setScheuchMotorKW={setScheuchMotorKW}
            bagQuality={bagQuality}
            setBagQuality={setBagQuality}
            cleaningPressure={cleaningPressure}
            setCleaningPressure={setCleaningPressure}
            minPulseInterval={minPulseInterval}
            setMinPulseInterval={setMinPulseInterval}
            avgPulseInterval={avgPulseInterval}
            setAvgPulseInterval={setAvgPulseInterval}
            numEMCFlaps={numEMCFlaps}
            workingHours={workingHours}
          />
          
          <Separator className="my-4" />
          
          <SavingsResults 
            savingYears={savingYears}
            setSavingYears={setSavingYears}
            workingHours={workingHours}
            setWorkingHours={setWorkingHours}
            kwhCost={kwhCost}
            setKwhCost={setKwhCost}
            compressedAirCost={compressedAirCost}
            setCompressedAirCost={setCompressedAirCost}
            totalSavings={totalSavings}
            currentLifeTime={currentLifeTime}
            scheuchLifeTime={scheuchLifeTime}
            currentDiffPressure={currentDiffPressure}
            scheuchDiffPressure={scheuchDiffPressure}
            currentAirConsumption={currentAirConsumption}
            scheuchAirConsumption={scheuchAirConsumption}
            currentMotorKW={currentMotorKW}
            scheuchMotorKW={scheuchMotorKW}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterOpexCalculator;
