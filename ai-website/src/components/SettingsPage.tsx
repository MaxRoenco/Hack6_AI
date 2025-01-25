import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Switch 
} from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Filter, 
  Layers, 
  BookOpen,
  Globe,
  AlertTriangle
} from 'lucide-react';

type ContextExemption = 'academic' | 'literary' | 'professional';
type LanguagePreference = 'ro' | 'en' | 'rus' | 'ar';
type ColorScheme = 'default' | 'deuteranopia' | 'protanopia' | 'tritanopia';

const SettingsPage = () => {
  const [wordAccuracyLevel, setWordAccuracyLevel] = useState('moderate');
  const [contextSensitivity, setContextSensitivity] = useState('balanced');
  const [contextualExemptions, setContextualExemptions] = useState<ContextExemption[]>([]);
  const [languagePreference, setLanguagePreference] = useState<LanguagePreference>('en');
  const [colorAccessibilityMode, setColorAccessibilityMode] = useState<ColorScheme>('default');
  const [multilingualSupport, setMultilingualSupport] = useState(false);
  const [advancedReporting, setAdvancedReporting] = useState(false);
  const [dataPrivacyMode, setDataPrivacyMode] = useState(false);

  const toggleContextExemption = (exemption: ContextExemption) => {
    setContextualExemptions(prev => 
      prev.includes(exemption)
        ? prev.filter(e => e !== exemption)
        : [...prev, exemption]
    );
  };

  const handleLanguageChange = (value: string) => {
    setLanguagePreference(value as LanguagePreference);
  };

  const handleColorSchemeChange = (value: string) => {
    setColorAccessibilityMode(value as ColorScheme);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Bias Detection Preferences</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Filter className="mr-3 h-6 w-6 text-blue-600" /> Bias Detection Precision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Detection Accuracy</Label>
            <Select 
              value={wordAccuracyLevel} 
              onValueChange={setWordAccuracyLevel}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select precision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict Filtering</SelectItem>
                <SelectItem value="moderate">Balanced Approach</SelectItem>
                <SelectItem value="lenient">Contextual Leniency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Layers className="mr-3 h-6 w-6 text-green-600" /> Context Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Analysis Depth</Label>
            <Select 
              value={contextSensitivity} 
              onValueChange={setContextSensitivity}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select context level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Surface Level</SelectItem>
                <SelectItem value="balanced">Comprehensive</SelectItem>
                <SelectItem value="deep">Deep Contextual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BookOpen className="mr-3 h-6 w-6 text-purple-600" /> Contextual Exemptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Academic Contexts', value: 'academic' },
            { label: 'Literary Contexts', value: 'literary' },
            { label: 'Professional Domains', value: 'professional' }
          ].map(({ label, value }) => (
            <div key={value} className="flex items-center justify-between">
              <Label className="text-gray-700">{label}</Label>
              <Switch 
                checked={contextualExemptions.includes(value as ContextExemption)}
                onCheckedChange={() => toggleContextExemption(value as ContextExemption)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Globe className="mr-3 h-6 w-6 text-teal-600" /> Language & Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Interface Language</Label>
            <Select 
              value={languagePreference} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Label className="text-gray-700">Color Accessibility</Label>
            <Select 
              value={colorAccessibilityMode} 
              onValueChange={handleColorSchemeChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select color mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Standard</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                <SelectItem value="protanopia">Protanopia</SelectItem>
                <SelectItem value="tritanopia">Tritanopia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <AlertTriangle className="mr-3 h-6 w-6 text-red-600" /> Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Multilingual Bias Detection</Label>
            <Switch 
              checked={multilingualSupport}
              onCheckedChange={setMultilingualSupport}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Label className="text-gray-700">Advanced Reporting</Label>
            <Switch 
              checked={advancedReporting}
              onCheckedChange={setAdvancedReporting}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Label className="text-gray-700">Enhanced Data Privacy</Label>
            <Switch 
              checked={dataPrivacyMode}
              onCheckedChange={setDataPrivacyMode}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;