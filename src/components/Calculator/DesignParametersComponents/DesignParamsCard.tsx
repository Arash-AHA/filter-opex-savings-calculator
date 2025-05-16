
import React, { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import CardHeader from './CardHeader';
import ParameterRow from './ParameterRow';
import PrintButton from './PrintButton';
import PrintableDesignParams from './PrintableDesignParams';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DesignParamsCardProps {
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
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
  onEraseInputs?: () => void;
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  designType = 'bolt-weld',
  numEMCFlaps = 0,
  bagsPerRow = 0,
  bagLength = 0,
  airVolumeM3h = '',
  airVolumeACFM = '',
  onEraseInputs
}) => {
  const [open, setOpen] = useState(false);
  const printContentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const safeResults = formattedResults || {
    filterArea: '-',
    netFilterArea: '-',
    acRatioGross: '-',
    acRatioNet: '-',
    totalBags: 0,
  };

  const handlePrint = () => {
    if (printContentRef.current) {
      const printContents = printContentRef.current.innerHTML;
      const win = window.open('', '', 'height=650,width=900,top=100,left=150');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Filter Design Configuration</title>
              <style>
                body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 24px; }
                table { width: 100%; border-collapse: collapse; }
                td { border-bottom: 1px solid #e5e7eb; padding: 8px 4px; }
                th { font-weight: 600; }
                h2, h3 { margin-bottom: 10px; margin-top: 0; }
              </style>
            </head>
            <body>${printContents}</body>
          </html>
        `);
        win.document.close();
        win.focus();
        setTimeout(() => {
          win.print();
          win.close();
        }, 400);
      }
    }
  };

  const handleEraseInputs = () => {
    if (onEraseInputs) {
      setIsRefreshing(true);
      onEraseInputs();
      toast({
        title: "Inputs cleared",
        description: "Design inputs have been reset.",
      });
      
      // Add a slight delay before closing the dialog and resetting refresh state
      setTimeout(() => {
        setOpen(false);
        setIsRefreshing(false);
      }, 300);
    }
  };

  // Visual effect for refreshing state
  useEffect(() => {
    if (isRefreshing) {
      const timer = setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  return (
    <>
      <Card className="p-4 h-fit">
        <CardHeader designType={designType} />
        <div className="space-y-3">
          <ParameterRow label="Filter Area (Gross):" value={safeResults.filterArea} />
          <ParameterRow label="Net Filter Area:(Cleaning)" value={safeResults.netFilterArea} />
          <ParameterRow label="Air-to-Cloth Ratio (Gross):" value={safeResults.acRatioGross} />
          <ParameterRow label="Air-to-Cloth Ratio (Net):" value={safeResults.acRatioNet} />
          <ParameterRow label="Total Number of Bags:" value={safeResults.totalBags} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <PrintButton onClick={() => setOpen(true)} />
          {onEraseInputs && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEraseInputs}
              className="flex items-center gap-1"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Resetting...' : 'Reset'}
            </Button>
          )}
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Printable Filter Design Information</DialogTitle>
            <DialogDescription>
              Print or save as PDF by using your browser's print options.
            </DialogDescription>
          </DialogHeader>
          <div ref={printContentRef} className="max-h-[70vh] overflow-auto bg-white p-0 rounded-md">
            <PrintableDesignParams
              designType={designType}
              numEMCFlaps={numEMCFlaps}
              bagsPerRow={bagsPerRow}
              bagLength={bagLength}
              airVolumeM3h={airVolumeM3h}
              airVolumeACFM={airVolumeACFM}
              formattedResults={formattedResults}
              onEraseInputs={handleEraseInputs}
            />
          </div>
          <div className="flex justify-between">
            <PrintButton onClick={handlePrint} />
            {onEraseInputs && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEraseInputs}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Inputs
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignParamsCard;
