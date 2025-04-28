
import React from 'react';
import Transition from '../UI/Transition';

interface CalculatorSectionProps {
  title: React.ReactNode;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  title,
  delay = 0,
  className = '',
  children
}) => {
  return (
    <Transition animation="slide-down" delay={delay}>
      <div className={`p-6 rounded-lg shadow-sm ${className}`}>
        <div className="mb-6">{title}</div>
        {children}
      </div>
    </Transition>
  );
};

export default CalculatorSection;
