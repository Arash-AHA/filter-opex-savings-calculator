
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
  bagLength?: number;
  airVolumeM3h?: string;
  airVolumeACFM?: string;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor,
  designType = 'bolt-weld',
  numEMCFlaps = 0,
  bagsPerRow = 0,
  bagLength = 0,
  airVolumeM3h = '',
  airVolumeACFM = ''
}) => {
  // Provide default values to prevent null reference errors
  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0,
  };

  // Calculate filter areas, A/C ratios and bags count directly based on design type and input parameters
  const getCalculatedValues = () => {
    const parsedEMCFlaps = typeof numEMCFlaps === 'string' ? 
      (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : numEMCFlaps;
    
    // Calculate total bags based on design type
    let totalBags = 0;
    if (designType === 'modular') {
      // For modular design, calculate total bags as EMC flaps * bags per row * 5
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
    } else {
      // For bolt-weld design, calculate total bags using formula
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
    }
    
    // Calculate filter areas based on design type and parameters
    let filterArea: number = 0;
    let netFilterArea: number = 0;
    
    if (designType === 'bolt-weld') {
      // Bolt-weld filter area calculation
      filterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * parsedEMCFlaps;
      netFilterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * (parsedEMCFlaps - 1);
    } else {
      // Modular filter area calculation
      filterArea = bagLength * bagsPerRow * parsedEMCFlaps * 5 * 1.6;
      netFilterArea = filterArea * 0.85; // Using 85% as the EMC cleaning factor
    }
    
    // Calculate A/C ratios
    let acRatioGross = 0;
    let acRatioNet = 0;
    
    // Get appropriate air volume based on design type
    const airVolume = designType === 'modular' 
      ? (parseFloat(airVolumeACFM) || 0)
      : (parseFloat(airVolumeM3h) || 0);
    
    if (filterArea > 0) {
      acRatioGross = airVolume / filterArea;
    }
    
    if (netFilterArea > 0) {
      acRatioNet = airVolume / netFilterArea;
    }
    
    // Format values according to design type
    let formattedFilterArea: string;
    let formattedNetFilterArea: string;
    let formattedAcRatioGross: string;
    let formattedAcRatioNet: string;
    
    if (designType === 'modular') {
      // Imperial units for modular design
      formattedFilterArea = `${filterArea.toFixed(2)} sq ft`;
      formattedNetFilterArea = `${netFilterArea.toFixed(2)} sq ft`;
      formattedAcRatioGross = `${acRatioGross.toFixed(2)} cfm/sq ft`;
      formattedAcRatioNet = `${acRatioNet.toFixed(2)} cfm/sq ft`;
    } else {
      // Metric units for bolt-weld design
      formattedFilterArea = `${filterArea.toFixed(2)} m²`;
      formattedNetFilterArea = `${netFilterArea.toFixed(2)} m²`;
      formattedAcRatioGross = `${(acRatioGross / 60).toFixed(2)} m³/min/m²`;
      formattedAcRatioNet = `${(acRatioNet / 60).toFixed(2)} m³/min/m²`;
    }
    
    return {
      totalBags,
      filterArea: formattedFilterArea,
      netFilterArea: formattedNetFilterArea,
      acRatioGross: formattedAcRatioGross,
      acRatioNet: formattedAcRatioNet
    };
  };

  // Get calculated values based on the current design type and parameters
  const calculatedValues = getCalculatedValues();

  return (
    <Card className="p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Design Parameters</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Filter Area (Gross):</span>
          <span className="font-medium text-sm">{calculatedValues.filterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Net Filter Area:</span>
          <span className="font-medium text-sm">{calculatedValues.netFilterArea}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Gross):</span>
          <span className="font-medium text-sm">{calculatedValues.acRatioGross}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Net):</span>
          <span className="font-medium text-sm">{calculatedValues.acRatioNet}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-1">
          <span className="text-gray-600 text-sm">Total Number of Bags:</span>
          <span className="font-medium text-sm">{calculatedValues.totalBags}</span>
        </div>
      </div>
    </Card>
  );
};

export default DesignParamsCard;
