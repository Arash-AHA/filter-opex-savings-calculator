
import React, { useState } from 'react';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';
import CollapsibleSection from './components/CollapsibleSection';
import CalculatorHeader from './components/CalculatorHeader';
import CalculatorSection from './CalculatorSection';

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
    <div className="max-w-7xl mx-auto">
      <CalculatorHeader />
      
      <div className="grid grid-cols-1 gap-8">
        {/* Design Configuration Section */}
        <CalculatorSection 
          title="Filter Design Configuration" 
          delay={100}
          className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-100"
        >
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <DesignParameters {...calculatorState} />
            </div>
            <div className="col-span-1">
              {/* Right side content if any */}
            </div>
          </div>
        </CalculatorSection>
        
        {/* Filter Bag Replacement Section */}
        <CollapsibleSection
          title="Filter Bag Replacement (Cost Estimation)"
          isOpen={openSections.bagReplacement}
          onToggle={() => toggleSection('bagReplacement')}
          delay={300}
          gradientClass="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        >
          <FilterBagReplacement {...calculatorState} />
        </CollapsibleSection>
        
        {/* Operational Parameters Section */}
        <CollapsibleSection
          title="Operational Parameters (Savings with EMC Technology)"
          isOpen={openSections.operational}
          onToggle={() => toggleSection('operational')}
          delay={500}
          gradientClass="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        >
          <OperationalParameters 
            {...calculatorState}
            numEMCFlaps={Number(calculatorState.numEMCFlaps)}
          />
        </CollapsibleSection>
        
        {/* OPEX Savings Analysis Section */}
        <CollapsibleSection
          title="OPEX Savings Analysis"
          isOpen={openSections.savings}
          onToggle={() => toggleSection('savings')}
          delay={700}
          gradientClass="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        >
          <SavingsResults {...calculatorState} />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default FilterOpexCalculator;
