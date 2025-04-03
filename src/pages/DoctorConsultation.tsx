import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, MapPin, Calendar, Filter, ChevronDown, Bookmark, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.9,
    reviews: 124,
    experience: "12 years",
    availability: "Today",
    location: "New York Medical Center",
    distance: "2.5 miles",
    bio: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management.",
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 98,
    experience: "15 years",
    availability: "Tomorrow",
    location: "City Neurology Clinic",
    distance: "3.2 miles",
    bio: "Dr. Chen is a leading neurologist with expertise in headache disorders, stroke management, and neuro-rehabilitation.",
    education: "Johns Hopkins University",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Amanda Patel",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4.7,
    reviews: 156,
    experience: "8 years",
    availability: "Today",
    location: "Clear Skin Dermatology",
    distance: "1.8 miles",
    bio: "Dr. Patel specializes in medical and cosmetic dermatology, treating various skin conditions with the latest techniques.",
    education: "Stanford Medical School",
    languages: ["English", "Hindi"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "General Practitioner",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4.9,
    reviews: 203,
    experience: "20 years",
    availability: "Today",
    location: "Family Health Clinic",
    distance: "0.7 miles",
    bio: "Dr. Wilson is an experienced family physician providing comprehensive primary care for patients of all ages.",
    education: "University of California",
    languages: ["English"],
  },
  {
    id: 5,
    name: "Dr. Lisa Rodriguez",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 4.8,
    reviews: 187,
    experience: "10 years",
    availability: "Tomorrow",
    location: "Children's Wellness Center",
    distance: "3.5 miles",
    bio: "Dr. Rodriguez is a compassionate pediatrician dedicated to child health, development, and preventive care.",
    education: "Yale School of Medicine",
    languages: ["English", "Spanish"],
  },
  {
    id: 6,
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4.9,
    reviews: 215,
    experience: "18 years",
    availability: "Today",
    location: "Apollo Hospitals, Delhi",
    distance: "3.1 miles",
    bio: "Dr. Sharma is a renowned cardiologist with expertise in interventional cardiology and heart failure management.",
    education: "All India Institute of Medical Sciences (AIIMS)",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: 7,
    name: "Dr. Priya Patel",
    specialty: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.8,
    reviews: 178,
    experience: "14 years",
    availability: "Tomorrow",
    location: "Fortis Healthcare, Mumbai",
    distance: "2.3 miles",
    bio: "Dr. Patel specializes in obstetrics, gynecology, and women's health with a focus on minimally invasive surgical techniques.",
    education: "Christian Medical College, Vellore",
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: 8,
    name: "Dr. Vikram Mehta",
    specialty: "Orthopedic Surgeon",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    rating: 4.7,
    reviews: 163,
    experience: "16 years",
    availability: "Today",
    location: "Max Healthcare, Bangalore",
    distance: "1.5 miles",
    bio: "Dr. Mehta is an experienced orthopedic surgeon specializing in joint replacements, sports injuries, and trauma care.",
    education: "King Edward Memorial Hospital, Mumbai",
    languages: ["English", "Hindi", "Marathi"],
  },
  {
    id: 9,
    name: "Dr. Sunita Reddy",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    rating: 4.9,
    reviews: 192,
    experience: "15 years",
    availability: "Tomorrow",
    location: "Manipal Hospitals, Hyderabad",
    distance: "3.7 miles",
    bio: "Dr. Reddy is a specialist in neurology with expertise in movement disorders, epilepsy, and neuro-rehabilitation.",
    education: "Osmania Medical College, Hyderabad",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
  },
  {
    id: 10,
    name: "Dr. Arjun Singh",
    specialty: "Gastroenterologist",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4.8,
    reviews: 145,
    experience: "12 years",
    availability: "Today",
    location: "Medanta - The Medicity, Gurgaon",
    distance: "4.2 miles",
    bio: "Dr. Singh specializes in gastroenterology and hepatology, with a focus on digestive disorders and liver diseases.",
    education: "Armed Forces Medical College, Pune",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: 11,
    name: "Dr. Meera Iyer",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    rating: 4.7,
    reviews: 168,
    experience: "9 years",
    availability: "Tomorrow",
    location: "Columbia Asia Hospital, Chennai",
    distance: "2.8 miles",
    bio: "Dr. Iyer is a dermatologist specializing in cosmetic dermatology, skin cancer detection, and treatment of chronic skin conditions.",
    education: "Madras Medical College, Chennai",
    languages: ["English", "Hindi", "Tamil", "Malayalam"],
  },
  {
    id: 12,
    name: "Dr. Anil Kumar",
    specialty: "Pulmonologist",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 4.9,
    reviews: 183,
    experience: "17 years",
    availability: "Today",
    location: "Kokilaben Dhirubhai Ambani Hospital, Mumbai",
    distance: "1.9 miles",
    bio: "Dr. Kumar specializes in respiratory medicine with expertise in treating asthma, COPD, sleep disorders, and interstitial lung diseases.",
    education: "Seth G.S. Medical College, Mumbai",
    languages: ["English", "Hindi", "Marathi"],
  },
  {
    id: 13,
    name: "Dr. Kavita Verma",
    specialty: "Endocrinologist",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 4.8,
    reviews: 157,
    experience: "13 years",
    availability: "Tomorrow",
    location: "Indraprastha Apollo Hospitals, Delhi",
    distance: "3.4 miles",
    bio: "Dr. Verma specializes in diabetes management, thyroid disorders, and hormone-related conditions.",
    education: "Maulana Azad Medical College, Delhi",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: 14,
    name: "Dr. Ravi Menon",
    specialty: "Ophthalmologist",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    rating: 4.7,
    reviews: 139,
    experience: "11 years",
    availability: "Today",
    location: "Sankara Nethralaya, Chennai",
    distance: "2.6 miles",
    bio: "Dr. Menon specializes in surgical and medical treatment of eye disorders, including cataract surgery, LASIK, and retinal diseases.",
    education: "Regional Institute of Ophthalmology, Kolkata",
    languages: ["English", "Hindi", "Tamil", "Malayalam"],
  },
  {
    id: 15,
    name: "Dr. Neha Gupta",
    specialty: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    rating: 4.9,
    reviews: 172,
    experience: "10 years",
    availability: "Tomorrow",
    location: "NIMHANS, Bangalore",
    distance: "3.0 miles",
    bio: "Dr. Gupta is a psychiatrist specializing in mood disorders, anxiety, PTSD, and offers both medication management and psychotherapy.",
    education: "National Institute of Mental Health and Neurosciences, Bangalore",
    languages: ["English", "Hindi", "Kannada"],
  },
];

