
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface DesignParamsCardProps {
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
  } | null;
  designType: string;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  designType
}) => {
  const handlePrint = () => {
    window.print();
  };

  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0
  };

  return (
    <Card className="p-6 min-w-[400px] w-full">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Design Parameters ({designType === 'bolt-weld' ? 'Bolt/Weld' : 'Modular Design'})
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Filter Area (Gross):</span>
            <span>{safeResults.filterArea}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Net Filter Area:</span>
            <span>{safeResults.netFilterArea}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Air-to-Cloth Ratio (Gross):</span>
            <span>{safeResults.acRatioGross}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Air-to-Cloth Ratio (Net):</span>
            <span>{safeResults.acRatioNet}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Total Number of Bags:</span>
            <span>{safeResults.totalBags}</span>
          </div>
        </div>

        <Button 
          onClick={handlePrint}
          variant="outline" 
          className="w-full mt-4 flex items-center justify-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </Card>
  );
};

export default DesignParamsCard;
