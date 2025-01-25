import React from 'react';
import { Search, Globe, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InputSectionProps {
  input: string;
  inputType: 'url' | 'text';
  isLoading: boolean;
  setInput: (value: string) => void;
  setInputType: (type: 'url' | 'text') => void;
  handleAnalyze: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  input,
  inputType,
  isLoading,
  setInput,
  setInputType,
  handleAnalyze
}) => (
  <Card className="w-full shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center justify-center space-x-2">
        <Search className="w-6 h-6" />
        <span>Analyze News for Cognitive Biases</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs 
        defaultValue="url" 
        onValueChange={(val) => setInputType(val as 'url' | 'text')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">
            <Globe className="mr-2 h-4 w-4" /> URL Analysis
          </TabsTrigger>
          <TabsTrigger value="text">
            <BookOpen className="mr-2 h-4 w-4" /> Manual Text
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          {inputType === 'url' ? (
            <Input 
              placeholder="Enter news article URL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full"
            />
          ) : (
            <Textarea 
              placeholder="Paste news article text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full min-h-[200px]"
            />
          )}
          <Button 
            onClick={handleAnalyze} 
            disabled={!input || isLoading}
            className="w-full"
          >
            {isLoading ? 'Analyzing...' : 'Detect Cognitive Biases'}
          </Button>
        </div>
      </Tabs>
    </CardContent>
  </Card>
);