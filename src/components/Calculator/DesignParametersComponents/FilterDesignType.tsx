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
  return <ToggleGroup type="single" value={designType} onValueChange={value => value && setDesignType(value)} className="grid grid-cols-2 gap-4 w-full">
      <ToggleGroupItem value="bolt-weld" className="flex-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:ring-2 data-[state=on]:ring-primary/30 h-16 rounded-xl border-2 border-gray-200 hover:border-primary/50 transition-all duration-200">
        <div className="flex flex-col items-center gap-1">
          
          <span className="text-sm font-medium">Bolt/Weld Design</span>
        </div>
      </ToggleGroupItem>
      
      <ToggleGroupItem value="modular" className="flex-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:ring-2 data-[state=on]:ring-primary/30 h-16 rounded-xl border-2 border-gray-200 hover:border-primary/50 transition-all duration-200">
        <div className="flex flex-col items-center gap-1">
          
          <span className="text-sm font-medium">Modular Design</span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>;
};
export default FilterDesignType;