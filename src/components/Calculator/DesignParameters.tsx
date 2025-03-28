import React from 'react';
import { cn } from '@/lib/utils';
import ResultCard from './ResultCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Columns2, Columns3 } from 'lucide-react';

interface DesignParametersProps {
  designType: string;
  setDesignType: (value: string) => void;
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  bagLength: number;
  filterRowType: string;
  setFilterRowType: (value: string) => void;
  showDimensions: boolean;
  setShowDimensions: (value: boolean) => void;
  showOtherParams: boolean;
  setShowOtherParams: (value: boolean) => void;
  channelWidthMm: number;
  setChannelWidthMm: (value: number) => void;
  channelHeightMm: number;
  setChannelHeightMm: (value: number) => void;
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
  filterRowType,
  setFilterRowType,
  showDimensions,
  setShowDimensions,
  showOtherParams,
  setShowOtherParams,
  channelWidthMm,
  setChannelWidthMm,
  channelHeightMm,
  setChannelHeightMm,
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
  const { toast } = useToast();
  const channelWidthM = channelWidthMm / 1000;
  const channelHeightM = channelHeightMm / 1000;

  const gasVelocityMS = showDimensions && channelWidthMm > 0 && channelHeightMm > 0 && airVolumeM3h ? 
    parseFloat(airVolumeM3h) * 1000000 / (3600 * channelWidthMm * channelHeightMm) : 0;
  
  const gasVelocityFPM = gasVelocityMS * 196.85;
  
  const isVelocityTooHigh = gasVelocityMS > 12;
  
  const filterWidth = bagsPerRow === 18 ? (2 * 4500 + channelWidthMm) : (3750 * 2 + channelWidthMm);
  
  const filterLength = filterRowType === 'single' ? numEMCFlaps * 1200 : (numEMCFlaps / 2) * 1200;
  
  const velocityWarning = isVelocityTooHigh ? (
    <div className="bg-red-50 p-3 rounded-md text-xs text-red-700 mt-2 font-medium">
      Warning: Inlet velocity ({gasVelocityMS.toFixed(2)} m/s) should be maximum 12 m/s
    </div>
  ) : null;

  const totalFilterArea = results.filterArea;
  const netFilterArea = results.netFilterArea;
  const bagDiameterMm = 165;
  const emcSuppliedBags = numEMCFlaps * bagsPerRow * 5;
  const totalBagSurfaceArea = Math.PI * (bagDiameterMm / 1000) * bagLength * emcSuppliedBags;

