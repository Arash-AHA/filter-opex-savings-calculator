
import React from 'react';
import FilterOpexCalculator from '@/components/Calculator/FilterOpexCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <FilterOpexCalculator />
      
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© 2023 Filter OPEX Savings Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
