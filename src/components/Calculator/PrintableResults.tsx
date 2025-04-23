import React from 'react';

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
  return (
    <div className="p-6 print:p-0 space-y-8">
      {/* Filter Design Configuration */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Filter Design Type:</div>
          <div>{designType === 'bolt-weld' ? 'Bolt/Weld' : 'Modular Design'}</div>
          <div>Air Volume:</div>
          <div>
            {airVolume} {designType === 'modular' ? 'ACFM' : 'm³/h'}
          </div>
          <div>Total No. EMC Flaps:</div>
          <div>{numEMCFlaps}</div>
          <div>Bag Length:</div>
          <div>{bagLength} mm</div>
        </div>
      </section>

      {/* Filter Parameters */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Filter Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Filter Area (Gross):</div>
          <div>{filterArea} m²</div>
          <div>Net Filter Area (Cleaning):</div>
          <div>{netFilterArea} m²</div>
          <div>Air-to-Cloth Ratio (Gross):</div>
          <div>{acRatioGross} m³/m²/min</div>
          <div>Air-to-Cloth Ratio (Net):</div>
          <div>{acRatioNet} m³/m²/min</div>
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
          <div>${bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div>Savings $ in Fan Power Consumption:</div>
          <div>${fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div>Savings $ in Compressed Air:</div>
          <div>${airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
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
