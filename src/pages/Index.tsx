
import React from 'react';
import FilterOpexCalculator from '@/components/Calculator/FilterOpexCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-medium text-gray-900 mb-4">
          Filter OPEX Savings Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Evaluate and optimize your filtration system's operational expenditure with our advanced calculator.
        </p>
      </header>
      
      <FilterOpexCalculator />
      
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© 2023 Filter OPEX Savings Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
