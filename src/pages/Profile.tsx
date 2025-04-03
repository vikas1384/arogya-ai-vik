
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Clipboard, FileText, Bell, Shield, LogOut, Check, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'records' | 'notifications' | 'privacy'>('profile');
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your personal information and account settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1"
        >
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-24 w-24 rounded-full bg-health-100 dark:bg-health-900/30 flex items-center justify-center mb-4 border-4 border-white dark:border-gray-800 shadow-sm">
                <User className="h-12 w-12 text-health-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">John Doe</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
            </div>
            
            <div className="space-y-1">
              <TabButton 
                active={activeTab === 'profile'} 
                icon={<User className="h-4 w-4" />} 
                label="Personal Info"
                onClick={() => setActiveTab('profile')}
              />
              <TabButton 
                active={activeTab === 'records'} 
                icon={<FileText className="h-4 w-4" />} 
                label="Medical Records"
                onClick={() => setActiveTab('records')}
              />
              <TabButton 
                active={activeTab === 'notifications'} 
                icon={<Bell className="h-4 w-4" />} 
                label="Notifications"
                onClick={() => setActiveTab('notifications')}
              />
              <TabButton 
                active={activeTab === 'privacy'} 
                icon={<Shield className="h-4 w-4" />} 
                label="Privacy & Security"
                onClick={() => setActiveTab('privacy')}
              />
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-3"
        >
          {activeTab === 'profile' && <ProfileTab onSave={handleSaveChanges} />}
          {activeTab === 'records' && <RecordsTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'privacy' && <PrivacyTab />}
        </motion.div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const TabButton = ({ active, icon, label, onClick }: TabButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active 
          ? 'bg-health-50 text-health-700 dark:bg-health-900/30 dark:text-health-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      <span>{label}</span>
      {active && <ChevronRight className="h-4 w-4 ml-auto" />}
    </button>
  );
};

const ProfileTab = ({ onSave }: { onSave: () => void }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="input-field pl-10 w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="email" 
              defaultValue="john.doe@example.com"
              className="input-field pl-10 w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567"
              className="input-field pl-10 w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              defaultValue="123 Main Street, New York, NY 10001"
              className="input-field pl-10 w-full"
            />
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medical Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Blood Type
          </label>
          <select className="input-field w-full">
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Allergies
          </label>
          <input 
            type="text" 
            defaultValue="Penicillin, Peanuts"
            className="input-field w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chronic Conditions
          </label>
          <input 
            type="text" 
            defaultValue="None"
            className="input-field w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Medications
          </label>
          <input 
            type="text" 
            defaultValue="Vitamin D, Multivitamin"
            className="input-field w-full"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button onClick={onSave} className="button-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const RecordsTab = () => {
  const records = [
    {
      id: 1,
      title: "Annual Physical Checkup",
      date: "Mar 15, 2023",
      doctor: "Dr. Sarah Johnson",
      type: "Examination",
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "Feb 20, 2023",
      doctor: "Dr. Michael Chen",
      type: "Lab Report",
    },
    {
      id: 3,
      title: "COVID-19 Vaccination",
      date: "Jan 10, 2023",
      doctor: "Dr. Amanda Patel",
      type: "Immunization",
    },
    {
      id: 4,
      title: "Dental Cleaning",
      date: "Dec 05, 2022",
      doctor: "Dr. Robert Smith",
      type: "Dental",
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Medical Records</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Records</h3>
          <button className="text-sm font-medium text-health-600 dark:text-health-400 flex items-center gap-1">
            Upload New <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {records.map((record) => (
            <div 
              key={record.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-health-200 dark:hover:border-health-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-health-50 dark:bg-health-900/30">
                  <Clipboard className="h-5 w-5 text-health-600 dark:text-health-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{record.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{record.date}</span>
                    <span>•</span>
                    <span>{record.doctor}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {record.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Health Documents</h3>
          <button className="text-sm font-medium text-health-600 dark:text-health-400 flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Insurance Card</h4>
              <button className="text-health-600 dark:text-health-400">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Health insurance policy details and coverage information</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Prescription History</h4>
              <button className="text-health-600 dark:text-health-400">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Record of all medications prescribed to you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = () => {
  const notifications = [
    {
      id: 'app_updates',
      label: 'App Updates',
      description: 'Receive notifications about new features and improvements',
      enabled: true,
    },
    {
      id: 'appointment_reminders',
      label: 'Appointment Reminders',
      description: 'Get reminded about upcoming doctor appointments',
      enabled: true,
    },
    {
      id: 'health_tips',
      label: 'Health Tips & Insights',
      description: 'Personalized health recommendations based on your data',
      enabled: true,
    },
    {
      id: 'medication_reminders',
      label: 'Medication Reminders',
      description: 'Reminders to take your medications on time',
      enabled: false,
    },
    {
      id: 'health_records',
      label: 'Health Records Updates',
      description: 'Notifications when new health records are available',
      enabled: true,
    },
    {
      id: 'promotional',
      label: 'Promotional Messages',
      description: 'Special offers and promotional content',
      enabled: false,
    },
  ];

  const [settings, setSettings] = useState(notifications);

  const toggleNotification = (id: string) => {
    setSettings(settings.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
      
      <div className="space-y-4">
        {settings.map((notification) => (
          <div 
            key={notification.id} 
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{notification.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={notification.enabled}
                onChange={() => toggleNotification(notification.id)}
              />
              <div className={`
                w-11 h-6 rounded-full peer ${
                  notification.enabled
                    ? 'bg-health-500 after:translate-x-full after:border-white'
                    : 'bg-gray-200 dark:bg-gray-700 after:border-gray-300 dark:after:border-gray-600'
                } 
                after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border 
                after:rounded-full after:h-5 after:w-5 after:transition-all duration-300
              `}></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrivacyTab = () => {
  const privacySettings = [
    {
      id: 'data_sharing',
      label: 'Data Sharing with Doctors',
      description: 'Allow your doctors to access your health data',
      enabled: true,
    },
    {
      id: 'analytics',
      label: 'Analytics & Improvements',
      description: 'Help improve the app by sharing anonymous usage data',
      enabled: true,
    },
    {
      id: 'research',
      label: 'Contribute to Research',
      description: 'Allow your anonymized data to be used for medical research',
      enabled: false,
    },
    {
      id: 'location',
      label: 'Location Services',
      description: 'Use your location to find nearby healthcare services',
      enabled: true,
    },
    {
      id: 'third_party',
      label: 'Third-Party Integrations',
      description: 'Allow connections with other health apps and services',
      enabled: false,
    },
  ];

  const [settings, setSettings] = useState(privacySettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>
          
          {settings.map((setting) => (
            <div 
              key={setting.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{setting.label}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={setting.enabled}
                  onChange={() => toggleSetting(setting.id)}
                />
                <div className={`
                  w-11 h-6 rounded-full peer ${
                    setting.enabled
                      ? 'bg-health-500 after:translate-x-full after:border-white'
                      : 'bg-gray-200 dark:bg-gray-700 after:border-gray-300 dark:after:border-gray-600'
                  } 
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all duration-300
                `}></div>
              </label>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Security</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                <button className="text-health-600 dark:text-health-400">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Enabled
                  </span>
                  <button className="text-health-600 dark:text-health-400">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Additional security for your account</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Download Your Data</h4>
                <button className="text-health-600 dark:text-health-400">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get a copy of all your personal data</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                <button className="text-red-600 dark:text-red-400">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
