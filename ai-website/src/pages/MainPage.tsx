import React, { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { InputSection } from '@/components/InputSection';
import TextMetrics from '@/components/TextMetrics';
import { useNavigate } from 'react-router-dom';

// Mock bias detection service (replace with actual API)
const detectBiases = async (input: string, isUrl: boolean) => {
  return {
    overallBiasScore: 0.65,
    biasTypes: [
      { name: 'Confirmation Bias', severity: 0.8 },
      { name: 'Anchoring Bias', severity: 0.4 },
      { name: 'Availability Heuristic', severity: 0.6 }
    ]
  };
};

const MainPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [isLoading, setIsLoading] = useState(false);

  // Text analysis metrics
  const textMetrics = useMemo(() => {
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
    const charCount = input.length;
    const readingTime = Math.ceil(wordCount / 200);
    const complexity = wordCount > 500 ? 'Complex' :
      wordCount > 200 ? 'Moderate' : 'Simple';

    return { wordCount, charCount, readingTime, complexity };
  }, [input]);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!input) return;

    setIsLoading(true);
    try {
      const result = await detectBiases(input, inputType === 'url');
      // Navigate to results page with text and analysis data
      navigate('/results', {
        state: {
          text: input,
          analysisResult: result
        }
      });
    } catch (error) {
      console.error('Analysis failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Cognitive Bias Analyzer
        </h1>

        <InputSection
          input={input}
          inputType={inputType}
          isLoading={isLoading}
          setInput={setInput}
          setInputType={setInputType}
          handleAnalyze={handleAnalyze}
        />

        {input && (
          <div className="mt-4">
            <TextMetrics metrics={textMetrics} />
          </div>
        )}

        <div className="mt-8 text-center text-gray-600">
          <p className="flex items-center justify-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Powered by Advanced Cognitive Bias Detection
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;