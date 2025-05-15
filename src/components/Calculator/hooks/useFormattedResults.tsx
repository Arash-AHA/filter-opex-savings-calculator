import { useMemo } from 'react';
import { formatCurrency } from './utils/calculationUtils';

interface FilterResults {
  filterArea: number;
  netFilterArea: number;
  acRatioGross: number;
  acRatioNet: number;
}

interface BagResults {
  totalBags: number;
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
  const formattedResults = useMemo(() => {
    try {
      const filterAreaDisplay = designType === 'bolt-weld'
        ? `${filterResults?.filterArea?.toFixed(2)} m²`
        : `${(filterResults?.filterArea * m2ToSqFtFactor).toFixed(2)} sq ft`;

      const netFilterAreaDisplay = designType === 'bolt-weld'
        ? `${filterResults?.netFilterArea?.toFixed(2)} m²`
        : `${(filterResults?.netFilterArea * m2ToSqFtFactor).toFixed(2)} sq ft`;

      const acRatioGrossDisplay = designType === 'bolt-weld'
        ? `${filterResults?.acRatioGross?.toFixed(2)} m³/min/m²`
        : `${filterResults?.acRatioGross?.toFixed(2)} ft/min`;

      const acRatioNetDisplay = designType === 'bolt-weld'
        ? `${filterResults?.acRatioNet?.toFixed(2)} m³/min/m²`
        : `${filterResults?.acRatioNet?.toFixed(2)} ft/min`;

      return {
        filterArea: filterAreaDisplay,
        netFilterArea: netFilterAreaDisplay,
        acRatioGross: acRatioGrossDisplay,
        acRatioNet: acRatioNetDisplay,
        totalBags: bagResults?.totalBags?.toLocaleString(),
      };
    } catch (error) {
      console.error("Error formatting results:", error);
      return {
        filterArea: 'Error',
        netFilterArea: 'Error',
        acRatioGross: 'Error',
        acRatioNet: 'Error',
        totalBags: 'Error',
      };
    }
  }, [designType, filterResults, bagResults, m2ToSqFtFactor]);

  return formattedResults;
};
