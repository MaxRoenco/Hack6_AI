import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  BarChart2 
} from 'lucide-react';

interface TextMetricsProps {
  metrics: {
    wordCount: number;
    charCount: number;
    readingTime: number;
    complexity: string;
  };
}

const TextMetrics: React.FC<TextMetricsProps> = ({ metrics }) => {
  const metricItems = [
    {
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      label: 'Word Count',
      value: metrics.wordCount
    },
    {
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      label: 'Characters',
      value: metrics.charCount
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      label: 'Reading Time',
      value: `${metrics.readingTime} min`
    },
    {
      icon: <BarChart2 className="h-5 w-5 text-orange-500" />,
      label: 'Complexity',
      value: metrics.complexity
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          Text Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metricItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-3 bg-gray-50 rounded-lg"
            >
              {item.icon}
              <span className="text-sm text-gray-600 mt-2">{item.label}</span>
              <span className="font-bold text-lg">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextMetrics;