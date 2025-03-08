
import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useInView } from '@/utils/animation';
import { useWaitlist } from './WaitlistContext';

export default function Waitlist() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { joinWaitlist, loading } = useWaitlist();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    const result = await joinWaitlist(email);
    
    if (result) {
      setSuccess(true);
      setEmail('');
    }
  };
  
  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-24 px-6 bg-dark-900 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="shape-circle bg-finance-500/5 top-0 right-0 animate-float"></div>
        <div className="shape-blob bg-finance-600/5 bottom-0 left-0 w-96 h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float animate-delay-500"></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Be among the first to experience the future of personal finance management. Sign up for exclusive early access.
          </p>
        </div>
        
        <div 
          className={`glass-card rounded-2xl p-8 md:p-12 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Early Access Benefits</h3>
              <ul className="space-y-4">
                {[
                  "Priority access when we launch",
                  "Free premium features for 3 months",
                  "Exclusive webinars with financial experts",
                  "Direct line to our product team"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-finance-600/20 p-1 rounded-full text-finance-500 flex-shrink-0 mt-0.5">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              {success ? (
                <div className="bg-finance-600/20 border border-finance-600/30 rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-finance-600 rounded-full mb-4">
                    <Check size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">You're on the list!</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    We'll notify you when we're ready to launch. Keep an eye on your inbox!
                  </p>
                  <button 
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="text-sm text-finance-500 hover:text-finance-400"
                  >
                    Join with another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                    />
                    {error && (
                      <p className="text-red-400 text-sm mt-1">{error}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all ${
                      loading ? 'opacity-80' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
