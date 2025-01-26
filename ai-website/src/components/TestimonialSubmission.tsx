import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Star, Send } from 'lucide-react';

const testimonialSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  profession: z.string().min(2, { message: "Profession is required" }),
  rating: z.enum(['1', '2', '3', '4', '5']),
  testimonial: z.string().min(20, { message: "Testimonial must be at least 20 characters" })
});

const TestimonialSubmission = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      profession: '',
      rating: '5',
      testimonial: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    // TODO: Implement actual submission logic
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-lg mx-auto mt-10 bg-gray-100">
        <CardContent className="flex flex-col items-center p-8">
          <Star className="text-yellow-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Thank You for Your Testimonial!
          </h2>
          <p className="text-gray-600 text-center">
            Your feedback helps others understand the value of our Cognitive Bias Analyzer.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            className="mt-6"
          >
            Submit Another Testimonial
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Share Your Experience
          </CardTitle>
          <CardDescription>
            Help others understand how Cognitive Bias Analyzer has impacted your work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Professional Role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overall Rating</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['1', '2', '3', '4', '5'].map(rating => (
                          <SelectItem key={rating} value={rating}>
                            {rating} Star{rating !== '1' && 's'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testimonial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Testimonial</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your detailed experience with Cognitive Bias Analyzer..." 
                        className="min-h-[120px] resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Send className="mr-2" size={18} /> Submit Testimonial
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialSubmission;