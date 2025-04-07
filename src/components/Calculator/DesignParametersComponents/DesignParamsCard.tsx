
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
  } | null;  // Make formattedResults nullable
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
  } | null;  // Make results nullable
  m2ToSqFtFactor: number;
  conversionFactor: number;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor
}) => {
  // Check if formattedResults is null or undefined
  // Provide default values to prevent null reference errors
  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0,
  };

  return (
    <Card className="p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Design Parameters</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Filter Area (Gross):</span>
          <span className="font-medium text-sm">{safeResults.filterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Net Filter Area:</span>
          <span className="font-medium text-sm">{safeResults.netFilterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Gross):</span>
          <span className="font-medium text-sm">{safeResults.acRatioGross}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Net):</span>
          <span className="font-medium text-sm">{safeResults.acRatioNet}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Number of Bags:</span>
          <span className="font-medium text-sm">{safeResults.totalBags}</span>
        </div>
      </div>
    </Card>
  );
};

export default DesignParamsCard;
