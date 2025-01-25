import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const SubscriptionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('subscriptionModalShown');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('subscriptionModalShown', 'true');
  };

  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      biasCount: 5,
      tokens: 500,
      features: [
        'Analyze 5 cognitive biases',
        'Limited token usage',
        'Basic analysis',
      ],
      recommended: false
    },
    {
      name: 'Pro Plan',
      price: '$5',
      biasCount: 10,
      tokens: 2000,
      features: [
        'Analyze 10 cognitive biases',
        'Extended token usage',
        'Detailed insights',
        'Priority support'
      ],
      recommended: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            BiasAware Subscription
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Choose the plan that fits your cognitive bias analysis needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`
                border-2 rounded-lg p-6 transition-all duration-300
                ${plan.recommended 
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-900' 
                  : 'border-gray-200 dark:border-gray-700'}
              `}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 
                  bg-black text-white dark:bg-white dark:text-black 
                  px-3 py-1 rounded-full text-xs font-bold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-center">
                {plan.name}
              </h3>
              
              <div className="text-center mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check 
                      className={`h-5 w-5 ${
                        plan.recommended 
                          ? 'text-black dark:text-white' 
                          : 'text-gray-500'
                      }`} 
                    />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.recommended ? 'default' : 'outline'} 
                className="w-full mt-6"
              >
                {plan.recommended ? 'Get Pro Plan' : 'Start Free'}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          No credit card required • Cancel anytime
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;