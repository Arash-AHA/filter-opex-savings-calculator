
import React from 'react';
import { cn } from '@/lib/utils';
import ResultCard from './ResultCard';
import { Button } from '@/components/ui/button';

interface DesignParametersProps {
  designType: string;
  setDesignType: (value: string) => void;
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  bagLength: number;
  showDimensions: boolean;
  setShowDimensions: (value: boolean) => void;
  channelWidth: number;
  setChannelWidth: (value: number) => void;
  channelHeight: number;
  setChannelHeight: (value: number) => void;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
  setNumEMCFlaps: (value: number) => void;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
  formattedResults: any;
  results: any;
  m2ToSqFtFactor: number;
  conversionFactor: number;
}

const DesignParameters: React.FC<DesignParametersProps> = ({
  designType,
  setDesignType,
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  showDimensions,
  setShowDimensions,
  channelWidth,
  setChannelWidth,
  channelHeight,
  setChannelHeight,
  handleAirVolumeM3hChange,
  handleAirVolumeACFMChange,
  setNumEMCFlaps,
  setBagsPerRow,
  setBagLength,
  formattedResults,
  results,
  m2ToSqFtFactor,
  conversionFactor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1 & 2: Labels & Inputs */}
      <div className="md:col-span-2 space-y-4">
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-2">Filter Design Type:</div>
          <div className="flex gap-4 flex-wrap">
            <label className="relative flex cursor-pointer items-center">
              <input 
                type="radio" 
                name="designType" 
                value="bolt-weld" 
                checked={designType === 'bolt-weld'} 
                onChange={() => setDesignType('bolt-weld')}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white">
                <span className={`h-3 w-3 rounded-full ${designType === 'bolt-weld' ? 'bg-primary' : 'bg-transparent'}`}></span>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-800">Bolt/Weld Design</span>
            </label>
            
            <label className="relative flex cursor-pointer items-center">
              <input 
                type="radio" 
                name="designType" 
                value="modular" 
                checked={designType === 'modular'} 
                onChange={() => setDesignType('modular')}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white">
                <span className={`h-3 w-3 rounded-full ${designType === 'modular' ? 'bg-primary' : 'bg-transparent'}`}></span>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-800">Modular Design</span>
            </label>
          </div>
        </div>
        
        {/* Air Volume Input */}
        <div className="flex items-center mb-4">
          <div className="w-60 pr-4 calculator-field-label">
            <span>Air Volume:</span>
          </div>
          <div className="flex flex-1 space-x-2">
            <div className="w-1/2 relative">
              <input 
                type="text"
                value={airVolumeM3h}
                onChange={(e) => handleAirVolumeM3hChange(e.target.value)}
                placeholder="Enter value"
                className="calculator-input pr-12 w-full"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m³/h</span>
            </div>
            <div className="w-1/2 relative">
              <input 
                type="text"
                value={airVolumeACFM}
                onChange={(e) => handleAirVolumeACFMChange(e.target.value)}
                placeholder="Enter value"
                className="calculator-input pr-12 w-full"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ACFM</span>
            </div>
          </div>
        </div>
        
        {/* EMC Flaps Input */}
        <div className="flex items-center mb-4">
          <div className="w-60 pr-4 calculator-field-label">
            <span>TOTAL No. EMC Flaps:</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              value={numEMCFlaps}
              onChange={(e) => setNumEMCFlaps(parseInt(e.target.value) || 0)}
              min={1}
              className="calculator-input w-full"
            />
          </div>
        </div>
        
        {/* Bags Per Row */}
        <div className="flex items-center mb-4">
          <div className="w-60 pr-4 calculator-field-label">
            <span>No. Bags in a Row:</span>
          </div>
          <div className="flex-1">
            <select
              value={bagsPerRow}
              onChange={(e) => setBagsPerRow(parseInt(e.target.value) || 0)}
              className="calculator-input w-full"
            >
              {designType === 'bolt-weld' ? (
                <>
                  <option value={15}>15</option>
                  <option value={18}>18</option>
                </>
              ) : (
                <option value={15}>15</option>
              )}
            </select>
          </div>
        </div>
        
        {/* Bag Length */}
        <div className="flex items-center mb-4">
          <div className="w-60 pr-4 calculator-field-label">
            <span>Bag Length:</span>
          </div>
          <div className="flex-1">
            <select
              value={bagLength}
              onChange={(e) => setBagLength(parseInt(e.target.value) || 0)}
              className="calculator-input w-full"
            >
              {designType === 'bolt-weld' ? (
                <>
                  <option value={8}>8 m</option>
                  <option value={9}>9 m</option>
                  <option value={10}>10 m</option>
                </>
              ) : (
                <>
                  <option value={16}>16 ft</option>
                  <option value={24}>24 ft</option>
                  <option value={28}>28 ft</option>
                </>
              )}
            </select>
          </div>
        </div>
        
        {/* Rough Dimensions Button */}
        <div className="flex items-center mb-4">
          <div className="w-60 pr-4">
          </div>
          <div className="flex-1">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowDimensions(!showDimensions)}
            >
              {showDimensions ? 'Hide Rough Dimensions' : 'Show Rough Dimensions of Filter'}
            </Button>
          </div>
        </div>
        
        {/* Clean Gas Channel Dimensions - Conditional */}
        {showDimensions && (
          <div className="flex items-center mb-4 animate-fadeIn">
            <div className="w-60 pr-4 calculator-field-label">
              <span>Clean Gas Channel Width x Height:</span>
            </div>
            <div className="flex flex-1 space-x-2">
              <div className="w-1/2 relative">
                <input 
                  type="number"
                  value={channelWidth}
                  onChange={(e) => setChannelWidth(parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={0.1}
                  className="calculator-input pr-8 w-full"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m</span>
              </div>
              <div className="w-1/2 relative">
                <input 
                  type="number"
                  value={channelHeight}
                  onChange={(e) => setChannelHeight(parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={0.1}
                  className="calculator-input pr-8 w-full"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Column 3: Results */}
      <div className="bg-blue-50/80 rounded-xl shadow-sm p-5 border border-blue-100 md:mt-0 mt-4">
        <h3 className="text-base font-medium text-center text-gray-700 mb-4 border-b pb-2">Design Parameters</h3>
        
        <div className="space-y-3 text-right">
          <div>
            <div className="text-sm text-gray-600">Total Filtration Area</div>
            <div className="text-lg font-semibold">{formattedResults.filterArea}</div>
            <div className="text-xs text-gray-500">({(results.filterArea * m2ToSqFtFactor).toFixed(2)} sq ft)</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Net Area (EMC cleaning)</div>
            <div className="text-lg font-semibold">{formattedResults.netFilterArea}</div>
            <div className="text-xs text-gray-500">({(results.netFilterArea * m2ToSqFtFactor).toFixed(2)} sq ft)</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">A/C Ratio Gross</div>
            <div className="text-lg font-semibold">{formattedResults.acRatioGross}</div>
            <div className="text-xs text-gray-500">({(results.acRatioGross / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">A/C Ratio Net</div>
            <div className="text-lg font-semibold">{formattedResults.acRatioNet}</div>
            <div className="text-xs text-gray-500">({(results.acRatioNet / m2ToSqFtFactor * conversionFactor).toFixed(2)} cfm/sq ft)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignParameters;
