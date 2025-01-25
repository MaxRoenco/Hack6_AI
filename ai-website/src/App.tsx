import React, { useState } from 'react';
import { ChartPie, AlertTriangle, Link, Globe } from 'lucide-react';

// Color palette
const COLORS = {
  darkBlue: '#2E5266',
  mediumBlue: '#6E8898',
  lightBlue: '#9FB1CF',
  neutral: '#D3D0CB'
};

// Define types for analysis results
interface Bias {
  name: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface AnalysisResults {
  confirmedBiases: Bias[];
  overallBiasScore: number;
}

const CognitiveBiasAnalyzer: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [globalBiasIndex] = useState<number>(65);

  const performBiasAnalysis = async () => {
    try {
      const mockResults: AnalysisResults = {
        confirmedBiases: [
          { name: 'Confirmation Bias', severity: 'High' },
          { name: 'Negativity Bias', severity: 'Medium' }
        ],
        overallBiasScore: 0.72
      };
      setAnalysisResults(mockResults);
    } catch (error) {
      console.error('Bias analysis failed', error);
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.backgroundColor = COLORS.mediumBlue;
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.backgroundColor = COLORS.darkBlue;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundColor: COLORS.neutral }}>
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-xl p-8" style={{ backgroundColor: COLORS.lightBlue }}>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.darkBlue }}>
            Cognitive Bias Analyzer
          </h1>
          <p className="text-lg" style={{ color: COLORS.mediumBlue }}>
            Unveil hidden biases in news and media
          </p>
        </header>

        <div className="flex items-center mb-8">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter news article URL"
            className="flex-grow p-3 border-2 rounded-l-lg"
            style={{ 
              borderColor: COLORS.darkBlue,
              backgroundColor: COLORS.neutral
            }}
          />
          <button 
            onClick={performBiasAnalysis}
            className="p-3 rounded-r-lg text-white font-bold"
            style={{ 
              backgroundColor: COLORS.darkBlue,
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Link size={24} />
          </button>
        </div>

        {analysisResults && (
          <div className="grid grid-cols-2 gap-6">
            <div 
              className="p-6 rounded-lg shadow-md"
              style={{ backgroundColor: COLORS.neutral }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: COLORS.darkBlue }}>
                <AlertTriangle className="inline mr-2" /> Detected Biases
              </h2>
              {analysisResults.confirmedBiases.map((bias, index) => (
                <div 
                  key={index} 
                  className="mb-3 p-3 rounded-md"
                  style={{ 
                    backgroundColor: bias.severity === 'High' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                    color: COLORS.darkBlue 
                  }}
                >
                  {bias.name} - {bias.severity}
                </div>
              ))}
            </div>

            <div 
              className="p-6 rounded-lg shadow-md flex flex-col items-center justify-center"
              style={{ backgroundColor: COLORS.neutral }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: COLORS.darkBlue }}>
                <ChartPie className="inline mr-2" /> Global Bias Index
              </h2>
              <div 
                className="w-48 h-48 rounded-full flex items-center justify-center text-4xl font-bold"
                style={{ 
                  backgroundColor: globalBiasIndex > 70 ? 'rgba(255, 0, 0, 0.1)' : 
                                   globalBiasIndex > 40 ? 'rgba(255, 165, 0, 0.1)' : 
                                   'rgba(0, 255, 0, 0.1)',
                  color: COLORS.darkBlue
                }}
              >
                {globalBiasIndex}
              </div>
              <p className="mt-4 text-center" style={{ color: COLORS.mediumBlue }}>
                Represents the current global cognitive bias trend
              </p>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center">
          <p style={{ color: COLORS.mediumBlue }}>
            <Globe className="inline mr-2" />
            Powered by Advanced Cognitive Analysis
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CognitiveBiasAnalyzer;