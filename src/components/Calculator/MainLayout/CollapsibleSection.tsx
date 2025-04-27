
import React from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import CalculatorSection from '../CalculatorSection';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  gradientClasses: string;
  delay: number;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  gradientClasses,
  delay,
  children
}) => {
  return (
    <Collapsible open={isOpen}>
      <CalculatorSection
        title={
          <div className="flex items-center justify-between w-full">
            <span>{title}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </div>
        }
        delay={delay}
        className={gradientClasses}
      >
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      </CalculatorSection>
    </Collapsible>
  );
};

export default CollapsibleSection;
