
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
  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0,
  };

  const getCalculatedValues = () => {
    const parsedEMCFlaps = typeof numEMCFlaps === 'string' ? 
      (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : numEMCFlaps;
    
    // Calculate total bags differently based on design type
    let totalBags = 0;
    
    if (designType === 'bolt-weld') {
      // For bolt-weld design
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
    } else {
      // For modular design
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
    }
    
    let filterArea: number = 0;
    let netFilterArea: number = 0;
    
    if (designType === 'bolt-weld') {
      filterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * parsedEMCFlaps;
      netFilterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * (parsedEMCFlaps - 1);
    } else {
      filterArea = bagLength * bagsPerRow * parsedEMCFlaps * 5 * 1.6;
      netFilterArea = filterArea * 0.85;
    }
    
    let acRatioGross = 0;
    let acRatioNet = 0;
    
    const airVolume = designType === 'modular' 
      ? (parseFloat(airVolumeACFM) || 0)
      : (parseFloat(airVolumeM3h) || 0);
    
    if (filterArea > 0) {
      acRatioGross = airVolume / filterArea;
    }
    
    if (netFilterArea > 0) {
      acRatioNet = airVolume / netFilterArea;
    }
    
    let formattedFilterArea: string;
    let formattedNetFilterArea: string;
    let formattedAcRatioGross: string;
    let formattedAcRatioNet: string;
    
    if (designType === 'modular') {
      formattedFilterArea = `${filterArea.toFixed(2)} sq ft`;
      formattedNetFilterArea = `${netFilterArea.toFixed(2)} sq ft`;
      formattedAcRatioGross = `${acRatioGross.toFixed(2)} cfm/sq ft`;
      formattedAcRatioNet = `${acRatioNet.toFixed(2)} cfm/sq ft`;
    } else {
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

  const calculatedValues = getCalculatedValues();

  return (
    <Card className="p-4 h-fit">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        {designType === 'bolt-weld' 
          ? 'Design Parameters (Bolt/Weld)' 
          : 'Design Parameters (Modular Design)'}
      </h3>
      
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
