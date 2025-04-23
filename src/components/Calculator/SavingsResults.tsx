import React, { useRef, useState } from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Printer } from 'lucide-react';
import PrintableResults from './PrintableResults';

interface SavingsResultsProps {
  savingYears: number;
  setSavingYears: (value: number) => void;
  workingHours: number;
  setWorkingHours: (value: number) => void;
  kwhCost: number;
  setKwhCost: (value: number) => void;
  compressedAirCost: string;
  setCompressedAirCost: (value: string) => void;
  totalSavings: {
    bagSavings: number;
    fanPowerSavings: number;
    airSavings: number;
    total: number;
  };
  currentLifeTime: number;
  scheuchLifeTime: number;
  currentDiffPressure: number;
  scheuchDiffPressure: number;
  currentAirConsumption: number;
  scheuchAirConsumption: number;
  currentMotorKW: number;
  scheuchMotorKW: number;
  designType: string;
  airVolumeM3h: number;
  airVolumeACFM: number;
  numEMCFlaps: number;
  bagLength: number;
  formattedResults: {
    filterArea: number;
    netFilterArea: number;
    acRatioGross: number;
    acRatioNet: number;
    totalBags: number;
  };
}

const SavingsResults: React.FC<SavingsResultsProps> = ({
  savingYears,
  setSavingYears,
  workingHours,
  setWorkingHours,
  kwhCost,
  setKwhCost,
  compressedAirCost,
  setCompressedAirCost,
  totalSavings,
  currentLifeTime,
  scheuchLifeTime,
  currentDiffPressure,
  scheuchDiffPressure,
  currentAirConsumption,
  scheuchAirConsumption,
  currentMotorKW,
  scheuchMotorKW,
  designType,
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagLength,
  formattedResults
}) => {
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const printContentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printContentRef.current) {
      const printContents = printContentRef.current.innerHTML;
      const win = window.open('', '', 'height=650,width=900,top=100,left=150');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>OPEX Savings Analysis</title>
              <style>
                body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 24px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                section { margin-bottom: 2rem; }
                h2 { color: #374151; margin-bottom: 1rem; }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Calculation Parameters</h3>
          
          <InputField
            label="Saving in x years:"
            value={savingYears}
            onChange={(value) => setSavingYears(parseInt(value) || 0)}
            type="number"
            min={1}
            className="mb-6"
          />
          
          <InputField
            label="Working hours per year:"
            value={workingHours}
            onChange={(value) => setWorkingHours(parseInt(value) || 0)}
            type="number"
            min={1}
            className="mb-6"
          />
          
          <InputField
            label="USD per kWh for plant:"
            value={kwhCost}
            onChange={(value) => setKwhCost(parseFloat(value) || 0)}
            type="number"
            min={0}
            step={0.01}
            className="mb-6"
          />
          
          <InputField
            label="USD/Nm³ from Plant Network:"
            value={compressedAirCost}
            onChange={(value) => setCompressedAirCost(value)}
            type="number"
            min={0}
            step={0.01}
            placeholder="Leave empty if not available"
          />
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b">Improvement Metrics</h3>
              
              <div className="space-y-4">
                <ResultCard
                  label="Bag Life Time Extension"
                  value={`${(scheuchLifeTime - currentLifeTime)} months (${((scheuchLifeTime - currentLifeTime) / currentLifeTime * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Differential Pressure"
                  value={`${(currentDiffPressure - scheuchDiffPressure)} mbar (${((currentDiffPressure - scheuchDiffPressure) / currentDiffPressure * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Compressed Air"
                  value={`${(currentAirConsumption - scheuchAirConsumption)} Nm³/h (${((currentAirConsumption - scheuchAirConsumption) / currentAirConsumption * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Motor KW"
                  value={`${(currentMotorKW - scheuchMotorKW)} kW (${((currentMotorKW - scheuchMotorKW) / currentMotorKW * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
              <h3 className="text-center text-sm font-medium text-gray-700 mb-4 pb-2 border-b">OPEX Savings in {savingYears} years</h3>
              
              <div className="space-y-4">
                <ResultCard
                  label="Bag Material and Labor"
                  value={`$${totalSavings.bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Savings $ in Fan Power Consumption"
                  value={`$${totalSavings.fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Savings $ in Compressed Air"
                  value={`$${totalSavings.airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                <ResultCard
                  label={`Total Savings in ${savingYears} years`}
                  value={`$${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  valueClassName="text-xl font-bold text-green-600"
                  className="bg-transparent shadow-none border-0 p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <div className="flex justify-center">
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl max-w-2xl text-center">
            <h3 className="text-xl font-medium text-green-800 mb-4">Total Estimated Savings</h3>
            <div className="text-4xl font-bold text-green-700 mb-1">${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            <div className="text-sm text-green-600">Over {savingYears} years of operation with EMC technology</div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowPrintDialog(true)}
          >
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
        </div>
      </div>

      <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
        <DialogContent className="max-w-3xl">
          <div ref={printContentRef}>
            <PrintableResults
              designType={designType}
              airVolume={designType === 'modular' ? airVolumeACFM : airVolumeM3h}
              numEMCFlaps={numEMCFlaps}
              bagLength={bagLength}
              filterArea={formattedResults.filterArea}
              netFilterArea={formattedResults.netFilterArea}
              acRatioGross={formattedResults.acRatioGross}
              acRatioNet={formattedResults.acRatioNet}
              totalBags={formattedResults.totalBags}
              savingYears={savingYears}
              bagSavings={totalSavings.bagSavings}
              fanPowerSavings={totalSavings.fanPowerSavings}
              airSavings={totalSavings.airSavings}
              totalSavings={totalSavings.total}
            />
          </div>
          <Button
            variant="default"
            onClick={handlePrint}
            className="mt-4 w-full flex items-center justify-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print as PDF
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavingsResults;