  React.useEffect(() => {
    if (isVelocityTooHigh && showDimensions && channelWidthMm > 0 && channelHeightMm > 0 && airVolumeM3h) {
      toast({
        title: "High Gas Velocity Warning",
        description: `The inlet velocity (${gasVelocityMS.toFixed(2)} m/s) exceeds recommended maximum of 12 m/s`,
        variant: "destructive",
      });
    }
  }, [isVelocityTooHigh, showDimensions, channelWidthMm, channelHeightMm, airVolumeM3h, gasVelocityMS, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        {designType === 'bolt-weld' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowDimensions(!showDimensions)}
              >
                {showDimensions ? 'Hide Filter Dimensions / Footprint' : 'Show Filter Dimensions / Footprint'}
              </Button>
            </div>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowOtherParams(!showOtherParams)}
              >
                {showOtherParams ? 'Hide Other Parameters' : 'Show Other Filter Design Parameters'}
              </Button>
            </div>
          </div>
        )}
        
        {showDimensions && designType === 'bolt-weld' && (
          <>
            <div className="flex items-center mb-4 animate-fadeIn">
              <div className="w-60 pr-4 calculator-field-label">
                <span>Filter Row Configuration:</span>
              </div>
              <div className="flex-1">
                <RadioGroup 
                  value={filterRowType}
                  onValueChange={setFilterRowType}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single-row" />
                    <Label htmlFor="single-row" className="flex items-center cursor-pointer">
                      <Columns2 className="h-4 w-4 mr-1" />
                      <span>Single Row</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="double" id="double-row" />
                    <Label htmlFor="double-row" className="flex items-center cursor-pointer">
                      <Columns3 className="h-4 w-4 mr-1" />
                      <span>Double Row</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex items-center mb-4 animate-fadeIn">
              <div className="w-60 pr-4 calculator-field-label">
                <span>Clean Gas Channel Width x Height:</span>
              </div>
              <div className="flex flex-1 space-x-2">
                <div className="w-1/2 relative">
                  <input 
                    type="number"
                    value={channelWidthMm}
                    onChange={(e) => setChannelWidthMm(parseInt(e.target.value) || 0)}
                    step={10}
                    min={10}
                    className="calculator-input pr-8 w-full"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
                </div>
                <div className="w-1/2 relative">
                  <input 
                    type="number"
                    value={channelHeightMm}
                    onChange={(e) => setChannelHeightMm(parseInt(e.target.value) || 0)}
                    step={10}
                    min={10}
                    className="calculator-input pr-8 w-full"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-4 animate-fadeIn">
              <div className="w-60 pr-4 calculator-field-label">
                <span>Gas velocity at filter inlet flange:</span>
              </div>
              <div className="flex flex-1 space-x-2">
                <div className="w-1/2 relative">
                  <input 
                    type="text"
                    value={gasVelocityMS.toFixed(2)}
                    readOnly
                    className={cn("calculator-input pr-12 w-full bg-gray-50", 
                      isVelocityTooHigh ? "border-red-300 text-red-700" : "")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m/s</span>
                </div>
                <div className="w-1/2 relative">
                  <input 
                    type="text"
                    value={gasVelocityFPM.toFixed(0)}
                    readOnly
                    className={cn("calculator-input pr-16 w-full bg-gray-50", 
                      isVelocityTooHigh ? "border-red-300 text-red-700" : "")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft/min</span>
                </div>
              </div>
            </div>
            
            {velocityWarning}
            
            <div className="flex items-center mb-4 animate-fadeIn">
              <div className="w-60 pr-4 calculator-field-label">
                <span>Filter dimensions: Width / Length</span>
              </div>
              <div className="flex flex-1 space-x-2">
                <div className="w-1/2 relative">
                  <input 
                    type="text"
                    value={filterWidth.toFixed(0)}
                    readOnly
                    className="calculator-input pr-8 w-full bg-gray-50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
                </div>
                <div className="w-1/2 relative">
                  <input 
                    type="text"
                    value={filterLength.toFixed(0)}
                    readOnly
                    className="calculator-input pr-8 w-full bg-gray-50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
                </div>
              </div>
            </div>
          </>
        )}

        {showOtherParams && designType === 'bolt-weld' && (
          <div className="space-y-4 p-4 border border-blue-100 rounded-xl bg-blue-50/50 animate-fadeIn">
            <h3 className="font-medium text-gray-700 mb-2">Additional Filter Design Parameters</h3>
            
            <div className="flex items-center mb-2">
              <div className="w-60 pr-4 calculator-field-label text-sm">
                <span>Total Number of Filter Bags:</span>
              </div>
              <div className="flex-1">
                <input 
                  type="text"
                  value={emcSuppliedBags}
                  readOnly
                  className="calculator-input w-full bg-gray-50 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-60 pr-4 calculator-field-label text-sm">
                <span>Bag Diameter:</span>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={bagDiameterMm}
                  readOnly
                  className="calculator-input pr-8 w-full bg-gray-50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-60 pr-4 calculator-field-label text-sm">
                <span>Total Bag Surface Area:</span>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={totalBagSurfaceArea.toFixed(2)}
                  readOnly
                  className="calculator-input pr-8 w-full bg-gray-50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-60 pr-4 calculator-field-label text-sm">
                <span>Gross Filter Area:</span>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={totalFilterArea.toFixed(2)}
                  readOnly
                  className="calculator-input pr-8 w-full bg-gray-50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-60 pr-4 calculator-field-label text-sm">
                <span>Net Filter Area (EMC cleaning):</span>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={netFilterArea.toFixed(2)}
                  readOnly
                  className="calculator-input pr-8 w-full bg-gray-50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
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
