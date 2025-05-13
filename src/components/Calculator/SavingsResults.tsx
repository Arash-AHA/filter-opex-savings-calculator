import React, { useRef, useState } from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, ScrollText, BarChart } from 'lucide-react';
import PrintableResults from './PrintableResults';
import SavingsGraph from './SavingsGraph';
import YearlySavingsGraph from './YearlySavingsGraph';
import { EnergyUnit } from './hooks/useSavingsCalculation';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Conversion factors to kWh
const CONVERSION_FACTORS = {
  'kWh': 1,
  'MMBtu': 293.07107, // 1 MMBtu = 293.07107 kWh
  'therms': 29.3071, // 1 therm = 29.3071 kWh
};

// Air unit types
type AirUnitType = 'Nm³' | 'SCFM';

interface SavingsResultsProps {
  savingYears: number;
  setSavingYears: (value: number) => void;
  workingHours: number;
  setWorkingHours: (value: number) => void;
  kwhCost: number;
  setKwhCost: (value: number) => void;
  compressedAirCost: string;
  setCompressedAirCost: (value: string) => void;
  energyUnit: EnergyUnit;
  setEnergyUnit: (value: EnergyUnit) => void;
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
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number | string;
  bagLength: number;
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
  } | null;
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
  energyUnit,
  setEnergyUnit,
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
  const [showGraphDialog, setShowGraphDialog] = useState(false);
  const [showYearlyGraphDialog, setShowYearlyGraphDialog] = useState(false);
  const printContentRef = useRef<HTMLDivElement>(null);
  // Add state for air unit type
  const [airUnitType, setAirUnitType] = useState<AirUnitType>('Nm³');
  
  // Safely access formattedResults with default fallback values
  const safeFormattedResults = formattedResults || {
    filterArea: "0",
    netFilterArea: "0",
    acRatioGross: "0",
    acRatioNet: "0",
    totalBags: 0
  };

  const handlePrint = () => {
    if (printContentRef.current) {
      const printContents = printContentRef.current.innerHTML;
      const win = window.open('', '', 'height=800,width=1000,top=100,left=100');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>OPEX Savings Analysis</title>
              <style>
                body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 24px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                section { margin-bottom: 2rem; page-break-inside: avoid; }
                h2 { color: #374151; margin-bottom: 1rem; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
                td, th { padding: 8px; border-bottom: 1px solid #e5e7eb; }
                @media print {
                  body { padding: 20px; }
                  section { page-break-inside: avoid; }
                }
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

  // Calculate equivalent kWh value for display
  const equivalentKwhValue = energyUnit !== 'kWh' 
    ? (kwhCost * CONVERSION_FACTORS[energyUnit]).toFixed(4)
    : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Calculation Parameters</h3>
          
          <div className="mb-6">
            <div className="calculator-field-label mb-2">
              Saving in x years:
            </div>
            <div className="calculator-field-input w-full">
              <input
                type="number"
                value={savingYears}
                onChange={(e) => setSavingYears(parseInt(e.target.value) || 0)}
                min={1}
                className="calculator-input w-full"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="calculator-field-label mb-2">
              Working hours per year:
            </div>
            <div className="calculator-field-input w-full">
              <input
                type="number"
                value={workingHours}
                onChange={(e) => setWorkingHours(parseInt(e.target.value) || 0)}
                min={1}
                className="calculator-input w-full"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="calculator-field-label mb-2">
              <span className="flex items-center gap-1 whitespace-nowrap">
                USD per
                <Select value={energyUnit} onValueChange={(value: EnergyUnit) => setEnergyUnit(value)}>
                  <SelectTrigger className="mx-1 w-24 h-8">
                    <SelectValue placeholder="kWh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kWh">kWh</SelectItem>
                    <SelectItem value="MMBtu">MMBtu</SelectItem>
                    <SelectItem value="therms">therms</SelectItem>
                  </SelectContent>
                </Select>
                for plant:
              </span>
            </div>
            <div className="calculator-field-input w-full">
              <input
                type="number"
                value={kwhCost}
                onChange={(e) => setKwhCost(parseFloat(e.target.value) || 0)}
                min={0}
                step={0.01}
                className="calculator-input w-full"
              />
              {energyUnit !== 'kWh' && (
                <div className="text-xs text-gray-500 mt-1">
                  Equivalent to ${equivalentKwhValue} per kWh
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="calculator-field-label mb-2">
              <span className="flex items-center gap-1 whitespace-nowrap">
                USD per
                <Select value={airUnitType} onValueChange={(value: AirUnitType) => setAirUnitType(value)}>
                  <SelectTrigger className="mx-0 w-20 h-8 px-2">
                    <SelectValue placeholder="Nm³" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nm³">Nm³</SelectItem>
                    <SelectItem value="SCFM">SCFM</SelectItem>
                  </SelectContent>
                </Select>
                from Plant Network:
              </span>
            </div>
            <div className="calculator-field-input w-full">
              <input
                type="number"
                value={compressedAirCost}
                onChange={(e) => setCompressedAirCost(e.target.value)}
                min={0}
                step={0.01}
                placeholder="Leave empty if not available"
                className="calculator-input w-full"
              />
            </div>
          </div>
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
        
        <div className="flex justify-center mt-6 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowPrintDialog(true)}
          >
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowGraphDialog(true)}
          >
            <BarChart className="h-4 w-4" />
            Show Graph
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowYearlyGraphDialog(true)}
          >
            <BarChart className="h-4 w-4" />
            OPEX by Year
          </Button>
        </div>
      </div>

      {/* Print Results Dialog */}
      <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Print Results
            </DialogTitle>
            <DialogDescription>
              Scroll through the results and click "Export as PDF" to save or print.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(90vh-180px)] p-6">
            <div ref={printContentRef}>
              <PrintableResults
                designType={designType}
                airVolume={designType === 'modular' ? airVolumeACFM : airVolumeM3h}
                numEMCFlaps={numEMCFlaps}
                bagLength={bagLength}
                filterArea={safeFormattedResults.filterArea}
                netFilterArea={safeFormattedResults.netFilterArea}
                acRatioGross={safeFormattedResults.acRatioGross}
                acRatioNet={safeFormattedResults.acRatioNet}
                totalBags={safeFormattedResults.totalBags}
                savingYears={savingYears}
                bagSavings={totalSavings.bagSavings}
                fanPowerSavings={totalSavings.fanPowerSavings}
                airSavings={totalSavings.airSavings}
                totalSavings={totalSavings.total}
              />
            </div>
          </ScrollArea>
          
          <div className="p-6 pt-0 border-t mt-6">
            <Button
              variant="default"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Export as PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Savings Graph Dialog */}
      <Dialog open={showGraphDialog} onOpenChange={setShowGraphDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Savings Breakdown</DialogTitle>
            <DialogDescription>
              Visual breakdown of the estimated savings over {savingYears} years.
            </DialogDescription>
          </DialogHeader>
          
          <SavingsGraph 
            bagSavings={totalSavings.bagSavings}
            fanPowerSavings={totalSavings.fanPowerSavings}
            airSavings={totalSavings.airSavings}
            total={totalSavings.total}
            savingYears={savingYears}
          />
        </DialogContent>
      </Dialog>

      {/* Yearly Savings Graph Dialog */}
      <YearlySavingsGraph
        bagSavings={totalSavings.bagSavings}
        fanPowerSavings={totalSavings.fanPowerSavings}
        airSavings={totalSavings.airSavings}
        savingYears={savingYears}
        isOpen={showYearlyGraphDialog}
        onClose={() => setShowYearlyGraphDialog(false)}
      />
    </>
  );
};

export default SavingsResults;
