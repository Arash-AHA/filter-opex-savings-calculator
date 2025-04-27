
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
    <div className="space-y-4 mb-4 w-[320px]">
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setShowOtherParams(!showOtherParams)}
      >
        {showOtherParams ? 'Hide Other Parameters' : 'Show Other Filter Design Parameters'}
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setShowDimensions(!showDimensions)}
      >
        {showDimensions ? 'Hide Filter Dimensions / Footprint' : 'Show Filter Dimensions / Footprint'}
      </Button>
    </div>
  );
};

export default ActionButtons;