const DoctorConsultation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { toast } = useToast();

  const handleBookAppointment = (doctorId: number) => {
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been booked successfully! We'll send you a confirmation email with all the details.`,
    });
  };

  const filteredDoctors = doctors.filter(doctor => {
    const nameMatch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const specialtyMatch = doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const specialtyFilterMatch = specialty ? doctor.specialty === specialty : true;
    const availabilityMatch = availability ? doctor.availability === availability : true;
    
    return (nameMatch || specialtyMatch) && specialtyFilterMatch && availabilityMatch;
  });

  const specialties = ["Cardiologist", "Neurologist", "Dermatologist", "General Practitioner", "Pediatrician"];
  const availabilityOptions = ["Today", "Tomorrow"];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Find a Doctor</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with specialist doctors for virtual or in-person consultations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or specialty..."
              className="input-field pl-12 w-full"
            />
          </div>
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="button-secondary flex items-center justify-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isFiltersOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
              <select 
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Specialties</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
              <select 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Any Time</option>
                {availabilityOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>

      {selectedDoctor ? (
        <DoctorDetail 
          doctor={selectedDoctor} 
          onBack={() => setSelectedDoctor(null)}
          onBook={() => handleBookAppointment(selectedDoctor.id)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onClick={() => setSelectedDoctor(doctor)} 
            />
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">No doctors found. Try adjusting your search.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const DoctorCard = ({ doctor, onClick }: { doctor: any; onClick: () => void }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-2xl p-6 cursor-pointer hover-lift"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
          <p className="text-sm text-health-600 dark:text-health-400">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{doctor.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({doctor.reviews} reviews)</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{doctor.experience} experience</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-health-600 dark:text-health-400 font-medium">
            Available {doctor.availability.toLowerCase()}
          </span>
        </div>
      </div>
      
      <button 
        className="w-full py-2.5 rounded-xl bg-health-50 text-health-700 dark:bg-health-900/30 dark:text-health-400 font-medium text-sm hover:bg-health-100 dark:hover:bg-health-900/50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        View Profile
      </button>
    </motion.div>
  );
};

const DoctorDetail = ({ doctor, onBack, onBook }: { doctor: any; onBack: () => void; onBook: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const availableDates = [
    { date: today, label: "Today" },
    { date: tomorrow, label: "Tomorrow" },
    { date: dayAfter, label: dayAfter.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) },
  ];

  const availableTimes = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="relative h-40 bg-gradient-to-r from-health-600 to-health-800 flex items-end">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <button 
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <Bookmark className="h-4 w-4" />
        </button>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-16 px-6 pb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h2>
          <p className="text-health-600 dark:text-health-400">{doctor.specialty}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">{doctor.rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({doctor.reviews} reviews)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">About Doctor</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{doctor.bio}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Education</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.education}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Experience</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.experience}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language: string) => (
                    <span 
                      key={language}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Book Appointment</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Select Date</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      selectedDate === formatDate(date.date)
                        ? 'bg-health-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedDate(formatDate(date.date))}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Select Time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time, index) => (
                    <button
                      key={index}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-health-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={onBook}
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                selectedDate && selectedTime
                  ? 'button-primary'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorConsultation;
