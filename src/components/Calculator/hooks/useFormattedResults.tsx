
import { useMemo } from 'react';

export interface FilterResults {
  filterArea: number;
  netFilterArea: number;
  acRatioGross: number;
  acRatioNet: number;
  baselinePower: number;
  improvedPower: number;
}

export interface BagResults {
  totalBags: number;
  daysToReplace: number;
}

export interface LifetimeResults {
  lifeExtension: number;
}

export const useFormattedResults = (
  designType: string,
  filterResults: FilterResults,
  bagResults: BagResults,
  lifeExtension: number,
  bagPrice: number,
  m2ToSqFtFactor: number,
  conversionFactor: number
) => {
  // Formatted results
  const formattedResults = useMemo(() => {
    try {
      if (!filterResults || !bagResults) {
        // Return default values if input results are not available
        return null;
      }
      
      if (designType === 'bolt-weld') {
        // Metric units - divide A/C ratios by 60 and change unit to m³/min/m²
        return {
          filterArea: `${filterResults.filterArea.toFixed(2)} m²`,
          netFilterArea: `${filterResults.netFilterArea.toFixed(2)} m²`,
          acRatioGross: `${(filterResults.acRatioGross / 60).toFixed(2)} m³/min/m²`,
          acRatioNet: `${(filterResults.acRatioNet / 60).toFixed(2)} m³/min/m²`,
          baselinePower: `${filterResults.baselinePower.toFixed(2)} kW`,
          improvedPower: `${filterResults.improvedPower.toFixed(2)} kW`,
          totalBags: bagResults.totalBags,
          daysToReplace: bagResults.daysToReplace.toFixed(2),
          bagMaterialCost: bagResults.totalBags * bagPrice,
          tenYearSavings: `${Number(0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
          lifeExtension: `${lifeExtension} months`
        };
      } else {
        // Imperial units - for modular design, values are already in sq ft, no conversion needed
        return {
          filterArea: `${filterResults.filterArea.toFixed(2)} sq ft`,
          netFilterArea: `${filterResults.netFilterArea.toFixed(2)} sq ft`,
          acRatioGross: `${filterResults.acRatioGross.toFixed(2)} cfm/sq ft`,
          acRatioNet: `${filterResults.acRatioNet.toFixed(2)} cfm/sq ft`,
          baselinePower: `${filterResults.baselinePower.toFixed(2)} kW`,
          improvedPower: `${filterResults.improvedPower.toFixed(2)} kW`,
          totalBags: bagResults.totalBags,
          daysToReplace: bagResults.daysToReplace.toFixed(2),
          bagMaterialCost: bagResults.totalBags * bagPrice,
          tenYearSavings: `${Number(0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
          lifeExtension: `${lifeExtension} months`
        };
      }
    } catch (error) {
      console.error("Error formatting results:", error);
      // Return null if formatting fails
      return null;
    }
  }, [
    designType, filterResults, bagResults, lifeExtension, 
    bagPrice, m2ToSqFtFactor, conversionFactor
  ]);

  return formattedResults;
};
