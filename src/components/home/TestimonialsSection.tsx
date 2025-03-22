
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    quote: "Arogya AI helped me identify my symptoms quickly and connected me with a specialist. The process was seamless and saved me hours of anxiety!",
    author: "Rahul Kumar",
    location: "New Delhi",
    rating: 5,
    initials: "RK"
  },
  {
    quote: "As a busy professional, I don't always have time to visit a doctor for minor concerns. Arogya AI gives me peace of mind with accurate health assessments.",
    author: "Priya Mehta",
    location: "Mumbai",
    rating: 5,
    initials: "PM"
  },
  {
    quote: "After struggling to find a specialist for my daughter's rare condition, Arogya AI connected us with the right doctor within hours. Truly a life-changing app.",
    author: "Sunita Patel",
    location: "Ahmedabad",
    rating: 5,
    initials: "SP"
  },
  {
    quote: "Being a diabetic patient, I use Arogya AI to monitor my symptoms daily. The health insights have helped me maintain better glucose levels consistently.",
    author: "Vikram Reddy",
    location: "Hyderabad",
    rating: 5,
    initials: "VR"
  },
  {
    quote: "The doctor consultation feature saved me during the pandemic. I could consult with top specialists from the comfort of my home. Highly recommended!",
    author: "Anjali Gupta",
    location: "Bengaluru",
    rating: 5,
    initials: "AG"
  },
  {
    quote: "I use Arogya AI for my entire family. The preventive health recommendations are practical and have helped us adopt healthier lifestyle choices.",
    author: "Manoj Desai",
    location: "Pune",
    rating: 4,
    initials: "MD"
  },
  {
    quote: "The Ayurvedic integration with modern medicine suggestions in Arogya AI is remarkable. It helped me find the perfect balance for my chronic condition.",
    author: "Kavita Bajaj",
    location: "Jaipur",
    rating: 5,
    initials: "KB"
  },
  {
    quote: "My elderly parents live in a remote village. Arogya AI has been a lifeline, connecting them to specialists and providing regular health monitoring without travel.",
    author: "Rajendra Gupta",
    location: "Lucknow",
    rating: 5,
    initials: "RG"
  },
  {
    quote: "As a medical student, I use Arogya AI to validate my diagnoses. Its accuracy and detailed explanations have become an essential part of my learning.",
    author: "Dr. Sanjay Sharma",
    location: "Chennai",
    rating: 5,
    initials: "DS"
  },
  {
    quote: "आरोग्य AI ने मेरे बच्चे के स्वास्थ्य को ट्रैक करने में मदद की। हिंदी में सुविधा होने से मुझे इसका उपयोग करना आसान लगता है।",
    author: "Seema Yadav",
    location: "Varanasi",
    rating: 5,
    initials: "SY"
  },
  {
    quote: "ஆரோக்கிய AI என் பாரம்பரிய மருத்துவத்துடன் நவீன மருத்துவத்தை இணைக்கிறது. இது என் நாள்பட்ட வலிக்கு உதவியது.",
    author: "Nandhini Krishnan",
    location: "Coimbatore",
    rating: 5,
    initials: "NK"
  },
  {
    quote: "मी ग्रामीण भागात आरोग्य सेवा देतो. आरोग्य AI मला दूरस्थ रुग्णांसाठी अचूक निदान करण्यात मदत करते.",
    author: "Dr. Aditya Patil",
    location: "Nagpur",
    rating: 5,
    initials: "AP"
  }
];

const TestimonialsSection = () => {
  // Split testimonials into rows of 3
  const rows = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    rows.push(testimonials.slice(i, i + 3));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full max-w-6xl px-4 mb-24"
    >
      <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">
        What Our Users Say
      </h2>
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${rowIndex > 0 ? 'mt-6' : ''}`}>
          {row.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              rating={testimonial.rating}
              initials={testimonial.initials}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default TestimonialsSection;
