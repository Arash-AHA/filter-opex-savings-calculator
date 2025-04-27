
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bolt, Square } from "lucide-react";

interface FilterDesignTypeProps {
  designType: string;
  setDesignType: (value: string) => void;
}

const FilterDesignType: React.FC<FilterDesignTypeProps> = ({
  designType,
  setDesignType
}) => {
  return (
    <ToggleGroup 
      type="single" 
      value={designType}
      onValueChange={(value) => value && setDesignType(value)}
      className="flex flex-col gap-2 w-full md:w-1/2 mx-auto"
    >
      <ToggleGroupItem 
        value="bolt-weld" 
        className="flex-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:ring-2 data-[state=on]:ring-primary/30 h-14 rounded-xl border-2 border-gray-200 hover:border-primary/50 transition-all duration-200 w-full"
      >
        <div className="flex flex-col items-center gap-1">
          <Bolt className="h-5 w-5" />
          <span className="text-sm font-medium">Bolt/Weld Design</span>
        </div>
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="modular" 
        className="flex-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:ring-2 data-[state=on]:ring-primary/30 h-14 rounded-xl border-2 border-gray-200 hover:border-primary/50 transition-all duration-200 w-full"
      >
        <div className="flex flex-col items-center gap-1">
          <Square className="h-5 w-5" />
          <span className="text-sm font-medium">Modular Design</span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default FilterDesignType;
