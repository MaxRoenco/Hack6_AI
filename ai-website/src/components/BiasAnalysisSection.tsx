import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Gauge, 
  Flag, 
  FileText, 
  ListChecks,
  Brain,
  Lightbulb,
  Target,
  RefreshCw
} from 'lucide-react';

// Cognitive Bias Icons Mapping
const BIAS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'bandwagon_effect': Brain,
  'availability_heuristic': Lightbulb,
  'false_dichotomy': Target,
  'default': RefreshCw
};

const BiasSeverityMeter: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score < 0.3) return 'bg-green-500';
    if (score < 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <Gauge className="h-6 w-6" />
      <div className="w-full">
        <Progress 
          value={(score * 100)} 
          className={`h-2 ${getColor()}`} 
        />
        <div className="text-sm text-muted-foreground mt-1">
          Bias Intensity: {(score * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

interface BiasAnalysisResult {
  bias_intensity: number;
  biased_words_count: number;
  bias_types: number;
  sentences: {
    text: string;
    bias_type: string;
    severity: number;
    reason: string;
  }[];
}

const BiasAnalysisSection: React.FC<{ analysisResult: BiasAnalysisResult }> = ({ analysisResult }) => {
  // Extract unique bias types from sentences
  const uniqueBiasTypes = [...new Set(
    analysisResult.sentences
      .map(sentence => sentence.bias_type)
      .filter(bias => bias !== 'none')
  )];

  // Calculate bias type severities
  const biasTypeSeverities = uniqueBiasTypes.map(biasType => {
    const relevantSentences = analysisResult.sentences.filter(s => s.bias_type === biasType);
    const averageSeverity = relevantSentences.reduce((sum, sentence) => sum + sentence.severity, 0) / relevantSentences.length;
    return { biasType, severity: averageSeverity };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cognitive Bias Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bias Meter */}
        <BiasSeverityMeter score={analysisResult.bias_intensity} />

        {/* Bias Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <Flag className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Biased Words</div>
              <div className="font-bold">{analysisResult.biased_words_count}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <FileText className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Biased Sentences</div>
              <div className="font-bold">
                {analysisResult.sentences.filter(s => s.bias_type !== 'none').length}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <ListChecks className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Bias Types</div>
              <div className="font-bold">{uniqueBiasTypes.length}</div>
            </div>
          </div>
        </div>

        {/* Cognitive Biases List */}
        <div>
          <div className="font-semibold mb-2">Detected Cognitive Biases:</div>
          <ul className="space-y-2">
            {biasTypeSeverities.map((bias, index) => {
              const BiasIcon = BIAS_ICONS[bias.biasType] || BIAS_ICONS['default'];

              return (
                <li 
                  key={index} 
                  className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg"
                >
                  <BiasIcon className="h-5 w-5 text-indigo-500" />
                  <div className="flex-grow">
                    <div className="font-medium">{bias.biasType}</div>
                    <Progress 
                      value={(bias.severity * 100)} 
                      className="h-1 mt-1"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(bias.severity * 100).toFixed(0)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiasAnalysisSection;