
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, AlertCircle } from 'lucide-react';
import { useInView } from '@/utils/animation';
import { useToast } from "@/hooks/use-toast";

interface TaxRate {
  min: number;
  max: number | null;
  rate: number;
  deduction: number;
}

interface CountryTaxSystem {
  name: string;
  code: string;
  currency: string;
  symbol: string;
  taxBrackets: {
    single: TaxRate[];
    joint: TaxRate[];
  };
  standardDeduction: {
    single: number;
    joint: number;
  };
  maxDeductibleAmount: number;
}

const countries: CountryTaxSystem[] = [
  {
    name: "United States",
    code: "us",
    currency: "USD",
    symbol: "$",
    taxBrackets: {
      single: [
        { min: 0, max: 11000, rate: 0.10, deduction: 0 },
        { min: 11000, max: 44725, rate: 0.12, deduction: 1100 },
        { min: 44725, max: 95375, rate: 0.22, deduction: 5147 },
        { min: 95375, max: 182100, rate: 0.24, deduction: 16290 },
        { min: 182100, max: 231250, rate: 0.32, deduction: 37104 },
        { min: 231250, max: 578125, rate: 0.35, deduction: 52832 },
        { min: 578125, max: null, rate: 0.37, deduction: 174238 },
      ],
      joint: [
        { min: 0, max: 22000, rate: 0.10, deduction: 0 },
        { min: 22000, max: 89450, rate: 0.12, deduction: 2200 },
        { min: 89450, max: 190750, rate: 0.22, deduction: 10294 },
        { min: 190750, max: 364200, rate: 0.24, deduction: 32580 },
        { min: 364200, max: 462500, rate: 0.32, deduction: 74208 },
        { min: 462500, max: 693750, rate: 0.35, deduction: 105664 },
        { min: 693750, max: null, rate: 0.37, deduction: 186601.5 },
      ]
    },
    standardDeduction: {
      single: 12950,
      joint: 25900
    },
    maxDeductibleAmount: 10000
  },
  {
    name: "United Kingdom",
    code: "uk",
    currency: "GBP",
    symbol: "£",
    taxBrackets: {
      single: [
        { min: 0, max: 12570, rate: 0, deduction: 0 },
        { min: 12570, max: 50270, rate: 0.20, deduction: 0 },
        { min: 50270, max: 125140, rate: 0.40, deduction: 7540 },
        { min: 125140, max: null, rate: 0.45, deduction: 12630 },
      ],
      joint: [
        { min: 0, max: 12570, rate: 0, deduction: 0 },
        { min: 12570, max: 50270, rate: 0.20, deduction: 0 },
        { min: 50270, max: 125140, rate: 0.40, deduction: 7540 },
        { min: 125140, max: null, rate: 0.45, deduction: 12630 },
      ]
    },
    standardDeduction: {
      single: 12570,
      joint: 12570
    },
    maxDeductibleAmount: 2000
  },
  {
    name: "Canada",
    code: "ca",
    currency: "CAD",
    symbol: "$",
    taxBrackets: {
      single: [
        { min: 0, max: 50197, rate: 0.15, deduction: 0 },
        { min: 50197, max: 100392, rate: 0.205, deduction: 2760 },
        { min: 100392, max: 155625, rate: 0.26, deduction: 5322 },
        { min: 155625, max: 221708, rate: 0.29, deduction: 9737 },
        { min: 221708, max: null, rate: 0.33, deduction: 18799 }
      ],
      joint: [
        { min: 0, max: 50197, rate: 0.15, deduction: 0 },
        { min: 50197, max: 100392, rate: 0.205, deduction: 2760 },
        { min: 100392, max: 155625, rate: 0.26, deduction: 5322 },
        { min: 155625, max: 221708, rate: 0.29, deduction: 9737 },
        { min: 221708, max: null, rate: 0.33, deduction: 18799 }
      ]
    },
    standardDeduction: {
      single: 13808,
      joint: 13808
    },
    maxDeductibleAmount: 2500
  },
  {
    name: "Australia",
    code: "au",
    currency: "AUD",
    symbol: "$",
    taxBrackets: {
      single: [
        { min: 0, max: 18200, rate: 0, deduction: 0 },
        { min: 18200, max: 45000, rate: 0.19, deduction: 0 },
        { min: 45000, max: 120000, rate: 0.325, deduction: 5092 },
        { min: 120000, max: 180000, rate: 0.37, deduction: 29467 },
        { min: 180000, max: null, rate: 0.45, deduction: 51667 }
      ],
      joint: [
        { min: 0, max: 18200, rate: 0, deduction: 0 },
        { min: 18200, max: 45000, rate: 0.19, deduction: 0 },
        { min: 45000, max: 120000, rate: 0.325, deduction: 5092 },
        { min: 120000, max: 180000, rate: 0.37, deduction: 29467 },
        { min: 180000, max: null, rate: 0.45, deduction: 51667 }
      ]
    },
    standardDeduction: {
      single: 18200,
      joint: 18200
    },
    maxDeductibleAmount: 3000
  }
];

