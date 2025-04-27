
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
    <div className="flex flex-col space-y-4">
      <Button 
        variant="outline" 
        className="w-full max-w-[280px] mx-auto"
        onClick={() => setShowOtherParams(!showOtherParams)}
      >
        {showOtherParams ? 'Hide Other Filter Design Parameters' : 'Show Other Filter Design Parameters'}
      </Button>
      <Button 
        variant="outline" 
        className="w-full max-w-[280px] mx-auto"
        onClick={() => setShowDimensions(!showDimensions)}
      >
        {showDimensions ? 'Hide Filter Dimensions / Footprint' : 'Show Filter Dimensions / Footprint'}
      </Button>
    </div>
  );
};

export default ActionButtons;
