import React, { useState,Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info, Brain, Target, ChevronDown, ChevronRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Assistant from '../components/Assistant'
import CanvasLoader from '@/components/CanvasLoader';
import CognitiveAssistant from '@/components/CognitiveAssistant';

interface CognitiveBias {
  type: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  details: string[];
}

const cognitiveBlasses: CognitiveBias[] = [
  {
    type: "Confirmation Bias",
    description: "Tendency to search for, interpret, and recall information that confirms existing beliefs.",
    impact: "High",
    details: [
      "Leads to poor decision-making",
      "Reinforces pre-existing opinions",
      "Limits critical thinking"
    ]
  },
  {
    type: "Anchoring Bias",
    description: "Relying too heavily on the first piece of information encountered when making decisions.",
    impact: "Medium",
    details: [
      "Influences initial judgments",
      "Can skew negotiation strategies",
      "Affects financial and personal choices"
    ]
  },
  {
    type: "Dunning-Kruger Effect",
    description: "Individuals with limited knowledge overestimate their own abilities.",
    impact: "High",
    details: [
      "Creates false confidence",
      "Prevents genuine skill improvement",
      "Leads to poor self-assessment"
    ]
  },
  {
    type: "Availability Heuristic",
    description: "Overestimating the likelihood of events based on their memorability.",
    impact: "Medium",
    details: [
      "Influenced by recent or dramatic experiences",
      "Can distort risk perception",
      "Affects decision-making processes"
    ]
  }
];

const BiasLearning: React.FC = () => {
  const [selectedBias, setSelectedBias] = useState<CognitiveBias | null>(null);
  const [openBiasIndex, setOpenBiasIndex] = useState<number | null>(null);
  const [animationName, setAnimationName] = useState<string>('salute');

  const getBadgeColor = (impact: CognitiveBias['impact']): string => {
    switch(impact) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      default: return 'bg-green-500 text-white';
    }
  };

  const toggleBias = (index: number): void => {
    setOpenBiasIndex(openBiasIndex === index ? null : index);
    setSelectedBias(cognitiveBlasses[index]);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          <Brain className="mr-4 text-blue-600" size={48} />
          Cognitive Bias Encyclopedia
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 text-blue-500" />
                Bias List
              </CardTitle>
              <CardDescription>
                Explore and understand cognitive biases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div>
                  {cognitiveBlasses.map((bias, index) => (
                    <div key={index} className="mb-2">
                      <div 
                        onClick={() => toggleBias(index)}
                        className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        <div className="flex items-center">
                          {openBiasIndex === index ? (
                            <ChevronDown className="mr-2 text-gray-500" size={20} />
                          ) : (
                            <ChevronRight className="mr-2 text-gray-500" size={20} />
                          )}
                          <span>{bias.type}</span>
                        </div>
                        <Badge className={getBadgeColor(bias.impact)}>
                          {bias.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 text-green-500" />
                Bias Details
              </CardTitle>
              <CardDescription>
                {selectedBias 
                  ? "Detailed insights into the selected cognitive bias" 
                  : "Select a bias to explore its details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedBias ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">{selectedBias.type}</h2>
                  <p className="text-gray-600">{selectedBias.description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Key Characteristics:</h3>
                    <ul className="list-disc pl-5">
                      {selectedBias.details.map((detail, idx) => (
                        <li key={idx} className="mb-1">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Badge className={getBadgeColor(selectedBias.impact)}>
                    {selectedBias.impact} Cognitive Impact
                  </Badge>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No bias selected. Choose from the list.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-[400px] h-[600px] fixed top-[100px] right-0">
        <Canvas className='w-full h-full'>
          <ambientLight intensity={6} />
          <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={6} />
          <directionalLight position={[-3, -3, 10]} intensity={3} />
          <OrbitControls enableZoom={false} enableRotate={false} maxPolarAngle={Math.PI / 2} />
          <Suspense fallback={<CanvasLoader />}>
              <Assistant  position={[0, -3, 0]} scale={3} rotation={[0.3, -0.2, 0]}
               animationName={animationName} 
              />
          </Suspense>
        </Canvas>
        <div className="fixed bottom-2 right-2 z-10">
          <CognitiveAssistant 
            onAnimationChange={(newAnimation) => setAnimationName(newAnimation)}
            selectedBias={selectedBias}
          />
        </div>
      </div>
    </div>
  );
};

export default BiasLearning;