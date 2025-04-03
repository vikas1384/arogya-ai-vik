import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-health-600">
                  <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-xl health-gradient-text">Arogya AI</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Transforming healthcare with AI-powered solutions. We're committed to making healthcare more accessible and efficient for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-health-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-health-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-health-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-health-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/symptom-analyzer" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Symptom Analysis</Link>
              </li>
              <li>
                <Link to="/doctor-consultation" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Doctor Consultation</Link>
              </li>
              <li>
                <Link to="/health-insights" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Health Insights</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Health Records</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Medication Reminders</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Press</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">Partners</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-health-600 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">+91 9833450699</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-health-600 mr-2 flex-shrink-0" />
                <a href="mailto:contact.arogyaai.com" className="text-gray-600 dark:text-gray-300 hover:text-health-600 transition-colors">contact.arogyaai.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {currentYear} Arogya AI. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-health-600 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        {/* Made with love */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> in India for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
