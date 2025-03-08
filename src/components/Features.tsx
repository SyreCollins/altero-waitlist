
import React from 'react';
import { 
  Wallet, ChartBar, CreditCard, PieChart, 
  Target, Bell, Lock, Zap
} from 'lucide-react';
import { useInView } from '@/utils/animation';

const features = [
  {
    icon: Wallet,
    title: "Smart Budgeting",
    description: "Automatically categorize transactions and get personalized insights on your spending habits."
  },
  {
    icon: ChartBar,
    title: "Investment Tracking",
    description: "Monitor your investments in real-time with detailed performance metrics and growth projections."
  },
  {
    icon: CreditCard,
    title: "Bill Management",
    description: "Never miss a payment with automated reminders and scheduled bill payments."
  },
  {
    icon: PieChart,
    title: "Expense Analysis",
    description: "View detailed breakdowns of your spending with interactive charts and reports."
  },
  {
    icon: Target,
    title: "Financial Goals",
    description: "Set savings targets and track your progress with visual milestones and achievements."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive customized notifications for unusual transactions, bill due dates, and investment opportunities."
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Rest easy with end-to-end encryption and advanced security protocols protecting your data."
  },
  {
    icon: Zap,
    title: "AI Recommendations",
    description: "Get personalized financial advice based on your spending patterns and financial goals."
  }
];

export default function Features() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <section
      id="features"
      ref={ref}
      className="py-24 px-6 bg-dark-900/50 relative"
    >
      <div className="shape-blob bg-finance-600/5 top-0 left-1/4 w-96 h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Powerful Features for Your <span className="text-gradient">Financial Journey</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Our comprehensive suite of tools helps you track, manage, and grow your wealth with ease.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-card rounded-xl p-6 flex flex-col transition-all duration-700 delay-${index * 100} transform ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="h-12 w-12 rounded-xl bg-finance-600/20 flex items-center justify-center text-finance-500 mb-5">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
