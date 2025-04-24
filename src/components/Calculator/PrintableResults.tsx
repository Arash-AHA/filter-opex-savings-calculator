import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface PrintableResultsProps {
  // Design Configuration
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
  
  // Filter Parameters
  filterArea: string;
  netFilterArea: string;
  acRatioGross: string;
  acRatioNet: string;
  totalBags: number;
  
  // Savings Parameters
  savingYears: number;
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  totalSavings: number;
}

const PrintableResults: React.FC<PrintableResultsProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  filterArea,
  netFilterArea,
  acRatioGross,
  acRatioNet,
  totalBags,
  savingYears,
  bagSavings,
  fanPowerSavings,
  airSavings,
  totalSavings
}) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Determine bag length unit and convert if necessary
  const bagLengthDisplay = designType === 'bolt-weld' 
    ? `${bagLength} m` 
    : `${(bagLength * 3.28084).toFixed(0)} ft`;

  // Convert values based on selected unit system
  const convertedValues = {
    filterArea: unitSystem === 'imperial' 
      ? `${(parseFloat(filterArea) * 10.7639).toFixed(1)} ft²` 
      : `${filterArea} m²`,
    netFilterArea: unitSystem === 'imperial'
      ? `${(parseFloat(netFilterArea) * 10.7639).toFixed(1)} ft²`
      : `${netFilterArea} m²`,
    acRatioGross: unitSystem === 'imperial'
      ? `${(parseFloat(acRatioGross) * 3.28084).toFixed(1)} ft/min`
      : `${acRatioGross} m³/m²/min`,
    acRatioNet: unitSystem === 'imperial'
      ? `${(parseFloat(acRatioNet) * 3.28084).toFixed(1)} ft/min`
      : `${acRatioNet} m³/m²/min`,
    airVolume: designType === 'modular' 
      ? `${airVolume} ACFM` 
      : `${airVolume} m³/h`
  };

  // Calculation explanations
  const calculationExplanations = {
    bagSavings: {
      title: "Bag Material and Labor Savings",
      formula: "((Years × 12 / Current Life) × (Total Bags × Bag Price + Travel Cost)) - ((Years × 12 / Scheuch Life) × (Total Bags × Bag Price + Travel Cost))",
      explanation: "Calculates the difference in costs between current and Scheuch system based on bag replacement frequency, material costs, and labor."
    },
    fanPower: {
      title: "Fan Power Consumption Savings",
      formula: "(Air Volume × (Current ΔP - Scheuch ΔP) × 100) / (3600 × 1000 × 0.8) × kWh Cost × Working Hours × Years",
      explanation: "Determines energy savings from reduced differential pressure, considering system efficiency and operational hours."
    },
    compressedAir: {
      title: "Compressed Air Savings",
      formula: "If USD/Nm³ available: (Current - Scheuch Air Consumption) × Cost × Working Hours × Years\nOtherwise: (Current - Scheuch Motor kW) × kWh Cost × Working Hours × Years",
      explanation: "Calculates savings in compressed air usage based on either direct air costs or associated motor power consumption."
    }
  };

  return (
    <div className="p-6 print:p-0 space-y-8">
      <div className="print:hidden mb-4">
        <Select value={unitSystem} onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select unit system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metric Units</SelectItem>
            <SelectItem value="imperial">Imperial Units</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter Design Configuration */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Filter Design Type:</div>
          <div>{designType === 'bolt-weld' ? 'Bolt/Weld' : 'Modular Design'}</div>
          <div>Air Volume:</div>
          <div>{convertedValues.airVolume}</div>
          <div>Total No. EMC Flaps:</div>
          <div>{numEMCFlaps}</div>
          <div>Bag Length:</div>
          <div>{bagLengthDisplay}</div>
        </div>
      </section>

      {/* Filter Parameters */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Filter Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Filter Area (Gross):</div>
          <div>{convertedValues.filterArea}</div>
          <div>Net Filter Area (Cleaning):</div>
          <div>{convertedValues.netFilterArea}</div>
          <div>Air-to-Cloth Ratio (Gross):</div>
          <div>{convertedValues.acRatioGross}</div>
          <div>Air-to-Cloth Ratio (Net):</div>
          <div>{convertedValues.acRatioNet}</div>
          <div>Total Number of Bags:</div>
          <div>{totalBags}</div>
        </div>
      </section>

      {/* OPEX Savings Analysis */}
      <section>
        <h2 className="text-xl font-semibold mb-4">OPEX Savings Analysis</h2>
        <div className="text-lg mb-4">Savings in {savingYears} years:</div>
        <div className="grid grid-cols-2 gap-4">
          <div>Bag Material and Labor:</div>
          <div className="flex items-center gap-2">
            ${bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{calculationExplanations.bagSavings.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <pre className="bg-slate-100 p-3 rounded-md text-sm">{calculationExplanations.bagSavings.formula}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-600">{calculationExplanations.bagSavings.explanation}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div>Savings $ in Fan Power Consumption:</div>
          <div className="flex items-center gap-2">
            ${fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{calculationExplanations.fanPower.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <pre className="bg-slate-100 p-3 rounded-md text-sm">{calculationExplanations.fanPower.formula}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-600">{calculationExplanations.fanPower.explanation}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div>Savings $ in Compressed Air:</div>
          <div className="flex items-center gap-2">
            ${airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{calculationExplanations.compressedAir.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <pre className="bg-slate-100 p-3 rounded-md text-sm whitespace-pre-wrap">{calculationExplanations.compressedAir.formula}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-600">{calculationExplanations.compressedAir.explanation}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Total Estimated Savings */}
      <section className="mt-8">
        <div className="text-center bg-green-50 border border-green-200 p-6 rounded-xl">
          <h3 className="text-xl font-medium text-green-800 mb-4">Total Estimated Savings</h3>
          <div className="text-4xl font-bold text-green-700 mb-1">
            ${totalSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
          <div className="text-sm text-green-600">Over {savingYears} years of operation</div>
        </div>
      </section>
    </div>
  );
};

export default PrintableResults;
