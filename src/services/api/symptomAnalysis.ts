
import { Diagnosis } from '@/hooks/use-symptom-analysis';

// Temporary mock API implementation
// In a real application, you would replace this with actual API calls
export const analyzeSymptoms = async (symptoms: string): Promise<Diagnosis[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Analyzing symptoms:', symptoms);
  
  // Mock response based on keywords in symptoms
  const lowerCaseSymptoms = symptoms.toLowerCase();
  
  if (lowerCaseSymptoms.includes('headache')) {
    return [
      {
        condition: 'Tension Headache',
        probability: 0.85,
        description: 'A common type of headache that causes mild to moderate pain in your head and neck.',
        recommendations: [
          'Over-the-counter pain relievers',
          'Stress management',
          'Regular sleep schedule',
          'Stay hydrated'
        ],
        severity: 'low'
      },
      {
        condition: 'Migraine',
        probability: 0.45,
        description: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
        recommendations: [
          'Rest in a quiet, dark room',
          'Prescription medications if severe',
          'Apply cold compresses',
          'Track triggers to prevent future episodes'
        ],
        severity: 'medium'
      }
    ];
  } else if (lowerCaseSymptoms.includes('fever') || lowerCaseSymptoms.includes('cough')) {
    return [
      {
        condition: 'Common Cold',
        probability: 0.78,
        description: 'A viral infection of your nose and throat (upper respiratory tract).',
        recommendations: [
          'Rest and fluids',
          'Over-the-counter cold medications',
          'Humidifier to ease congestion',
          'Saltwater gargle for sore throat'
        ],
        severity: 'low'
      },
      {
        condition: 'Flu (Influenza)',
        probability: 0.65,
        description: 'A contagious respiratory illness that can cause mild to severe illness.',
        recommendations: [
          'Rest and plenty of fluids',
          'Antiviral medications if prescribed',
          'Pain relievers for fever and aches',
          'Avoid contact with others to prevent spread'
        ],
        severity: 'medium'
      }
    ];
  } else if (lowerCaseSymptoms.includes('stomach') || lowerCaseSymptoms.includes('nausea')) {
    return [
      {
        condition: 'Gastroenteritis',
        probability: 0.82,
        description: 'An intestinal infection marked by diarrhea, cramps, nausea, vomiting, and fever.',
        recommendations: [
          'Stay hydrated with clear liquids',
          'Bland diet (BRAT: bananas, rice, applesauce, toast)',
          'Rest',
          'Over-the-counter anti-diarrheal medication'
        ],
        severity: 'medium'
      }
    ];
  } else {
    // Generic response if no specific keywords match
    return [
      {
        condition: 'General Discomfort',
        probability: 0.50,
        description: 'Non-specific symptoms that could be related to various conditions.',
        recommendations: [
          'Rest and monitor symptoms',
          'Stay hydrated',
          'Consult with a healthcare provider if symptoms persist or worsen'
        ],
        severity: 'low'
      }
    ];
  }
};
