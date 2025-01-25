import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TextMetricsProps {
  metrics: {
    wordCount: number;
    charCount: number;
    readingTime: number;
    complexity: string;
  };
}

export const TextMetrics: React.FC<TextMetricsProps> = ({ metrics }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <FileText className="mr-2 h-5 w-5" />
        Text Metrics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Words:</span>
          <Badge variant="secondary">{metrics.wordCount}</Badge>
        </div>
        <div className="flex justify-between">
          <span>Characters:</span>
          <Badge variant="secondary">{metrics.charCount}</Badge>
        </div>
        <div className="flex justify-between">
          <span>Reading Time:</span>
          <Badge variant="secondary">{metrics.readingTime} min</Badge>
        </div>
        <div className="flex justify-between">
          <span>Complexity:</span>
          <Badge variant="outline">{metrics.complexity}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);