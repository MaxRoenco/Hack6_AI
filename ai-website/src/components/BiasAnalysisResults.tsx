import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiasAnalysisResultsProps {
  analysisResult: {
    overallBiasScore: number;
    biasTypes: Array<{
      name: string;
      severity: number;
    }>;
  };
}

const getBiasColor = (severity: number) => {
  if (severity < 0.3) return 'bg-green-100 text-green-800';
  if (severity < 0.7) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export const BiasAnalysisResults: React.FC<BiasAnalysisResultsProps> = ({ analysisResult }) => (
  <>
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
        Bias Analysis Results
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Overall Bias Score:</span>
          <span 
            className={`px-3 py-1 rounded-full ${
              getBiasColor(analysisResult.overallBiasScore)
            }`}
          >
            {(analysisResult.overallBiasScore * 100).toFixed(1)}%
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Detected Biases:</h3>
          {analysisResult.biasTypes.map((bias) => (
            <div 
              key={bias.name} 
              className="flex justify-between items-center mb-2 p-2 rounded-lg"
            >
              <span>{bias.name}</span>
              <span 
                className={`px-3 py-1 rounded-full text-sm ${
                  getBiasColor(bias.severity)
                }`}
              >
                {(bias.severity * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
  </>
);