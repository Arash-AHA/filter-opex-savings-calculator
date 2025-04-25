
import React from 'react';

interface ChannelDimensionsInputProps {
  channelWidthDisplay: string | number;
  channelHeightDisplay: string | number;
  handleWidthChange: (value: string) => void;
  handleHeightChange: (value: string) => void;
  unitText: string;
}

const ChannelDimensionsInput: React.FC<ChannelDimensionsInputProps> = ({
  channelWidthDisplay,
  channelHeightDisplay,
  handleWidthChange,
  handleHeightChange,
  unitText
}) => {
  return (
    <div className="flex items-center mb-4 animate-fadeIn">
      <div className="w-60 pr-4 calculator-field-label">
        <span>Clean Gas Channel Width x Height:</span>
      </div>
      <div className="flex flex-1 space-x-2">
        <div className="w-1/2 relative">
          <input 
            type="number"
            value={channelWidthDisplay}
            onChange={(e) => handleWidthChange(e.target.value)}
            step={unitText === 'in' ? 0.1 : 10}
            min={10}
            className="calculator-input pr-8 w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
        </div>
        <div className="w-1/2 relative">
          <input 
            type="number"
            value={channelHeightDisplay}
            onChange={(e) => handleHeightChange(e.target.value)}
            step={unitText === 'in' ? 0.1 : 10}
            min={10}
            className="calculator-input pr-8 w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelDimensionsInput;
