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
import { Button } from '@/components/ui/button';

// Cognitive Bias Icons Mapping
const BIAS_ICONS = {
  'Confirmation Bias': Lightbulb,
  'Anchoring Bias': Target,
  'Availability Heuristic': Brain,
  'Default': RefreshCw
};

const generateRandomAnalysisData = () => {
  const biasTypes = [
    { name: 'Confirmation Bias', severity: Math.random() },
    { name: 'Anchoring Bias', severity: Math.random() },
    { name: 'Availability Heuristic', severity: Math.random() },
    { name: 'Survivorship Bias', severity: Math.random() },
    { name: 'Dunning-Kruger Effect', severity: Math.random() }
  ];

  return {
    overallBiasScore: Math.random(),
    biasTypes,
    biasedSentenceCount: Math.floor(Math.random() * 20),
    biasedWordCount: Math.floor(Math.random() * 50)
  };
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

const BiasAnalysisSection: React.FC = () => {
  const [analysisResult, setAnalysisResult] = React.useState(generateRandomAnalysisData());

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cognitive Bias Breakdown</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setAnalysisResult(generateRandomAnalysisData())}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bias Meter */}
        <BiasSeverityMeter score={analysisResult.overallBiasScore} />

        {/* Bias Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <Flag className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Biased Words</div>
              <div className="font-bold">{analysisResult.biasedWordCount}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <FileText className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Biased Sentences</div>
              <div className="font-bold">{analysisResult.biasedSentenceCount}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
            <ListChecks className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Bias Types</div>
              <div className="font-bold">{analysisResult.biasTypes.length}</div>
            </div>
          </div>
        </div>

        {/* Cognitive Biases List */}
        <div>
          <div className="font-semibold mb-2">Detected Cognitive Biases:</div>
          <ul className="space-y-2">
            {analysisResult.biasTypes.map((bias, index) => {
              const BiasIcon = BIAS_ICONS[bias.name as keyof typeof BIAS_ICONS] || BIAS_ICONS['Default'];
              return (
                <li 
                  key={index} 
                  className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg"
                >
                  <BiasIcon className="h-5 w-5 text-indigo-500" />
                  <div className="flex-grow">
                    <div className="font-medium">{bias.name}</div>
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