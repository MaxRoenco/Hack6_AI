import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Brain, Lightbulb, X } from 'lucide-react';

const cognitiveHints = [
  {
    type: "Confirmation Bias Tip",
    description: "Challenge your first instinct. Ask: 'What evidence might prove me wrong?'",
    animation: "clapping",
    icon: <AlertCircle className="text-red-500" />
  },
  {
    type: "Learning Strategy",
    description: "Embrace mistakes as learning opportunities. Each error is a step towards mastery.",
    animation: "victory",
    icon: <Brain className="text-blue-500" />
  },
  {
    type: "Decision Making Insight",
    description: "Pause before deciding. Consider multiple perspectives and potential blind spots.",
    animation: "idle",
    icon: <Lightbulb className="text-yellow-500" />
  }
];

const CognitiveAssistant = ({ 
  onAnimationChange, 
  selectedBias 
}: { 
  onAnimationChange: (animation: string) => void, 
  selectedBias?: any 
}) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextHint = () => {
    const nextIndex = (currentHintIndex + 1) % cognitiveHints.length;
    setCurrentHintIndex(nextIndex);
    onAnimationChange(cognitiveHints[nextIndex].animation);
  };

  // Update hint based on selected bias
  React.useEffect(() => {
    if (selectedBias) {
      const biasHintIndex = cognitiveHints.findIndex(hint => 
        hint.type.toLowerCase().includes(selectedBias.type.toLowerCase().replace(' bias', ''))
      );
      if (biasHintIndex !== -1) {
        setCurrentHintIndex(biasHintIndex);
        onAnimationChange(cognitiveHints[biasHintIndex].animation);
      }
    }
  }, [selectedBias]);

  const currentHint = cognitiveHints[currentHintIndex];

  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-[500px] shadow-lg border-2 border-gray-100 relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 hover:bg-gray-100 rounded-full p-1"
      >
        <X size={20} className="text-gray-500" />
      </button>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        {currentHint.icon}
        <CardTitle className="text-lg">{currentHint.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{currentHint.description}</p>
          <Button 
            variant="outline" 
            className="w-full hover:bg-gray-50 transition-colors"
            onClick={nextHint}
          >
            Next Insight
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CognitiveAssistant;