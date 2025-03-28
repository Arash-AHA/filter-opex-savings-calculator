
import React from 'react';
import { Button } from '@/components/ui/button';
import FilterDesignType from './DesignParametersComponents/FilterDesignType';
import FilterInputs from './DesignParametersComponents/FilterInputs';
import AdditionalParameters from './DesignParametersComponents/AdditionalParameters';
import FilterDimensions from './DesignParametersComponents/FilterDimensions';
import DesignParamsCard from './DesignParametersComponents/DesignParamsCard';

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
  const bagDiameterMm = 165;
  const emcSuppliedBags = numEMCFlaps * bagsPerRow * 5;
  const totalBagSurfaceArea = Math.PI * (bagDiameterMm / 1000) * bagLength * emcSuppliedBags;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <FilterDesignType 
          designType={designType} 
          setDesignType={setDesignType} 
        />
        
        <FilterInputs 
          airVolumeM3h={airVolumeM3h}
          airVolumeACFM={airVolumeACFM}
          numEMCFlaps={numEMCFlaps}
          bagsPerRow={bagsPerRow}
          bagLength={bagLength}
          designType={designType}
          handleAirVolumeM3hChange={handleAirVolumeM3hChange}
          handleAirVolumeACFMChange={handleAirVolumeACFMChange}
          setNumEMCFlaps={setNumEMCFlaps}
          setBagsPerRow={setBagsPerRow}
          setBagLength={setBagLength}
        />
        
        {designType === 'bolt-weld' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowOtherParams(!showOtherParams)}
              >
                {showOtherParams ? 'Hide Other Parameters' : 'Show Other Filter Design Parameters'}
              </Button>
            </div>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowDimensions(!showDimensions)}
              >
                {showDimensions ? 'Hide Filter Dimensions / Footprint' : 'Show Filter Dimensions / Footprint'}
              </Button>
            </div>
          </div>
        )}
        
        {showOtherParams && designType === 'bolt-weld' && (
          <AdditionalParameters 
            emcSuppliedBags={emcSuppliedBags}
            bagDiameterMm={bagDiameterMm}
            totalBagSurfaceArea={totalBagSurfaceArea}
            totalFilterArea={results.filterArea}
            netFilterArea={results.netFilterArea}
          />
        )}
        
        {showDimensions && designType === 'bolt-weld' && (
          <FilterDimensions
            filterRowType={filterRowType}
            setFilterRowType={setFilterRowType}
            channelWidthMm={channelWidthMm}
            setChannelWidthMm={setChannelWidthMm}
            channelHeightMm={channelHeightMm}
            setChannelHeightMm={setChannelHeightMm}
            airVolumeM3h={airVolumeM3h}
            numEMCFlaps={numEMCFlaps}
            bagsPerRow={bagsPerRow}
          />
        )}
      </div>
      
      <DesignParamsCard 
        formattedResults={formattedResults}
        results={results}
        m2ToSqFtFactor={m2ToSqFtFactor}
        conversionFactor={conversionFactor}
      />
    </div>
  );
};

export default DesignParameters;
