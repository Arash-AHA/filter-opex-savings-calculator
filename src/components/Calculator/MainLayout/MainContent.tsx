
import React from 'react';
import DesignParameters from '../DesignParameters';
import FilterBagReplacement from '../FilterBagReplacement';
import OperationalParameters from '../OperationalParameters';
import SavingsResults from '../SavingsResults';
import CollapsibleSection from './CollapsibleSection';

interface MainContentProps {
  calculatorState: any;
  openSections: {
    bagReplacement: boolean;
    operational: boolean;
    savings: boolean;
  };
}

const MainContent: React.FC<MainContentProps> = ({ calculatorState, openSections }) => {
  return (
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
        gradientClasses="bg-gradient-to-r from-green-50 to-green-100/30 border border-green-100"
        delay={300}
      >
        <FilterBagReplacement 
          bagPrice={calculatorState.bagPrice}
          setBagPrice={calculatorState.setBagPrice}
          bagChangeTime={calculatorState.bagChangeTime}
          setBagChangeTime={calculatorState.setBagChangeTime}
          numPeople={calculatorState.numPeople}
          setNumPeople={calculatorState.setNumPeople}
          hourlyRate={calculatorState.hourlyRate}
          setHourlyRate={calculatorState.setHourlyRate}
          siteDistance={calculatorState.siteDistance}
          setSiteDistance={calculatorState.setSiteDistance}
          travelCost={calculatorState.travelCost}
          setTravelCost={calculatorState.setTravelCost}
          bagReplacementCost={calculatorState.bagReplacementCost}
          setBagReplacementCost={calculatorState.setBagReplacementCost}
          calculateTravelCost={() => {
            if (calculatorState.results.daysToReplace > 0) {
              calculatorState.calculateTravelCost(calculatorState.results.daysToReplace);
            }
          }}
          formattedResults={calculatorState.formattedResults}
        />
      </CollapsibleSection>
      
      <CollapsibleSection
        title="Operational Parameters (Savings with EMC Technology)"
        isOpen={openSections.operational}
        gradientClasses="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100"
        delay={500}
      >
        <OperationalParameters {...calculatorState} />
      </CollapsibleSection>
      
      <CollapsibleSection
        title="OPEX Savings Analysis"
        isOpen={openSections.savings}
        gradientClasses="bg-gradient-to-r from-yellow-50 to-yellow-100/30 border border-yellow-100"
        delay={700}
      >
        <SavingsResults {...calculatorState} />
      </CollapsibleSection>
    </div>
  );
};

export default MainContent;
