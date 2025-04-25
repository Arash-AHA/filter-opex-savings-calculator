
import React from 'react';
import { Link } from 'react-router-dom';
import FilterOpexCalculator from '@/components/Calculator/FilterOpexCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-end">
          <Link 
            to="/baghouse-design" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Go to Baghouse Design Calculator
          </Link>
        </div>
      </div>
      
      <FilterOpexCalculator />
      
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Filter OPEX Savings Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
