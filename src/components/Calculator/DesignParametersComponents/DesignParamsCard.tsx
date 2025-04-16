
import React from 'react';
import { Card } from '@/components/ui/card';

interface DesignParamsCardProps {
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    baselinePower: string;
    improvedPower: string;
    totalBags: number;
    daysToReplace: string;
    bagMaterialCost: number;
    tenYearSavings: string;
    lifeExtension: string;
  } | null;
  results: {
    filterArea: number;
    netFilterArea: number;
    acRatioGross: number;
    acRatioNet: number;
    baselinePower: number;
    improvedPower: number;
    annualSavings: number;
    totalBags: number;
    daysToReplace: number;
    totalReplacementCost: number;
    tenYearSavings: number;
    lifeExtension: number;
    compressedAirSavings: number;
  } | null;
  m2ToSqFtFactor: number;
  conversionFactor: number;
  designType?: string;
  numEMCFlaps?: number | string;
  bagsPerRow?: number;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor,
  designType = 'bolt-weld',
  numEMCFlaps = 0,
  bagsPerRow = 0
}) => {
  // Provide default values to prevent null reference errors
  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0,
  };

  // Calculate total bags, filter areas and A/C ratios based on design type
  const getAdjustedValues = () => {
    const FIXED_MODULAR_BAGS = 15;
    const parsedEMCFlaps = typeof numEMCFlaps === 'string' ? 
      (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : 
      numEMCFlaps;
    
    if (designType === 'modular') {
      // For modular design, use fixed value of 15 bags
      const totalBags = FIXED_MODULAR_BAGS;
      
      // Recalculate filter areas based on the fixed bag count
      let filterArea = '';
      let netFilterArea = '';
      let acRatioGross = '';
      let acRatioNet = '';
      
      // If results are available, recalculate areas and ratios
      if (results) {
        // For modular design, area per bag is directly in sq.ft
        const areaPerBag = bagsPerRow ? (bagsPerRow * 1.6) : 0;
        const totalFilterArea = areaPerBag * parsedEMCFlaps * 5;
        const totalNetFilterArea = totalFilterArea * 0.85; // Using 85% as the EMC cleaning factor
        
        // Format values according to the current display format
        const airVolume = results.acRatioGross * results.filterArea;
        
        if (safeResults.filterArea.includes('sq ft')) {
          // Imperial units
          filterArea = `${totalFilterArea.toFixed(2)} sq ft`;
          netFilterArea = `${totalNetFilterArea.toFixed(2)} sq ft`;
          
          // Recalculate A/C ratios with the new areas
          const newAcRatioGross = totalFilterArea > 0 ? airVolume / totalFilterArea : 0;
          const newAcRatioNet = totalNetFilterArea > 0 ? airVolume / totalNetFilterArea : 0;
          
          acRatioGross = `${newAcRatioGross.toFixed(2)} cfm/sq ft`;
          acRatioNet = `${newAcRatioNet.toFixed(2)} cfm/sq ft`;
        } else {
          // Metric units
          filterArea = `${(totalFilterArea / m2ToSqFtFactor).toFixed(2)} m²`;
          netFilterArea = `${(totalNetFilterArea / m2ToSqFtFactor).toFixed(2)} m²`;
          
          // Recalculate A/C ratios with the new areas
          const airVolumeMetric = airVolume / conversionFactor;
          const totalFilterAreaMetric = totalFilterArea / m2ToSqFtFactor;
          const totalNetFilterAreaMetric = totalNetFilterArea / m2ToSqFtFactor;
          
          const newAcRatioGross = totalFilterAreaMetric > 0 ? (airVolumeMetric / 60) / totalFilterAreaMetric : 0;
          const newAcRatioNet = totalNetFilterAreaMetric > 0 ? (airVolumeMetric / 60) / totalNetFilterAreaMetric : 0;
          
          acRatioGross = `${newAcRatioGross.toFixed(2)} m³/min/m²`;
          acRatioNet = `${newAcRatioNet.toFixed(2)} m³/min/m²`;
        }
      } else {
        // If no results, use default values
        filterArea = safeResults.filterArea;
        netFilterArea = safeResults.netFilterArea;
        acRatioGross = safeResults.acRatioGross;
        acRatioNet = safeResults.acRatioNet;
      }
      
      return {
        totalBags,
        filterArea,
        netFilterArea,
        acRatioGross,
        acRatioNet
      };
    }
    
    // For bolt-weld design, use original values
    return {
      totalBags: safeResults.totalBags,
      filterArea: safeResults.filterArea,
      netFilterArea: safeResults.netFilterArea,
      acRatioGross: safeResults.acRatioGross,
      acRatioNet: safeResults.acRatioNet
    };
  };

  const adjustedValues = getAdjustedValues();

  return (
    <Card className="p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Design Parameters</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Filter Area (Gross):</span>
          <span className="font-medium text-sm">{adjustedValues.filterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Net Filter Area:</span>
          <span className="font-medium text-sm">{adjustedValues.netFilterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Gross):</span>
          <span className="font-medium text-sm">{adjustedValues.acRatioGross}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Net):</span>
          <span className="font-medium text-sm">{adjustedValues.acRatioNet}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Total Number of Bags:</span>
          <span className="font-medium text-sm">{adjustedValues.totalBags}</span>
        </div>
      </div>
    </Card>
  );
};

export default DesignParamsCard;
