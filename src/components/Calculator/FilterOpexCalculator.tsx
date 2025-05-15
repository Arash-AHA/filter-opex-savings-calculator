
import React, { useState, useEffect, useCallback } from 'react';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import { useDesignParameters } from './hooks/useDesignParameters';
import { useCalculatorState } from './hooks/useCalculatorState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const FilterOpexCalculator: React.FC = () => {
  const designParameters = useDesignParameters();
  const calculatorState = useCalculatorState();
  const [results, setResults] = useState<any>(null);
  const [formattedResults, setFormattedResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateAndSetResults = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(calculatorState.results);
      setFormattedResults(calculatorState.formattedResults);
      setIsLoading(false);
    }, 500);
  }, [calculatorState.results, calculatorState.formattedResults]);

  useEffect(() => {
    calculateAndSetResults();
  }, [
    designParameters.designType,
    designParameters.airVolumeM3h,
    designParameters.airVolumeACFM,
    designParameters.numEMCFlaps,
    designParameters.bagsPerRow,
    designParameters.bagLength,
    designParameters.gasTempC,
    designParameters.gasTempF,
    designParameters.dustConcGramAm3,
    designParameters.dustConcGrainACF,
    designParameters.dustConcGramNm3,
    designParameters.dustConcGrainSCF,
    designParameters.outletDustKgH,
    designParameters.outletDustLbH,
    designParameters.targetEmissionMgNm3,
    designParameters.targetEmissionGrainDscf,
    designParameters.negativePressureMbar,
    designParameters.negativePressureInchWG,
    designParameters.filterRowType,
    designParameters.channelWidthMm,
    designParameters.channelHeightMm,
    calculateAndSetResults
  ]);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Filter OPEX Calculator</CardTitle>
          <CardDescription>Enter your filter design parameters to calculate OPEX.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DesignParameters
            designType={designParameters.designType}
            setDesignType={designParameters.setDesignType}
            airVolumeM3h={designParameters.airVolumeM3h}
            airVolumeACFM={designParameters.airVolumeACFM}
            numEMCFlaps={designParameters.numEMCFlaps}
            bagsPerRow={designParameters.bagsPerRow}
            bagLength={designParameters.bagLength}
            filterRowType={designParameters.filterRowType}
            setFilterRowType={designParameters.setFilterRowType}
            showDimensions={designParameters.showDimensions}
            setShowDimensions={designParameters.setShowDimensions}
            showOtherParams={designParameters.showOtherParams}
            setShowOtherParams={designParameters.setShowOtherParams}
            channelWidthMm={designParameters.channelWidthMm}
            setChannelWidthMm={designParameters.setChannelWidthMm}
            channelHeightMm={designParameters.channelHeightMm}
            setChannelHeightMm={designParameters.setChannelHeightMm}
            handleAirVolumeM3hChange={designParameters.handleAirVolumeM3hChange}
            handleAirVolumeACFMChange={designParameters.handleAirVolumeACFMChange}
            setNumEMCFlaps={designParameters.setNumEMCFlaps}
            setBagsPerRow={designParameters.setBagsPerRow}
            setBagLength={designParameters.setBagLength}
            formattedResults={formattedResults}
            results={results}
            m2ToSqFtFactor={designParameters.m2ToSqFtFactor}
            conversionFactor={designParameters.conversionFactor}
            // Additional parameters
            gasTempC={designParameters.gasTempC}
            gasTempF={designParameters.gasTempF}
            dustConcGramAm3={designParameters.dustConcGramAm3}
            dustConcGrainACF={designParameters.dustConcGrainACF}
            dustConcGramNm3={designParameters.dustConcGramNm3}
            dustConcGrainSCF={designParameters.dustConcGrainSCF}
            handleGasTempCChange={designParameters.handleGasTempCChange}
            handleGasTempFChange={designParameters.handleGasTempFChange}
            handleDustConcGramAm3Change={designParameters.handleDustConcGramAm3Change}
            handleDustConcGrainACFChange={designParameters.handleDustConcGrainACFChange}
            handleDustConcGramNm3Change={designParameters.handleDustConcGramNm3Change}
            handleDustConcGrainSCFChange={designParameters.handleDustConcGrainSCFChange}
            // Outlet dust parameters
            outletDustKgH={designParameters.outletDustKgH}
            outletDustLbH={designParameters.outletDustLbH}
            handleOutletDustKgHChange={designParameters.handleOutletDustKgHChange}
            handleOutletDustLbHChange={designParameters.handleOutletDustLbHChange}
            estimateOutletDust={designParameters.estimateOutletDust}
            // Target emission parameters
            targetEmissionMgNm3={designParameters.targetEmissionMgNm3}
            targetEmissionGrainDscf={designParameters.targetEmissionGrainDscf}
            handleTargetEmissionMgNm3Change={designParameters.handleTargetEmissionMgNm3Change}
            handleTargetEmissionGrainDscfChange={designParameters.handleTargetEmissionGrainDscfChange}
            // Negative pressure parameters
            negativePressureMbar={designParameters.negativePressureMbar}
            negativePressureInchWG={designParameters.negativePressureInchWG}
            handleNegativePressureMbarChange={designParameters.handleNegativePressureMbarChange}
            handleNegativePressureInchWGChange={designParameters.handleNegativePressureInchWGChange}
          />

          {isLoading ? (
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ) : (
            <FilterBagReplacement 
              bagPrice={calculatorState.bagPrice}
              setBagPrice={calculatorState.setBagPrice}
              cagePrice={calculatorState.cagePrice}
              setCagePrice={calculatorState.setCagePrice}
              bagChangeTime={calculatorState.bagChangeTime}
              setBagChangeTime={calculatorState.setBagChangeTime}
              numPeople={calculatorState.numPeople}
              setNumPeople={calculatorState.setNumPeople}
              hourlyRate={calculatorState.hourlyRate}
              setHourlyRate={calculatorState.setHourlyRate}
              siteDistance={calculatorState.siteDistance}
              setSiteDistance={calculatorState.setSiteDistance}
              travelCost={calculatorState.travelCost}
              setTravelCost={calculatorState.setTravelCost}
              bagReplacementCost={calculatorState.bagReplacementCost}
              setBagReplacementCost={calculatorState.setBagReplacementCost}
              calculateTravelCost={() => calculatorState.calculateTravelCost(calculatorState.bagResults?.daysToReplace || 0)}
              formattedResults={formattedResults || {
                totalBags: 0,
                daysToReplace: "0.00",
                bagMaterialCost: 0,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterOpexCalculator;
