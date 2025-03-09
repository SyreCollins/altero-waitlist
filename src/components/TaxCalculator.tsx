
import React, { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { useInView } from '@/utils/animation';

export default function TaxCalculator() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [income, setIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [taxResult, setTaxResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateTax = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple tax calculation logic (for demonstration)
    const incomeValue = parseFloat(income.replace(/,/g, ''));
    
    if (isNaN(incomeValue)) {
      return;
    }
    
    let taxAmount = 0;
    
    // Simplified tax brackets (for demonstration)
    if (filingStatus === 'single') {
      if (incomeValue <= 10000) {
        taxAmount = incomeValue * 0.10;
      } else if (incomeValue <= 40000) {
        taxAmount = 1000 + (incomeValue - 10000) * 0.12;
      } else if (incomeValue <= 85000) {
        taxAmount = 4600 + (incomeValue - 40000) * 0.22;
      } else if (incomeValue <= 165000) {
        taxAmount = 14500 + (incomeValue - 85000) * 0.24;
      } else if (incomeValue <= 210000) {
        taxAmount = 33600 + (incomeValue - 165000) * 0.32;
      } else {
        taxAmount = 47800 + (incomeValue - 210000) * 0.35;
      }
    } else if (filingStatus === 'joint') {
      if (incomeValue <= 20000) {
        taxAmount = incomeValue * 0.10;
      } else if (incomeValue <= 80000) {
        taxAmount = 2000 + (incomeValue - 20000) * 0.12;
      } else if (incomeValue <= 170000) {
        taxAmount = 9200 + (incomeValue - 80000) * 0.22;
      } else if (incomeValue <= 330000) {
        taxAmount = 29000 + (incomeValue - 170000) * 0.24;
      } else if (incomeValue <= 420000) {
        taxAmount = 67400 + (incomeValue - 330000) * 0.32;
      } else {
        taxAmount = 95800 + (incomeValue - 420000) * 0.35;
      }
    }
    
    setTaxResult(Math.round(taxAmount));
    setIsCalculated(true);
  };

  // Format number with commas
  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIncome(formatNumber(value));
  };

  return (
    <section
      id="tax-calculator"
      ref={ref}
      className="py-24 px-6 bg-dark-950 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="shape-circle bg-finance-500/5 -left-48 top-1/4 animate-float"></div>
        <div className="shape-blob bg-finance-600/5 -right-48 bottom-0 w-96 h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float animate-delay-500"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative">
        <div 
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Calculate Your <span className="text-gradient">Tax Liability</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Get a quick estimate of your tax liability with our simple calculator. Plan your finances better with accurate projections.
          </p>
        </div>
        
        <div 
          className={`glass-card rounded-2xl p-8 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <form onSubmit={calculateTax} className="space-y-6">
                <div>
                  <label htmlFor="income" className="block text-sm font-medium text-gray-300 mb-1">
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="text"
                      id="income"
                      value={income}
                      onChange={handleIncomeChange}
                      placeholder="0"
                      className="w-full pl-8 bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="filingStatus" className="block text-sm font-medium text-gray-300 mb-1">
                    Filing Status
                  </label>
                  <select
                    id="filingStatus"
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value)}
                    className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                  >
                    <option value="single">Single</option>
                    <option value="joint">Married Filing Jointly</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  <Calculator size={18} />
                  Calculate Tax
                </button>
              </form>
            </div>
            
            <div className="flex flex-col items-center justify-center h-full">
              {isCalculated ? (
                <div className="text-center space-y-6">
                  <div>
                    <p className="text-gray-300 mb-2">Estimated Tax Liability:</p>
                    <p className="text-4xl font-bold text-gradient">${taxResult?.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-finance-600/20 border border-finance-600/30 rounded-xl p-6">
                    <h4 className="text-xl font-medium mb-2">Plan Your Financial Future</h4>
                    <p className="text-gray-300 text-sm mb-4">
                      Join our waitlist to access powerful tools that help you optimize your tax strategy and build wealth.
                    </p>
                    <a 
                      href="#waitlist" 
                      className="inline-flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all w-full"
                    >
                      Join the Waitlist <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-finance-600/20 flex items-center justify-center text-finance-500 mb-5 mx-auto">
                    <Calculator size={36} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Tax Estimator</h3>
                  <p className="text-gray-300 text-sm">
                    Enter your information on the left to get a quick estimate of your tax liability.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
