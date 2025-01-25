import React from 'react';
import { useLocation } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Bias color and description mapping
const BIAS_DETAILS = {
  'Confirmation Bias': {
    color: 'bg-red-100',
    description: 'The tendency to search for, interpret, favor, and recall information in a way that confirms or supports one\'s prior beliefs or values.'
  },
  'Anchoring Bias': {
    color: 'bg-yellow-100',
    description: 'The tendency to rely too heavily on the first piece of information encountered when making decisions.'
  },
  'Availability Heuristic': {
    color: 'bg-blue-100', 
    description: 'The tendency to overestimate the likelihood of events with greater "availability" in memory, which is often influenced by how unusual or emotionally charged they are.'
  }
};

const BiasResultsPage: React.FC = () => {
  const location = useLocation();
  const { text, analysisResult } = location.state || {};

  // Function to highlight sentences with hover card
  const highlightText = () => {
    if (!text) return <p>No text submitted</p>;

    // Split text into sentences 
    const sentences = text.split(/[.!?]+/).filter((sentence: string) => sentence.trim());

    return sentences.map((sentence: string, index: number) => {
      // Randomly decide whether to highlight this sentence
      const shouldHighlight = Math.random() > 0.5;
      
      if (shouldHighlight && analysisResult?.biasTypes) {
        // Pick a random bias type for highlighting
        const randomBias = analysisResult.biasTypes[
          Math.floor(Math.random() * analysisResult.biasTypes.length)
        ];
        
        const biasDetail = BIAS_DETAILS[randomBias.name as keyof typeof BIAS_DETAILS] || 
          { color: 'bg-gray-100', description: 'Unknown Bias' };
        
        return (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <span 
                className={`${biasDetail.color} rounded-md px-1 mr-1 cursor-help`}
              >
                {sentence.trim()}
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle>{randomBias.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {biasDetail.description}
                  </p>
                  <div className="flex justify-between">
                    <span>Severity:</span>
                    <span className="font-bold">
                      {(randomBias.severity * 100).toFixed(0)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        );
      }
      
      return <span key={index} className="mr-1">{sentence.trim()}</span>;
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

      {analysisResult && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Analysis Summary</h2>
          <p>Overall Bias Score: {analysisResult.overallBiasScore.toFixed(2)}</p>
          <div className="mt-4">
            <h3 className="font-bold">Detected Bias Types:</h3>
            <ul className="list-disc pl-5">
              {analysisResult.biasTypes.map((bias: any, index: number) => (
                <li key={index}>
                  {bias.name} - Severity: {(bias.severity * 100).toFixed(0)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasResultsPage;