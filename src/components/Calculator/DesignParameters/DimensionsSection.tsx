
import React from 'react';
import FilterDimensions from '../DesignParametersComponents/FilterDimensions';

interface DimensionsSectionProps {
  filterRowType: string;
  setFilterRowType: (value: string) => void;
  channelWidthMm: number;
  setChannelWidthMm: (value: number) => void;
  channelHeightMm: number;
  setChannelHeightMm: (value: number) => void;
  airVolumeM3h: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  designType: string;
}

const DimensionsSection: React.FC<DimensionsSectionProps> = (props) => {
  return (
    <FilterDimensions
      filterRowType={props.filterRowType}
      setFilterRowType={props.setFilterRowType}
      channelWidthMm={props.channelWidthMm}
      setChannelWidthMm={props.setChannelWidthMm}
      channelHeightMm={props.channelHeightMm}
      setChannelHeightMm={props.setChannelHeightMm}
      airVolumeM3h={props.airVolumeM3h}
      numEMCFlaps={props.numEMCFlaps}
      bagsPerRow={props.bagsPerRow}
      designType={props.designType}
    />
  );
};

export default DimensionsSection;
