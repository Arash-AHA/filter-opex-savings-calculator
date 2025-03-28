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
      <div className="md:col-span-2 space-y-4">
        <InputField
          label="Filter Bag Price per Piece (USD):"
          value={bagPrice}
          onChange={(value) => setBagPrice(parseFloat(value) || 0)}
          type="number"
          min={0}
        />
        
        <InputField
          label="Ave. time for changing one bag (minute):"
          value={bagChangeTime}
          onChange={(value) => setBagChangeTime(parseFloat(value) || 0)}
          type="number"
          min={0}
          step={0.5}
        />
        
        <InputField
          label="No. People:"
          value={numPeople}
          onChange={(value) => setNumPeople(parseInt(value) || 0)}
          type="number"
          min={1}
        />
        
        <InputField
          label="Hourly rate (USD):"
          value={hourlyRate}
          onChange={(value) => setHourlyRate(parseFloat(value) || 0)}
          type="number"
          min={0}
          step={0.01}
        />
        
        <InputField
          label="Site Distance in miles:"
          value={siteDistance}
          onChange={(value) => setSiteDistance(parseFloat(value) || 0)}
          type="number"
          min={0}
        />
        
        <InputField
          label="Travel/accommodation cost for crew:"
          value={travelCost}
          onChange={(value) => setTravelCost(parseFloat(value) || 0)}
          type="number"
          min={0}
          estimateButton={{
            onClick: calculateTravelCost,
            label: "Estimate"
          }}
        />
      </div>
      
      {/* Column 3: Results */}
      <div className="bg-white rounded-xl shadow-soft p-5 border border-gray-100 md:mt-0 mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4 border-b pb-2">Replacement Parameters</h3>
        
        <div className="space-y-4 animate-stagger">
          <ResultCard
            label="Total Number of Bags"
            value={formattedResults.totalBags}
            delay={100}
          />
          
          <ResultCard
            label="Days to Replace Bags"
            value={formattedResults.daysToReplace}
            delay={200}
          />
          
          <ResultCard
            label="Bag Material Cost (1 replacement)"
            value={`$${(formattedResults.bagMaterialCost).toLocaleString()}`}
            delay={300}
          />
          
          <ResultCard
            label="Total Replacement Cost"
            value={`$${(formattedResults.bagMaterialCost + travelCost).toLocaleString()}`}
            highlight={true}
            delay={400}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBagReplacement;
