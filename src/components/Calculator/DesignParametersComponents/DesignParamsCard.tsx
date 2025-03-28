
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
  };
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
  };
  m2ToSqFtFactor: number;
  conversionFactor: number;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor
}) => {
  return (
    <Card className="p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Design Parameters</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Filter Area (Gross):</span>
          <span className="font-medium text-sm">{formattedResults.filterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Net Filter Area:</span>
          <span className="font-medium text-sm">{formattedResults.netFilterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Gross):</span>
          <span className="font-medium text-sm">{formattedResults.acRatioGross}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Net):</span>
          <span className="font-medium text-sm">{formattedResults.acRatioNet}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Number of Bags:</span>
          <span className="font-medium text-sm">{formattedResults.totalBags}</span>
        </div>
        
        <div className="mt-4 bg-blue-50 p-3 rounded-lg">
          <div className="text-gray-700 font-medium mb-2">EMC Cleaning Advantage</div>
          <p className="text-sm text-gray-600 mb-1">
            The EMC (Exact Mechanical Cleaning) system allows the calculation of the filter area based on the net area available during the cleaning cycles, providing a more efficient and accurate design.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DesignParamsCard;
