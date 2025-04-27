
import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CardHeader from './CardHeader';
import ParameterRow from './ParameterRow';
import PrintButton from './PrintButton';
import PrintableDesignParams from './PrintableDesignParams';

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
}

const DesignParamsCard: React.FC<DesignParamsCardProps> = ({
  formattedResults,
  results,
  designType = 'bolt-weld',
  numEMCFlaps = 0,
  bagsPerRow = 0,
  bagLength = 0,
  airVolumeM3h = '',
  airVolumeACFM = ''
}) => {
  const [open, setOpen] = useState(false);
  const printContentRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Card className="p-4 h-fit min-w-[250px]"> {/* Added min-width */}
        <CardHeader designType={designType} />
        <div className="space-y-3">
          <ParameterRow label="Filter Area (Gross):" value={safeResults.filterArea} />
          <ParameterRow label="Net Filter Area:(Cleaning)" value={safeResults.netFilterArea} />
          <ParameterRow label="Air-to-Cloth Ratio (Gross):" value={safeResults.acRatioGross} />
          <ParameterRow label="Air-to-Cloth Ratio (Net):" value={safeResults.acRatioNet} />
          <ParameterRow label="Total Number of Bags:" value={safeResults.totalBags} />
        </div>
        <PrintButton onClick={() => setOpen(true)} />
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
            />
          </div>
          <PrintButton onClick={handlePrint} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignParamsCard;
