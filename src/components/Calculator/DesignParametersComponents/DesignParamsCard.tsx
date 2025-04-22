
import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import PrintableDesignParams from './PrintableDesignParams';

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

  // State for Dialog open/close
  const [open, setOpen] = useState(false);
  // Ref for printable section
  const printContentRef = useRef<HTMLDivElement>(null);

  const getCalculatedValues = () => {
    const parsedEMCFlaps = typeof numEMCFlaps === 'string'
      ? (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps))
      : numEMCFlaps;

    // Calculate total bags differently based on design type
    let totalBags = 0;
    let filterArea: number = 0;
    let netFilterArea: number = 0;

    if (designType === 'bolt-weld') {
      // For bolt-weld design
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
      filterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * parsedEMCFlaps;
      netFilterArea = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * (parsedEMCFlaps - 1);
    } else {
      // For modular design (updated as per new formula)
      totalBags = parsedEMCFlaps * bagsPerRow * 5;
      filterArea = bagLength * bagsPerRow * parsedEMCFlaps * 5 * 1.6;
      netFilterArea = bagLength * bagsPerRow * (parsedEMCFlaps - 1) * 5 * 1.6;
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
      filterArea,
      netFilterArea,
      formattedFilterArea,
      formattedNetFilterArea,
      formattedAcRatioGross,
      formattedAcRatioNet,
      parsedEMCFlaps
    };
  };

  const calculatedValues = getCalculatedValues();

  // Handler to print only the modal content
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

  return (
    <>
      <Card className="p-4 h-fit">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          {designType === 'bolt-weld'
            ? 'Design Parameters (Bolt/Weld)'
            : 'Design Parameters (Modular Design)'}
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 text-sm">Filter Area (Gross):</span>
            <span className="font-medium text-sm">{calculatedValues.formattedFilterArea}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1 items-start">
            <span className="text-gray-600 text-sm">
              {designType === 'modular'
                ? 'Net Filter Area:(Cleaning)'
                : 'Net Filter Area:'}
            </span>
            <span className="font-medium text-sm flex flex-col items-end">
              {calculatedValues.formattedNetFilterArea}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Gross):</span>
            <span className="font-medium text-sm">{calculatedValues.formattedAcRatioGross}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 text-sm">Air-to-Cloth Ratio (Net):</span>
            <span className="font-medium text-sm">{calculatedValues.formattedAcRatioNet}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 text-sm">Total Number of Bags:</span>
            <span className="font-medium text-sm">{calculatedValues.totalBags}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-6 flex items-center justify-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Printer size={18} className="mr-1" />
          Print
        </Button>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Printable Filter Design Information</DialogTitle>
            <DialogDescription>
              Print or save as PDF by using your browser’s print options.
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
            />
          </div>
          <Button
            variant="default"
            onClick={handlePrint}
            className="mt-4 w-full"
          >
            <Printer className="mr-2" size={16} /> Print as PDF
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignParamsCard;
