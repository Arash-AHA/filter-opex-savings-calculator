
import { useMemo } from 'react';
import { useDesignParameters } from '../../Calculator/hooks/useDesignParameters';
import { useFilterAreaCalculation } from '../../Calculator/hooks/useFilterAreaCalculation';
import { useFormattedResults } from '../../Calculator/hooks/useFormattedResults';

export const useBaghouseDesignState = () => {
  const designParameters = useDesignParameters();
  
  // Calculate filter results
  const filterResults = useFilterAreaCalculation(
    designParameters.designType,
    designParameters.bagLength,
    designParameters.bagsPerRow,
    typeof designParameters.numEMCFlaps === 'string' ? 
      (designParameters.numEMCFlaps === '' ? 0 : parseInt(designParameters.numEMCFlaps)) : 
      designParameters.numEMCFlaps,
    designParameters.emcCleaningFactor,
    designParameters.airVolumeM3h,
    designParameters.airVolumeACFM  // Add the missing 7th argument
  );
  
  // Simplified results object with only filter design related properties
  const results = {
    ...filterResults,
    totalBags: typeof designParameters.numEMCFlaps === 'string' ?
      (designParameters.numEMCFlaps === '' ? 0 : parseInt(designParameters.numEMCFlaps)) * 5 * designParameters.bagsPerRow :
      designParameters.numEMCFlaps * 5 * designParameters.bagsPerRow,
    // Adding placeholder values for other required fields that aren't needed for baghouse design
    baselinePower: 0,
    improvedPower: 0,
    annualSavings: 0,
    daysToReplace: 0,
    totalReplacementCost: 0,
    tenYearSavings: 0,
    lifeExtension: 0,
    compressedAirSavings: 0
  };

  // Format results
  const formattedResults = useFormattedResults(
    results,
    designParameters.m2ToSqFtFactor,
    designParameters.designType
  );

  return {
    ...designParameters,
    results,
    formattedResults
  };
};