export default function TaxCalculator() {
  const { toast } = useToast();
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [income, setIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [country, setCountry] = useState<string>('us');
  const [deductions, setDeductions] = useState<string>('0');
  const [taxCredits, setTaxCredits] = useState<string>('0');
  const [taxResult, setTaxResult] = useState<number | null>(null);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const selectedCountry = countries.find(c => c.code === country) || countries[0];

  // Format number with commas and appropriate currency symbol
  const formatMoney = (value: number): string => {
    return `${selectedCountry.symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIncome(formatNumber(value));
  };

  const handleDeductionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeductions(formatNumber(value));
  };

  const handleTaxCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaxCredits(formatNumber(value));
  };

  const calculateTaxManually = (incomeAmount: number, deductionsAmount: number, creditsAmount: number): number => {
    // Get the correct tax bracket based on filing status
    const taxBrackets = selectedCountry.taxBrackets[filingStatus as 'single' | 'joint'];
    
    // Apply standard deduction if user hasn't specified custom deductions
    const standardDeduction = selectedCountry.standardDeduction[filingStatus as 'single' | 'joint'];
    const effectiveDeductions = deductionsAmount > 0 ? 
      Math.min(deductionsAmount, selectedCountry.maxDeductibleAmount) : 
      standardDeduction;
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, incomeAmount - effectiveDeductions);
    
    // Find the applicable tax bracket
    let applicableBracket = taxBrackets[0];
    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min && (bracket.max === null || taxableIncome <= bracket.max)) {
        applicableBracket = bracket;
        break;
      }
    }
    
    // Calculate tax
    let tax = (taxableIncome * applicableBracket.rate) - applicableBracket.deduction;
    
    // Apply tax credits
    tax = Math.max(0, tax - creditsAmount);
    
    // Set effective tax rate
    setEffectiveTaxRate(tax > 0 ? (tax / incomeAmount) * 100 : 0);
    
    return Math.round(tax);
  };

  const fetchTaxEstimate = async (incomeAmount: number, deductionsAmount: number, creditsAmount: number) => {
    // This is where we would integrate with a real tax API
    // For now, we'll use our manual calculation and simulate an API delay
    
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        try {
          const taxAmount = calculateTaxManually(incomeAmount, deductionsAmount, creditsAmount);
          // Randomly simulate API errors about 10% of the time for demonstration
          if (Math.random() > 0.9) {
            reject(new Error("Tax API service is temporarily unavailable. Using backup calculation."));
          } else {
            resolve(taxAmount);
          }
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simulate 1-second API delay
    });
  };

  const calculateTax = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);
    
    const incomeValue = parseFloat(income.replace(/,/g, ''));
    const deductionsValue = parseFloat(deductions.replace(/,/g, '')) || 0;
    const creditsValue = parseFloat(taxCredits.replace(/,/g, '')) || 0;
    
    if (isNaN(incomeValue)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid income amount.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Attempt to fetch from API
      const taxAmount = await fetchTaxEstimate(incomeValue, deductionsValue, creditsValue);
      setTaxResult(taxAmount);
      setIsCalculated(true);
    } catch (error) {
      // Fall back to manual calculation on API error
      setApiError((error as Error).message);
      const backupTaxAmount = calculateTaxManually(incomeValue, deductionsValue, creditsValue);
      setTaxResult(backupTaxAmount);
      setIsCalculated(true);
      
      toast({
        title: "Warning",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            Get an accurate estimate of your tax liability with our multi-country tax calculator. Plan your finances better with precise projections.
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
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="income" className="block text-sm font-medium text-gray-300 mb-1">
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {selectedCountry.symbol}
                    </span>
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
                
                <div>
                  <label htmlFor="deductions" className="block text-sm font-medium text-gray-300 mb-1">
                    Additional Deductions
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {selectedCountry.symbol}
                    </span>
                    <input
                      type="text"
                      id="deductions"
                      value={deductions}
                      onChange={handleDeductionsChange}
                      placeholder="0"
                      className="w-full pl-8 bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Standard deduction: {formatMoney(selectedCountry.standardDeduction[filingStatus as 'single' | 'joint'])} 
                    (max additional: {formatMoney(selectedCountry.maxDeductibleAmount)})
                  </p>
                </div>
                
                <div>
                  <label htmlFor="taxCredits" className="block text-sm font-medium text-gray-300 mb-1">
                    Tax Credits
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {selectedCountry.symbol}
                    </span>
                    <input
                      type="text"
                      id="taxCredits"
                      value={taxCredits}
                      onChange={handleTaxCreditsChange}
                      placeholder="0"
                      className="w-full pl-8 bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <Calculator size={18} />
                      <span>Calculate Tax</span>
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div className="flex flex-col items-center justify-center h-full">
              {isCalculated ? (
                <div className="text-center space-y-6 w-full">
                  <div>
                    <p className="text-gray-300 mb-2">Estimated Tax Liability:</p>
                    <p className="text-4xl font-bold text-gradient">{formatMoney(taxResult || 0)}</p>
                    
                    {effectiveTaxRate !== null && (
                      <p className="text-sm text-gray-300 mt-2">
                        Effective Tax Rate: {effectiveTaxRate.toFixed(2)}%
                      </p>
                    )}
                    
                    {apiError && (
                      <div className="flex items-center justify-center gap-2 mt-3 text-amber-500 text-sm">
                        <AlertCircle size={16} />
                        <p>{apiError}</p>
                      </div>
                    )}
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
                  <h3 className="text-xl font-medium mb-2">Multi-Country Tax Estimator</h3>
                  <p className="text-gray-300 text-sm">
                    Enter your information to get an accurate tax estimate based on current tax laws.
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
