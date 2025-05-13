
import React from 'react';

interface SavingsSectionProps {
  savingYears: number;
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  totalSavings: number;
}

export const SavingsSection: React.FC<SavingsSectionProps> = ({
  savingYears,
  bagSavings,
  fanPowerSavings,
  airSavings,
  totalSavings,
}) => {
  return (
    <div className="bg-blue-50/50 p-6 rounded-lg">
      <section>
        <h2 className="text-xl font-semibold mb-4">OPEX Savings Analysis</h2>
        <div className="text-lg mb-4">Savings in {savingYears} years:</div>
        <div className="grid grid-cols-2 gap-4">
          <div>Bag Material, Cages and Labor:</div>
          <div>${bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div>Savings $ in Fan Power Consumption:</div>
          <div>${fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div>Savings $ in Compressed Air:</div>
          <div>${airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
        </div>
      </section>

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
