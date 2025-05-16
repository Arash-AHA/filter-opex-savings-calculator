
import React from 'react';
import { FilterDesignSection } from '../PrintableSections/FilterDesignSection';
import { FilterParametersSection } from '../PrintableSections/FilterParametersSection';

export interface PrintableDesignParamsProps {
  designType: string;
  numEMCFlaps: number | string;
  bagsPerRow: number;
  bagLength: number;
  airVolumeM3h: string;
  airVolumeACFM: string;
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
  } | null;
  onEraseInputs?: () => void;
}

const PrintableDesignParams: React.FC<PrintableDesignParamsProps> = ({
  designType,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  airVolumeM3h,
  airVolumeACFM,
  formattedResults,
  onEraseInputs
}) => {
  const airVolumeDisplay = designType === 'bolt-weld' 
    ? `${airVolumeM3h} m³/h` 
    : `${airVolumeACFM} ACFM`;

  return (
    <div className="p-6 space-y-8">
      <FilterDesignSection
        designType={designType}
        airVolume={airVolumeDisplay}
        numEMCFlaps={numEMCFlaps}
        bagLength={bagLength}
        onEraseInputs={onEraseInputs}
      />
      
      {formattedResults && (
        <FilterParametersSection
          filterArea={formattedResults.filterArea}
          netFilterArea={formattedResults.netFilterArea}
          acRatioGross={formattedResults.acRatioGross}
          acRatioNet={formattedResults.acRatioNet}
          totalBags={formattedResults.totalBags}
        />
      )}
    </div>
  );
};

export default PrintableDesignParams;
