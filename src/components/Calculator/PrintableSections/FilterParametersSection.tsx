
import React from 'react';

interface FilterParametersSectionProps {
  filterArea: string;
  netFilterArea: string;
  acRatioGross: string;
  acRatioNet: string;
  totalBags: number;
}

export const FilterParametersSection: React.FC<FilterParametersSectionProps> = ({
  filterArea,
  netFilterArea,
  acRatioGross,
  acRatioNet,
  totalBags,
}) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Filter Parameters</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Area (Gross):</div>
        <div>{filterArea}</div>
        <div>Net Filter Area (Cleaning):</div>
        <div>{netFilterArea}</div>
        <div>Air-to-Cloth Ratio (Gross):</div>
        <div>{acRatioGross}</div>
        <div>Air-to-Cloth Ratio (Net):</div>
        <div>{acRatioNet}</div>
        <div>Total Number of Bags:</div>
        <div>{totalBags}</div>
      </div>
    </section>
  );
};
