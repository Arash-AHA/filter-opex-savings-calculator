
import React, { useState } from 'react';
import FilterOpexTitle from './Layout/FilterOpexTitle';
import CollapsibleSection from './Layout/CollapsibleSection';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';

const FilterOpexCalculator = () => {
  const calculatorState = useCalculatorState();
  const [openSections, setOpenSections] = useState({
    bagReplacement: false,
    operational: false,
    savings: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <FilterOpexTitle />
      
      <div className="grid grid-cols-1 gap-8">
        <CalculatorSection 
          title="Filter Design Configuration"
          delay={100}
          className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-100"
        >
          <DesignParameters {...calculatorState} />
        </CalculatorSection>

        <CollapsibleSection
          title="Filter Bag Replacement (Cost Estimation)"
          isOpen={openSections.bagReplacement}
          onToggle={() => toggleSection('bagReplacement')}
          delay={300}
          className="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        >
          <FilterBagReplacement {...calculatorState} />
        </CollapsibleSection>

        <CollapsibleSection
          title="Operational Parameters (Savings with EMC Technology)"
          isOpen={openSections.operational}
          onToggle={() => toggleSection('operational')}
          delay={500}
          className="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        >
          <OperationalParameters {...calculatorState} />
        </CollapsibleSection>

        <CollapsibleSection
          title="OPEX Savings Analysis"
          isOpen={openSections.savings}
          onToggle={() => toggleSection('savings')}
          delay={700}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        >
          <SavingsResults {...calculatorState} />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default FilterOpexCalculator;
