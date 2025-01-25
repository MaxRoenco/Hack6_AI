import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  // AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

import {
  // goBack,
  goTo,
  // popToTop,
  // Link,
  Router
} from 'react-chrome-extension-router';


const details = [
  {
    type: "Confirmation Bias",
    description: "The tendency to search for, interpret, and remember information in a way that confirms one's preexisting beliefs or hypotheses."
  },
  {
    type: "Anchoring Bias",
    description: "The tendency to rely too heavily on the first piece of information encountered (the 'anchor') when making decisions."
  },
  {
    type: "Availability Heuristic",
    description: "A mental shortcut that relies on immediate examples that come to mind when evaluating a specific topic, concept, or decision."
  },
  {
    type: "Overconfidence Effect",
    description: "A bias in which a person's subjective confidence in their judgments is greater than their objective accuracy."
  },
  {
    type: "Hindsight Bias",
    description: "The inclination to see events as being more predictable after they have occurred."
  },
  {
    type: "Sunk Cost Fallacy",
    description: "The tendency to continue investing in a project or decision based on the amount already invested, even if the current costs outweigh the benefits."
  },
  {
    type: "Self-Serving Bias",
    description: "The tendency to attribute positive outcomes to oneself and negative outcomes to external factors."
  },
  {
    type: "Halo Effect",
    description: "The tendency to let an overall impression of a person, company, or product influence more specific evaluations of their traits or attributes."
  },
  {
    type: "Bandwagon Effect",
    description: "The tendency to do or believe something because many other people do or believe the same."
  },
  {
    type: "Framing Effect",
    description: "The tendency to react differently to the same information depending on how it is presented (e.g., as a gain or a loss)."
  }
];
const biasScore = 75;

const BiasAnalysis = () => {

  const getBiasColor = () => {
    if (biasScore > 70) return "bg-red-500 text-white";
    if (biasScore > 40) return "bg-yellow-500 text-black";
    return "bg-green-500 text-white";
  };

  return (
    <Card className="w-[380px] mx-auto mt-10 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Cognitive Bias Analyzer
        </CardTitle>
        <CardDescription>
          Detect potential biases in your content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className={`text-center text-6xl font-extrabold py-4 rounded-lg ${getBiasColor()}`}
        >
          {biasScore}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full" variant="default">
                Analyze Page
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to detect cognitive biases</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={() => goTo(BiasDetails)}
        >
          View Bias Details
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Badge variant="outline">Bias Risk Level: Moderate</Badge>
      </CardFooter>
    </Card>
  );
};

const BiasDetails = () => {
  return (
    <Card className="w-[500px] mx-auto mt-10 max-h-[600px]">
      <CardHeader>
        <CardTitle>Cognitive Bias Encyclopedia</CardTitle>
        <CardDescription>
          Comprehensive breakdown of cognitive biases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          {details.map((bias, index) => (
            <AlertDialog key={index}>
              <AlertDialogTrigger asChild>
                <div 
                  className="mb-4 p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <h3 className="font-semibold text-lg">{bias.type}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bias.description}
                  </p>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{bias.type}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {bias.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

function App() {
  return (
    <Router>
      <BiasAnalysis />
    </Router>
  );
}

export default App;