
import React from 'react';

interface CompressedAirSectionProps {
  currentAirConsumption: number;
  setCurrentAirConsumption: (value: number) => void;
  scheuchAirConsumption: number;
  setScheuchAirConsumption: (value: number) => void;
}

const CompressedAirSection: React.FC<CompressedAirSectionProps> = ({
  currentAirConsumption,
  setCurrentAirConsumption,
  scheuchAirConsumption,
  setScheuchAirConsumption
}) => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Compressed Air</h3>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Compressed air Consumption</div>
        <div className="text-sm text-gray-500">Current Situation:</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="number"
              value={currentAirConsumption}
              onChange={(e) => setCurrentAirConsumption(parseFloat(e.target.value) || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              Nm³/h
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={(currentAirConsumption * 0.589).toFixed(1)}
              onChange={(e) => setCurrentAirConsumption(parseFloat(e.target.value) / 0.589 || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              SCFM
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Compressed air Consumption</div>
        <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="number"
              value={scheuchAirConsumption}
              onChange={(e) => setScheuchAirConsumption(parseFloat(e.target.value) || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              Nm³/h
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={(scheuchAirConsumption * 0.589).toFixed(1)}
              onChange={(e) => setScheuchAirConsumption(parseFloat(e.target.value) / 0.589 || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              SCFM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressedAirSection;
