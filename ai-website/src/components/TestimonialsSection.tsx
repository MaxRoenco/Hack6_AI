import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Research Psychologist",
    text: "This tool has revolutionized how we detect cognitive biases in academic research. Incredibly insightful!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    text: "A game-changer for understanding text bias. The detailed analysis helps me refine my analytical approach.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Content Strategist",
    text: "Helps me create more objective content by highlighting potential cognitive blind spots.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <Quote className="text-gray-300" size={32} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-center">
                  {renderStars(testimonial.rating)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Want to share your experience? 
            <a 
              href="/feedback" 
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              Submit a Testimonial
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;