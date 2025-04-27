
import React, { useState } from 'react';
import { useCalculatorState } from './hooks/useCalculatorState';
import FilterOpexTitle from './MainLayout/FilterOpexTitle';
import MainContent from './MainLayout/MainContent';

const FilterOpexCalculator = () => {
  const calculatorState = useCalculatorState();
  const [openSections, setOpenSections] = useState({
    bagReplacement: false,
    operational: false,
    savings: false
  });

  return (
    <div className="max-w-7xl mx-auto">
      <FilterOpexTitle />
      <MainContent 
        calculatorState={calculatorState}
        openSections={openSections}
      />
    </div>
  );
};

export default FilterOpexCalculator;
