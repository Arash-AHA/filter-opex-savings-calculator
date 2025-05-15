import React, { useState, useEffect, useCallback } from 'react';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import { useDesignParameters } from './hooks/useDesignParameters';
import { calculateResults, formatResults } from './hooks/utils/calculationUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const FilterOpexCalculator: React.FC = () => {
  const calculatorState = useDesignParameters();
  const [results, setResults] = useState<any>(null);
  const [formattedResults, setFormattedResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateAndSetResults = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const calculatedResults = calculateResults(calculatorState);
      const formatted = formatResults(calculatedResults, calculatorState.conversionFactor, calculatorState.m2ToSqFtFactor);
      setResults(calculatedResults);
      setFormattedResults(formatted);
      setIsLoading(false);
    }, 500);
  }, [calculatorState]);

  useEffect(() => {
    calculateAndSetResults();
  }, [
    calculatorState.designType,
    calculatorState.airVolumeM3h,
    calculatorState.airVolumeACFM,
    calculatorState.numEMCFlaps,
    calculatorState.bagsPerRow,
    calculatorState.bagLength,
    calculatorState.gasTempC,
    calculatorState.gasTempF,
    calculatorState.dustConcGramAm3,
    calculatorState.dustConcGrainACF,
    calculatorState.dustConcGramNm3,
    calculatorState.dustConcGrainSCF,
    calculatorState.outletDustKgH,
    calculatorState.outletDustLbH,
    calculatorState.targetEmissionMgNm3,
    calculatorState.targetEmissionGrainDscf,
    calculatorState.negativePressureMbar,
    calculatorState.negativePressureInchWG,
    calculatorState.filterRowType,
    calculatorState.channelWidthMm,
    calculatorState.channelHeightMm,
    calculateAndSetResults
  ]);

  const calculateTravelCost = (days: number) => {
    return days * calculatorState.travelCost;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Filter OPEX Calculator</CardTitle>
          <CardDescription>Enter your filter design parameters to calculate OPEX.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DesignParameters
            designType={calculatorState.designType}
            setDesignType={calculatorState.setDesignType}
            airVolumeM3h={calculatorState.airVolumeM3h}
            airVolumeACFM={calculatorState.airVolumeACFM}
            numEMCFlaps={calculatorState.numEMCFlaps}
            bagsPerRow={calculatorState.bagsPerRow}
            bagLength={calculatorState.bagLength}
            filterRowType={calculatorState.filterRowType}
            setFilterRowType={calculatorState.setFilterRowType}
            showDimensions={calculatorState.showDimensions}
            setShowDimensions={calculatorState.setShowDimensions}
            showOtherParams={calculatorState.showOtherParams}
            setShowOtherParams={calculatorState.setShowOtherParams}
            channelWidthMm={calculatorState.channelWidthMm}
            setChannelWidthMm={calculatorState.setChannelWidthMm}
            channelHeightMm={calculatorState.channelHeightMm}
            setChannelHeightMm={calculatorState.setChannelHeightMm}
            handleAirVolumeM3hChange={calculatorState.handleAirVolumeM3hChange}
            handleAirVolumeACFMChange={calculatorState.handleAirVolumeACFMChange}
            setNumEMCFlaps={calculatorState.setNumEMCFlaps}
            setBagsPerRow={calculatorState.setBagsPerRow}
            setBagLength={calculatorState.setBagLength}
            formattedResults={formattedResults}
            results={results}
            m2ToSqFtFactor={calculatorState.m2ToSqFtFactor}
            conversionFactor={calculatorState.conversionFactor}
            // Additional parameters
            gasTempC={calculatorState.gasTempC}
            gasTempF={calculatorState.gasTempF}
            dustConcGramAm3={calculatorState.dustConcGramAm3}
            dustConcGrainACF={calculatorState.dustConcGrainACF}
            dustConcGramNm3={calculatorState.dustConcGramNm3}
            dustConcGrainSCF={calculatorState.dustConcGrainSCF}
            handleGasTempCChange={calculatorState.handleGasTempCChange}
            handleGasTempFChange={calculatorState.handleGasTempFChange}
            handleDustConcGramAm3Change={calculatorState.handleDustConcGramAm3Change}
            handleDustConcGrainACFChange={calculatorState.handleDustConcGrainACFChange}
            handleDustConcGramNm3Change={calculatorState.handleDustConcGramNm3Change}
            handleDustConcGrainSCFChange={calculatorState.handleDustConcGrainSCFChange}
            // Outlet dust parameters
            outletDustKgH={calculatorState.outletDustKgH}
            outletDustLbH={calculatorState.outletDustLbH}
            handleOutletDustKgHChange={calculatorState.handleOutletDustKgHChange}
            handleOutletDustLbHChange={calculatorState.handleOutletDustLbHChange}
            estimateOutletDust={calculatorState.estimateOutletDust}
            // Target emission parameters
            targetEmissionMgNm3={calculatorState.targetEmissionMgNm3}
            targetEmissionGrainDscf={calculatorState.targetEmissionGrainDscf}
            handleTargetEmissionMgNm3Change={calculatorState.handleTargetEmissionMgNm3Change}
            handleTargetEmissionGrainDscfChange={calculatorState.handleTargetEmissionGrainDscfChange}
            // Negative pressure parameters
            negativePressureMbar={calculatorState.negativePressureMbar}
            negativePressureInchWG={calculatorState.negativePressureInchWG}
            handleNegativePressureMbarChange={calculatorState.handleNegativePressureMbarChange}
            handleNegativePressureInchWGChange={calculatorState.handleNegativePressureInchWGChange}
          />

          {isLoading ? (
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ) : (
            <FilterBagReplacement 
              designType={calculatorState.designType} 
              numEMCFlaps={calculatorState.numEMCFlaps} 
              filterArea={calculatorState.filterResults.totalFilterArea} 
              daysToReplace={calculatorState.daysToReplace} 
              setDaysToReplace={calculatorState.setDaysToReplace} 
              laborCostPerHour={calculatorState.laborCostPerHour} 
              setLaborCostPerHour={calculatorState.setLaborCostPerHour} 
              travelCost={calculatorState.travelCost} 
              setTravelCost={calculatorState.setTravelCost} 
              bagReplacementCost={calculatorState.bagReplacementCost} 
              setBagReplacementCost={calculatorState.setBagReplacementCost} 
              calculateTravelCost={calculateTravelCost} 
              formattedResults={calculatorState.formattedResults} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterOpexCalculator;
