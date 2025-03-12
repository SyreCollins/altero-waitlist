
import React from 'react';
import { useInView } from '@/utils/animation';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does Altero help me save money?",
    answer: "Altero uses AI-powered insights to analyze your spending patterns and automatically identify savings opportunities. Our smart budgeting tools help you track expenses by category and get personalized recommendations to optimize your finances."
  },
  {
    question: "Is my financial data secure with Altero?",
    answer: "Absolutely. We use bank-level 256-bit encryption to protect your data. We never store your banking credentials, and all connections to financial institutions are secured with tokenized access. Your privacy and security are our top priorities."
  },
  {
    question: "Can I connect multiple accounts to Altero?",
    answer: "Yes! Altero seamlessly connects with over 10,000 financial institutions. You can link checking accounts, savings accounts, credit cards, investment portfolios, retirement accounts, and more to get a comprehensive view of your finances."
  },
  {
    question: "How does the investment tracking feature work?",
    answer: "Our investment tracking feature provides real-time updates on your portfolio performance, detailed analytics on asset allocation, and helpful insights on diversification. You can set custom alerts for price changes and receive personalized investment recommendations."
  },
  {
    question: "Is there a fee to use Altero?",
    answer: "Altero offers a free basic plan that includes essential budgeting and expense tracking features. Our premium plans start at $4.99/month and include advanced features like investment tracking, financial goal planning, and personalized wealth-building strategies."
  },
  {
    question: "When will Altero be available to download?",
    answer: "We're currently in the final stages of development and plan to launch in Q1 2024. Join our waitlist to be among the first to get access to Altero when it launches, and receive exclusive early-bird pricing."
  }
];

export default function FAQ() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 px-6 bg-dark-900/50 relative"
    >
      <div className="shape-blob bg-finance-600/5 top-0 right-1/4 w-96 h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float"></div>
      
      <div className="max-w-4xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-finance-600/20 flex items-center justify-center text-finance-500">
              <MessageCircleQuestion size={24} />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get answers to common questions about Altero and how it can transform your financial journey.
          </p>
        </div>
        
        <div 
          className={`transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card rounded-xl overflow-hidden border-0"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-300">
            Have more questions? <a href="#waitlist" className="text-finance-500 hover:text-finance-400 underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
