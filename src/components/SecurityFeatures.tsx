
import React from 'react';
import { useInView } from '@/utils/animation';
import { Lock, Shield, Key, UserCheck, Eye, Ban, AlertTriangle } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: "Bank-Level Encryption",
    description: "Your data is protected with 256-bit encryption, the same security standard used by major financial institutions."
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Multi-factor authentication and biometric login options keep your account secure from unauthorized access."
  },
  {
    icon: Key,
    title: "Tokenized Access",
    description: "We use secure tokens to connect to your financial accounts, meaning we never store your banking credentials."
  },
  {
    icon: UserCheck,
    title: "Privacy Controls",
    description: "Granular privacy settings give you complete control over what data is shared and how it's used."
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "Our security team continuously monitors for suspicious activities and potential vulnerabilities."
  },
  {
    icon: Ban,
    title: "Data Minimization",
    description: "We only collect the data necessary to provide our services, and you can request deletion at any time."
  }
];

export default function SecurityFeatures() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <section
      id="security"
      ref={ref}
      className="py-24 px-6 bg-dark-950 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-finance-600/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-finance-600/50 to-transparent"></div>
      <div className="shape-circle bg-finance-800/10 top-20 -right-48 animate-float"></div>
      
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-finance-600/20 flex items-center justify-center text-finance-500">
              <Shield size={24} />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Bank-Grade <span className="text-gradient">Security</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Your financial security is our top priority. Altero employs advanced security measures to ensure your data is always protected.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {securityFeatures.map((feature, index) => (
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
        
        <div 
          className={`mt-16 p-6 glass-card rounded-xl border border-finance-600/20 max-w-3xl mx-auto transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-finance-600/20 flex-shrink-0 flex items-center justify-center text-finance-500 mt-1">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Our Security Promise</h4>
              <p className="text-gray-300 text-sm">
                At Altero, we're committed to maintaining the highest security standards. Our platform undergoes regular security audits and penetration testing by independent third-party experts. We continuously update our security protocols to stay ahead of emerging threats, ensuring your financial data remains safe at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
