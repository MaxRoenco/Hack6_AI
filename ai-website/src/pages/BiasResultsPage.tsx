import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import BiasAnalysisSection from '@/components/BiasAnalysisSection';

// Bias color and description mapping
const BIAS_DETAILS: Record<string, { color: string; description: string }> = {
  'bandwagon_effect': {
    color: 'bg-purple-100',
    description: 'The tendency to do something because many other people are doing it.'
  },
  'availability_heuristic': {
    color: 'bg-blue-100',
    description: 'Tendency to overestimate the likelihood of events with greater "availability" in memory.'
  },
  'false_dichotomy': {
    color: 'bg-red-100',
    description: 'Presenting only two options while ignoring alternative possibilities.'
  }
};

interface BiasAnalysisResult {
  bias_intensity: number;
  biased_words_count: number;
  bias_types: number;
  sentences: {
    text: string;
    bias_type: string;
    severity: number;
    neutral_version: string;
    reason: string;
  }[];
}

const BiasResultsPage: React.FC = () => {
  const [neutralizedSentences, setNeutralizedSentences] = useState<Set<number>>(new Set());
  const [currentSentences, setCurrentSentences] = useState<string[]>([]);

  // Hardcoded example result matching the provided JSON structure
  const analysisResult: BiasAnalysisResult = {
    bias_intensity: 0.65,
    biased_words_count: 24,
    bias_types: 3,
    sentences: [
      {
        text: "Everyone knows that eating junk food every day will make you fat.",
        bias_type: "bandwagon_effect",
        severity: 0.7,
        neutral_version: "Eating junk food every day can lead to weight gain.",
        reason: "This statement appeals to the idea that something is true simply because it is a commonly held belief. It lacks individual analysis of scientific evidence."
      },
      {
        text: "Just look at all those celebrities who have gained weight after they retired.",
        bias_type: "availability_heuristic",
        severity: 0.6,
        neutral_version: "Some celebrities have gained weight after they retired.",
        reason: "This statement appeals to the idea that something is true simply because it is a commonly held belief. It lacks individual analysis of scientific evidence."
      },
      {
        text: "If you care about your health, you'll avoid junk food entirely.",
        bias_type: "false_dichotomy",
        severity: 0.5,
        neutral_version: "If you care about your health, you may want to limit your consumption of junk food.",
        reason: "This sentence presents only two options—either care about your health or eat junk food—while ignoring other possibilities, such as moderation."
      },
      {
        text: "Fruits and vegetables are proven to be beneficial for you.",
        bias_type: "none",
        severity: 0,
        neutral_version: "",
        reason: ""
      },
    ]
  };

  // Initialize current sentences on first render
  React.useEffect(() => {
    setCurrentSentences(analysisResult.sentences.map(s => s.text));
  }, []);

  const dashedTextToCapitalized = (text: string) => text.split("_").map(w => w.slice(0,1).toUpperCase()+w.slice(1)).join(" ");

  // Function to highlight sentences with hover card
  const highlightText = () => {
    return analysisResult.sentences.map((sentence, index) => {
      // Check if this sentence has been neutralized
      if (neutralizedSentences.has(index)) {
        return <span key={index} className="mr-1">{sentence.neutral_version || sentence.text.trim()}</span>;
      }

      // Skip sentences with no bias
      if (sentence.bias_type === 'none') {
        return <span key={index} className="mr-1">{sentence.text.trim()}</span>;
      }

      const biasDetail = BIAS_DETAILS[sentence.bias_type] || 
        { color: 'bg-gray-100', description: 'Unknown Bias' };
      
      return (
        <HoverCard key={index}>
          <HoverCardTrigger>
            <span 
              className={`${biasDetail.color} rounded-md px-1 mr-1 cursor-help`}
              style={{ opacity: sentence.severity + 0.3 }}
            >
              {sentence.text.trim()}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div>
              <h3 className="font-bold text-lg mb-2">{dashedTextToCapitalized(sentence.bias_type)}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {biasDetail.description}
              </p>
              <p className="text-sm mb-2">{sentence.reason}</p>
              <div className="flex justify-between items-center">
                <span>Severity:</span>
                <span className="font-bold">
                  {(sentence.severity * 100).toFixed(0)}%
                </span>
              </div>
              {sentence.neutral_version && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={() => {
                    setNeutralizedSentences(prev => new Set(prev).add(index));
                  }}
                >
                  Neutralize
                </Button>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Bias Analysis Results</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-lg leading-relaxed">
          {highlightText()}
        </div>
      </div>
      <br />
      {analysisResult && (
        <BiasAnalysisSection analysisResult={analysisResult} />
      )}
    </div>
  );
};

export default BiasResultsPage;