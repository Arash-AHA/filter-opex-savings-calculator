
import React from 'react';

interface DesignParamsCardProps {
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
  };
  results: {
    filterArea: number;
    netFilterArea: number;
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
    <div className="bg-blue-50/80 rounded-xl shadow-sm p-5 border border-blue-100 md:mt-0 mt-4">
      <h3 className="text-base font-medium text-center text-gray-700 mb-4 border-b pb-2">Design Parameters</h3>
      
      <div className="space-y-3 text-right">
        <div>
          <div className="text-sm text-gray-600">Total Filtration Area</div>
          <div className="text-lg font-semibold">{formattedResults.filterArea}</div>
          <div className="text-xs text-gray-500">({(results.filterArea * m2ToSqFtFactor).toFixed(2)} sq ft)</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-600">Net Area (EMC cleaning)</div>
          <div className="text-lg font-semibold">{formattedResults.netFilterArea}</div>
          <div className="text-xs text-gray-500">({(results.netFilterArea * m2ToSqFtFactor).toFixed(2)} sq ft)</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-600">A/C Ratio Gross</div>
          <div className="text-lg font-semibold">{formattedResults.acRatioGross}</div>
          <div className="text-xs text-gray-500">({(results.acRatioGross / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-600">A/C Ratio Net</div>
          <div className="text-lg font-semibold">{formattedResults.acRatioNet}</div>
          <div className="text-xs text-gray-500">({(results.acRatioNet / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)</div>
        </div>
      </div>
    </div>
  );
};

export default DesignParamsCard;
