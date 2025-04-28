
import React from 'react';
import { cn } from '@/lib/utils';
import Transition from '../UI/Transition';

type CalculatorSectionProps = {
  title: React.ReactNode; // Changed from string to ReactNode to accept elements
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  delay?: number;
};

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  title,
  children,
  className,
  contentClassName,
  headerClassName,
  headerContent,
  delay = 0,
}) => {
  return (
    <Transition
      className={cn("calculator-section", className)}
      animation="fade-in"
      delay={delay}
    >
      <div className={cn("calculator-section-header", headerClassName)}>
        <div className="flex items-center justify-between">
          <h2 className="calculator-section-title">{title}</h2>
          {headerContent}
        </div>
      </div>
      <div className={cn("calculator-section-content", contentClassName)}>
        {children}
      </div>
    </Transition>
  );
};

export default CalculatorSection;
