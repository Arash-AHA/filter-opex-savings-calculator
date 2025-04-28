
import React from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';

interface FilterBagReplacementProps {
  bagPrice: number;
  setBagPrice: (value: number) => void;
  bagChangeTime: number;
  setBagChangeTime: (value: number) => void;
  numPeople: number;
  setNumPeople: (value: number) => void;
  hourlyRate: number;
  setHourlyRate: (value: number) => void;
  siteDistance: number;
  setSiteDistance: (value: number) => void;
  travelCost: number;
  setTravelCost: (value: number) => void;
  bagReplacementCost: number;
  setBagReplacementCost: (value: number) => void;
  calculateTravelCost: () => void;
  formattedResults: any;
}

const FilterBagReplacement: React.FC<FilterBagReplacementProps> = ({
  bagPrice,
  setBagPrice,
  bagChangeTime,
  setBagChangeTime,
  numPeople,
  setNumPeople,
  hourlyRate,
  setHourlyRate,
  siteDistance,
  setSiteDistance,
  travelCost,
  setTravelCost,
  bagReplacementCost,
  setBagReplacementCost,
  calculateTravelCost,
  formattedResults
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1 & 2: Labels & Inputs */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <div className="mb-2 text-sm text-gray-600">Filter Bag Price per Piece (USD):</div>
          <div className="w-[400px]">
            <InputField
              value={bagPrice}
              onChange={(value) => setBagPrice(parseFloat(value) || 0)}
              type="number"
              min={0}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-600">Ave. time for changing one bag (minute):</div>
          <div className="w-[400px]">
            <InputField
              value={bagChangeTime}
              onChange={(value) => setBagChangeTime(parseFloat(value) || 0)}
              type="number"
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-600">No. People:</div>
          <div className="w-[400px]">
            <InputField
              value={numPeople}
              onChange={(value) => setNumPeople(parseInt(value) || 0)}
              type="number"
              min={1}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-600">Hourly rate (USD):</div>
          <div className="w-[400px]">
            <InputField
              value={hourlyRate}
              onChange={(value) => setHourlyRate(parseFloat(value) || 0)}
              type="number"
              min={0}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-600">Travel distance to site location in miles:</div>
          <div className="w-[400px]">
            <InputField
              value={siteDistance}
              onChange={(value) => setSiteDistance(parseFloat(value) || 0)}
              type="number"
              min={0}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 text-sm text-gray-600">Travel/accommodation cost for crew:</div>
          <div className="w-[400px]">
            <InputField
              value={travelCost}
              onChange={(value) => setTravelCost(parseFloat(value) || 0)}
              type="number"
              min={0}
              className="w-full"
              estimateButton={{
                onClick: calculateTravelCost,
                label: "Estimate"
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Column 3: Results */}
      <div className="bg-white rounded-xl shadow-soft p-5 border border-gray-100 md:mt-0 mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Filter Bag Replacement Cost</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Total Number of Bags</span>
            <span className="text-sm font-medium text-right">{formattedResults.totalBags}</span>
          </div>
          
          <div className="grid grid-cols-2 items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Days to Replace Bags</span>
            <span className="text-sm font-medium text-right">{formattedResults.daysToReplace}</span>
          </div>
          
          <div className="grid grid-cols-2 items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Bag Material Cost</span>
            <span className="text-sm font-medium text-right">${formattedResults.bagMaterialCost.toLocaleString()}</span>
          </div>
          
          <div className="grid grid-cols-2 items-center py-2">
            <span className="text-sm text-gray-600 font-semibold">Total Replacement Cost</span>
            <span className="text-sm font-semibold text-right">${(formattedResults.bagMaterialCost + travelCost).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBagReplacement;
