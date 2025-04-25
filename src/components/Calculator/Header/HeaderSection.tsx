
import React from 'react';
import Transition from '@/components/UI/Transition';

const HeaderSection = () => {
  return (
    <div className="text-center mb-8">
      <Transition animation="slide-in-left" delay={100}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
          <h1 className="text-3xl font-medium text-gray-900">Filter OPEX Savings Calculator</h1>
        </div>
      </Transition>
      <Transition animation="slide-in-right" delay={300}>
        <p className="text-sm text-gray-500 italic mt-2">
          By Arash Haghi, Scheuch North America
        </p>
      </Transition>
    </div>
  );
};

export default HeaderSection;
