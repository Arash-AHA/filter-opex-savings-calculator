
import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BagsConfigProps {
  bagsPerRow: number;
  bagLength: number;
  designType: string;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
}

const BagsConfig: React.FC<BagsConfigProps> = ({
  bagsPerRow,
  bagLength,
  designType,
  setBagsPerRow,
  setBagLength
}) => {
  useEffect(() => {
    console.log(`BagsConfig rendered with: designType=${designType}, bagLength=${bagLength}, bagsPerRow=${bagsPerRow}`);
  }, [designType, bagLength, bagsPerRow]);

  const handleBagsPerRowChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    console.log(`Setting bags per row to: ${numValue}`);
    setBagsPerRow(numValue);
  };

  const handleBagLengthChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    console.log(`Setting bag length to: ${numValue}`);
    setBagLength(numValue);
  };

  return (
    <>
      <div className="flex flex-col mb-4">
        <div className="w-full calculator-field-label mb-2">
          <span>Number of Bags per Row
(cleaned by one pulsejet valve):</span>
        </div>
        <div>
          <Select 
            value={bagsPerRow ? bagsPerRow.toString() : ""} 
            onValueChange={handleBagsPerRowChange}
          >
            <SelectTrigger className="calculator-input w-full">
              <SelectValue placeholder="Select bags per row" />
            </SelectTrigger>
            <SelectContent>
              {designType === 'bolt-weld' ? (
                <>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="15">15</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col mb-4">
        <div className="w-full calculator-field-label mb-2">
          <span>Filter Bag Length:</span>
        </div>
        <div>
          <Select 
            value={bagLength ? bagLength.toString() : ""}
            onValueChange={handleBagLengthChange}
          >
            <SelectTrigger className="calculator-input w-full">
              <SelectValue placeholder="Select bag length" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {designType === 'bolt-weld' ? (
                <>
                  <SelectItem value="6">6 m</SelectItem>
                  <SelectItem value="7">7 m</SelectItem>
                  <SelectItem value="8">8 m</SelectItem>
                  <SelectItem value="9">9 m</SelectItem>
                  <SelectItem value="10">10 m</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="16">16 ft</SelectItem>
                  <SelectItem value="21">21 ft</SelectItem>
                  <SelectItem value="24">24 ft</SelectItem>
                  <SelectItem value="28">28 ft</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default BagsConfig;
