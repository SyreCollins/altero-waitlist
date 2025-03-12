
import React from 'react';
import { useInView } from '@/utils/animation';
import { Check, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  "Smart Budgeting",
  "Expense Tracking",
  "Investment Dashboard",
  "AI Financial Insights",
  "Goal Planning",
  "Bill Reminders",
  "Multi-Account Sync",
  "Advanced Security",
  "Dedicated Support"
];

const competitors = [
  {
    name: "Altero",
    isUs: true,
    features: [true, true, true, true, true, true, true, true, true],
    highlight: "Full-featured financial platform with AI-powered insights"
  },
  {
    name: "Competitor A",
    isUs: false,
    features: [true, true, false, false, true, true, true, false, false],
    highlight: "Basic budgeting app with limited features"
  },
  {
    name: "Competitor B",
    isUs: false,
    features: [true, true, true, false, false, true, false, true, false],
    highlight: "Expensive platform missing key analytics"
  }
];

export default function ComparisonTable() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <section
      id="comparison"
      ref={ref}
      className="py-24 px-6 bg-dark-900/50 relative overflow-hidden"
    >
      <div className="shape-blob bg-finance-600/5 bottom-0 left-1/4 w-96 h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float"></div>
      
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            How We <span className="text-gradient">Compare</span>
          </h2>
          <p className="text-gray-300 text-lg">
            See how Altero stacks up against other financial tools in the market.
          </p>
        </div>
        
        <div 
          className={`overflow-x-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <table className="w-full min-w-[768px]">
            <thead>
              <tr>
                <th className="p-4 text-left">Features</th>
                {competitors.map((competitor) => (
                  <th 
                    key={competitor.name}
                    className={cn(
                      "p-4 text-center",
                      competitor.isUs ? "text-finance-500" : "text-gray-300"
                    )}
                  >
                    {competitor.isUs && (
                      <div className="flex justify-center mb-2">
                        <div className="inline-block px-3 py-1 text-xs rounded-full bg-finance-500/10 text-finance-500 font-medium">
                          Recommended
                        </div>
                      </div>
                    )}
                    <span className={cn(
                      "text-xl font-bold",
                      competitor.isUs ? "text-white" : ""
                    )}>
                      {competitor.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature} className="border-t border-white/5">
                  <td className="p-4 text-gray-300">{feature}</td>
                  {competitors.map((competitor) => (
                    <td 
                      key={`${competitor.name}-${feature}`}
                      className={cn(
                        "p-4 text-center",
                        competitor.isUs ? "bg-dark-800/20" : ""
                      )}
                    >
                      {competitor.features[index] ? (
                        <Check 
                          size={24} 
                          className={cn(
                            "mx-auto",
                            competitor.isUs ? "text-finance-500" : "text-gray-400"
                          )} 
                        />
                      ) : (
                        <X size={24} className="mx-auto text-gray-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-white/5">
                <td className="p-4 text-gray-300 font-medium">Summary</td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-summary`}
                    className={cn(
                      "p-4 text-sm",
                      competitor.isUs ? "bg-dark-800/20 text-white" : "text-gray-400"
                    )}
                  >
                    {competitor.highlight}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div 
          className={`mt-12 flex justify-center transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a 
            href="#waitlist" 
            className="inline-flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <CheckCircle2 size={18} /> Choose Altero Today
          </a>
        </div>
      </div>
    </section>
  );
}
