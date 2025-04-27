
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  showOtherParams: boolean;
  setShowOtherParams: (value: boolean) => void;
  showDimensions: boolean;
  setShowDimensions: (value: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  showOtherParams,
  setShowOtherParams,
  showDimensions,
  setShowDimensions
}) => {
  return (
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
  );
};

export default ActionButtons;
