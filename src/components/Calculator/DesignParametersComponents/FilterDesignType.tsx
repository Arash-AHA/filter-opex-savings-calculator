
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FilterDesignTypeProps {
  designType: string;
  setDesignType: (value: string) => void;
}

const FilterDesignType: React.FC<FilterDesignTypeProps> = ({
  designType,
  setDesignType
}) => {
  return (
    <div className="mb-6">
      <ToggleGroup type="single" value={designType} onValueChange={value => value && setDesignType(value)} className="flex gap-2">
        <ToggleGroupItem 
          value="bolt-weld" 
          aria-label="Panelized Design"
          className="flex-1 border border-gray-200 rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
        >
          Panelized Design
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="modular" 
          aria-label="Modular Design"
          className="flex-1 border border-gray-200 rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
        >
          Modular Design
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FilterDesignType;
