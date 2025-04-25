
import React, { useState } from 'react';
import HeaderSection from './Header/HeaderSection';
import CalculatorSection from './CalculatorSection';
import CollapsibleSection from './CollapsibleSection/CollapsibleSection';
import DesignParameters from './DesignParameters';
import FilterBagReplacement from './FilterBagReplacement';
import OperationalParameters from './OperationalParameters';
import SavingsResults from './SavingsResults';
import { useCalculatorState } from './hooks/useCalculatorState';

const FilterOpexCalculator = () => {
  const calculatorState = useCalculatorState();
  const [openSections, setOpenSections] = useState({
    design: true,
    dimensions: true,
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
  
  // Ensure numEMCFlaps is a number for OperationalParameters
  const numEMCFlapsAsNumber = typeof calculatorState.numEMCFlaps === 'string' 
    ? parseInt(calculatorState.numEMCFlaps) || 0 
    : calculatorState.numEMCFlaps;

  return (
    <div className="max-w-5xl mx-auto">
      <HeaderSection />
      
      <div className="grid grid-cols-1 gap-8">
        {/* Design Parameters Section */}
        <CollapsibleSection
          title="Filter Design Configuration"
          isOpen={openSections.design}
          onToggle={() => toggleSection('design')}
          delay={100}
          className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-100"
        >
          <DesignParameters 
            {...calculatorState}
          />
        </CollapsibleSection>
        
        {/* Filter Bag Replacement Section */}
        <CollapsibleSection
          title="Filter Bag Replacement"
          isOpen={openSections.bagReplacement}
          onToggle={() => toggleSection('bagReplacement')}
          delay={300}
          className="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        >
          <FilterBagReplacement 
            {...{
              ...calculatorState,
              numEMCFlaps: numEMCFlapsAsNumber,
              calculateTravelCost: () => calculatorState.calculateTravelCost(calculatorState.results.daysToReplace)
            }}
          />
        </CollapsibleSection>
        
        {/* Operational Parameters Section */}
        <CollapsibleSection
          title="Operational Parameters"
          isOpen={openSections.operational}
          onToggle={() => toggleSection('operational')}
          delay={500}
          className="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        >
          <OperationalParameters 
            {...{
              ...calculatorState,
              numEMCFlaps: numEMCFlapsAsNumber
            }}
          />
        </CollapsibleSection>
        
        {/* Results Section */}
        <CollapsibleSection
          title="OPEX Savings Analysis"
          isOpen={openSections.savings}
          onToggle={() => toggleSection('savings')}
          delay={700}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        >
          <SavingsResults 
            {...calculatorState}
          />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default FilterOpexCalculator;
