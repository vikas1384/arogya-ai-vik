
import { Diagnosis } from '@/hooks/use-symptom-analysis';

// Enhanced mock API implementation with more detailed analysis
export const analyzeSymptoms = async (symptoms: string): Promise<Diagnosis[]> => {
  // Simulate API call delay with variable response time
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  console.log('Analyzing symptoms:', symptoms);
  
  // Mock response based on keywords in symptoms
  const lowerCaseSymptoms = symptoms.toLowerCase();
  const results: Diagnosis[] = [];
  
  // More sophisticated pattern matching with expanded condition set
  
  // Headache related conditions
  if (lowerCaseSymptoms.includes('headache')) {
    if (lowerCaseSymptoms.includes('severe') || lowerCaseSymptoms.includes('worst') || lowerCaseSymptoms.includes('intense')) {
      results.push({
        condition: 'Migraine',
        probability: 0.75,
        description: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
        recommendations: [
          'Rest in a quiet, dark room',
          'Prescription medications like triptans if severe',
          'Apply cold compresses to forehead',
          'Track triggers to prevent future episodes'
        ],
        severity: 'medium'
      });
    } else if (lowerCaseSymptoms.includes('behind eyes') || lowerCaseSymptoms.includes('sinus') || lowerCaseSymptoms.includes('face pain')) {
      results.push({
        condition: 'Sinusitis',
        probability: 0.72,
        description: 'Inflammation of the sinuses that can cause facial pain, pressure, and congestion.',
        recommendations: [
          'Nasal decongestants or saline spray',
          'Steam inhalation',
          'Warm compresses on face',
          'Consult doctor if persistent'
        ],
        severity: 'low'
      });
    }
    
    if (lowerCaseSymptoms.includes('neck') || lowerCaseSymptoms.includes('stress')) {
      results.push({
        condition: 'Tension Headache',
        probability: 0.85,
        description: 'A common type of headache that causes mild to moderate pain in your head and neck.',
        recommendations: [
          'Over-the-counter pain relievers like ibuprofen or acetaminophen',
          'Stress management techniques',
          'Regular sleep schedule',
          'Stay hydrated'
        ],
        severity: 'low'
      });
    }
    
    if (lowerCaseSymptoms.includes('vomit') || lowerCaseSymptoms.includes('nausea') || lowerCaseSymptoms.includes('light')) {
      results.push({
        condition: 'Cluster Headache',
        probability: 0.40,
        description: 'Excruciating headaches occurring in cyclical patterns or clusters, often waking you in the middle of the night.',
        recommendations: [
          'Consult a neurologist immediately',
          'Oxygen therapy may provide relief',
          'Prescription medications',
          'Avoid alcohol during cluster periods'
        ],
        severity: 'high'
      });
    }
  }
  
  // Respiratory conditions
  if (lowerCaseSymptoms.includes('breath') || lowerCaseSymptoms.includes('breathing') || lowerCaseSymptoms.includes('short of breath')) {
    if (lowerCaseSymptoms.includes('wheez') || lowerCaseSymptoms.includes('tight chest')) {
      results.push({
        condition: 'Asthma',
        probability: 0.65,
        description: 'A condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.',
        recommendations: [
          'Use rescue inhaler if prescribed',
          'Avoid known triggers',
          'Follow asthma action plan',
          'Seek emergency care if severe'
        ],
        severity: 'medium'
      });
    }
    
    if (lowerCaseSymptoms.includes('anxiety') || lowerCaseSymptoms.includes('panic') || lowerCaseSymptoms.includes('stress')) {
      results.push({
        condition: 'Anxiety-Induced Hyperventilation',
        probability: 0.58,
        description: 'Rapid breathing caused by anxiety that can lead to dizziness, numbness in extremities, and chest tightness.',
        recommendations: [
          'Practice slow, deep breathing techniques',
          'Try grounding exercises',
          'Seek mental health support',
          'Consider relaxation techniques like meditation'
        ],
        severity: 'low'
      });
    }
  }
  
  // Fever related conditions
  if (lowerCaseSymptoms.includes('fever') || lowerCaseSymptoms.includes('temperature')) {
    let severityLevel: 'low' | 'medium' | 'high' = 'low';
    let probability = 0.78;
    
    // Extract temperature values if mentioned
    const tempRegex = /(\d+\.?\d*)\s*(°[cf]|degrees|f\b|c\b)/i;
    const tempMatch = symptoms.match(tempRegex);
    
    if (tempMatch) {
      const temp = parseFloat(tempMatch[1]);
      const unit = tempMatch[2].toLowerCase();
      
      // Convert to Fahrenheit if in Celsius
      const tempF = unit.includes('c') ? (temp * 9/5) + 32 : temp;
      
      if (tempF > 103) {
        severityLevel = 'high';
        probability = 0.92;
      } else if (tempF > 100.4) {
        severityLevel = 'medium';
        probability = 0.85;
      }
    } else if (lowerCaseSymptoms.includes('high fever') || lowerCaseSymptoms.includes('very hot')) {
      severityLevel = 'medium';
      probability = 0.85;
    }
    
    if (lowerCaseSymptoms.includes('cough')) {
      results.push({
        condition: 'Common Cold',
        probability: probability - 0.15,
        description: 'A viral infection of your nose and throat (upper respiratory tract).',
        recommendations: [
          'Rest and fluids',
          'Over-the-counter cold medications',
          'Humidifier to ease congestion',
          'Saltwater gargle for sore throat'
        ],
        severity: 'low'
      });
      
      results.push({
        condition: 'Flu (Influenza)',
        probability: probability,
        description: 'A contagious respiratory illness that can cause mild to severe illness.',
        recommendations: [
          'Rest and plenty of fluids',
          'Antiviral medications if prescribed early',
          'Pain relievers for fever and aches',
          'Avoid contact with others to prevent spread'
        ],
        severity: severityLevel
      });
      
      if (lowerCaseSymptoms.includes('breath') || lowerCaseSymptoms.includes('breathing')) {
        results.push({
          condition: 'Pneumonia',
          probability: 0.45,
          description: 'Infection that inflames air sacs in one or both lungs, which may fill with fluid.',
          recommendations: [
            'Seek medical attention immediately',
            'Antibiotics if bacterial',
            'Cough medicine',
            'Pain relievers and fever reducers'
          ],
          severity: 'high'
        });
      }
    }
  }
  
  // Joint pain conditions
  if (lowerCaseSymptoms.includes('joint') || lowerCaseSymptoms.includes('knee') || lowerCaseSymptoms.includes('elbow') || lowerCaseSymptoms.includes('ankle')) {
    if (lowerCaseSymptoms.includes('pain')) {
      if (lowerCaseSymptoms.includes('swell') || lowerCaseSymptoms.includes('red') || lowerCaseSymptoms.includes('hot')) {
        results.push({
          condition: 'Inflammatory Arthritis',
          probability: 0.68,
          description: 'Inflammation in the joints causing pain, swelling, and stiffness.',
          recommendations: [
            'Anti-inflammatory medications',
            'Rest affected joints',
            'Apply ice to reduce swelling',
            'Consult a rheumatologist'
          ],
          severity: 'medium'
        });
      } else if (lowerCaseSymptoms.includes('stiff') || lowerCaseSymptoms.includes('morning')) {
        results.push({
          condition: 'Osteoarthritis',
          probability: 0.75,
          description: 'A degenerative joint disease that occurs when the protective cartilage cushioning the ends of your bones wears down over time.',
          recommendations: [
            'Regular exercise to strengthen surrounding muscles',
            'Weight management to reduce pressure on joints',
            'Pain relievers and anti-inflammatory drugs',
            'Physical therapy'
          ],
          severity: 'low'
        });
      }
    }
  }
  
  // Gastrointestinal conditions
  if (lowerCaseSymptoms.includes('stomach') || lowerCaseSymptoms.includes('nausea') || lowerCaseSymptoms.includes('vomit')) {
    results.push({
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
    });
    
    if (lowerCaseSymptoms.includes('pain') && (lowerCaseSymptoms.includes('upper') || lowerCaseSymptoms.includes('right'))) {
      results.push({
        condition: 'Gallbladder Inflammation',
        probability: 0.55,
        description: 'Inflammation of the gallbladder, often due to gallstones blocking bile ducts.',
        recommendations: [
          'Consult a doctor immediately',
          'Ultrasound diagnosis',
          'Pain medication',
          'Possibly surgery if severe'
        ],
        severity: 'high'
      });
    }
    
    if (lowerCaseSymptoms.includes('heartburn') || lowerCaseSymptoms.includes('acid') || lowerCaseSymptoms.includes('reflux')) {
      results.push({
        condition: 'Gastroesophageal Reflux Disease (GERD)',
        probability: 0.70,
        description: 'A digestive disorder that affects the lower esophageal sphincter, causing stomach acid to flow back into the esophagus.',
        recommendations: [
          'Avoid trigger foods (spicy, fatty, citrus)',
          'Eat smaller meals',
          'Don\'t lie down right after eating',
          'Over-the-counter antacids or acid reducers'
        ],
        severity: 'low'
      });
    }
  }
  
  // Skin conditions
  if (lowerCaseSymptoms.includes('rash') || lowerCaseSymptoms.includes('skin')) {
    if (lowerCaseSymptoms.includes('itch') || lowerCaseSymptoms.includes('itchy')) {
      results.push({
        condition: 'Contact Dermatitis',
        probability: 0.75,
        description: 'A red, itchy rash caused by direct contact with a substance or an allergic reaction.',
        recommendations: [
          'Avoid the irritant or allergen',
          'Apply anti-itch cream or calamine lotion',
          'Take oral antihistamines',
          'Use moisturizers regularly'
        ],
        severity: 'low'
      });
      
      if (lowerCaseSymptoms.includes('scaly') || lowerCaseSymptoms.includes('dry patches')) {
        results.push({
          condition: 'Eczema',
          probability: 0.65,
          description: 'A condition that makes your skin red and itchy, often appearing in patches of very dry, thickened skin.',
          recommendations: [
            'Moisturize frequently',
            'Topical corticosteroids for flare-ups',
            'Avoid harsh soaps and hot water',
            'Identify and avoid triggers'
          ],
          severity: 'low'
        });
      }
    }
    
    if (lowerCaseSymptoms.includes('red') && lowerCaseSymptoms.includes('spots')) {
      results.push({
        condition: 'Hives',
        probability: 0.65,
        description: 'Raised, itchy welts that appear on the skin as a result of an allergic reaction.',
        recommendations: [
          'Take antihistamines',
          'Identify and avoid triggers',
          'Apply cold compress',
          'Seek immediate medical attention if breathing affected'
        ],
        severity: 'medium'
      });
    }
  }
  
  // Mental health symptoms
  if (lowerCaseSymptoms.includes('anxious') || lowerCaseSymptoms.includes('anxiety') || lowerCaseSymptoms.includes('worry') || lowerCaseSymptoms.includes('stress')) {
    results.push({
      condition: 'Generalized Anxiety Disorder',
      probability: 0.60,
      description: 'Persistent and excessive worry about various things that is difficult to control.',
      recommendations: [
        'Practice relaxation techniques',
        'Consider cognitive behavioral therapy',
        'Regular exercise',
        'Speak with a mental health professional'
      ],
      severity: 'medium'
    });
  }
  
  if (lowerCaseSymptoms.includes('sad') || lowerCaseSymptoms.includes('depress') || lowerCaseSymptoms.includes('no interest') || lowerCaseSymptoms.includes('no energy')) {
    results.push({
      condition: 'Depression',
      probability: 0.55,
      description: 'A mood disorder that causes a persistent feeling of sadness and loss of interest.',
      recommendations: [
        'Seek help from a mental health professional',
        'Regular physical activity',
        'Maintain social connections',
        'Establish regular sleep patterns'
      ],
      severity: 'medium'
    });
  }
  
  // If no specific matches, return a more nuanced generic response
  if (results.length === 0) {
    const containsMultipleSymptoms = (symptoms.split(' ').length > 5);
    const symptomWords = ['pain', 'ache', 'discomfort', 'swelling', 'redness', 'fatigue'];
    const hasCommonSymptoms = symptomWords.some(word => lowerCaseSymptoms.includes(word));
    
    results.push({
      condition: 'Unspecified Condition',
      probability: containsMultipleSymptoms ? 0.60 : 0.40,
      description: 'Your symptoms may indicate various conditions. More information or medical consultation is needed for a specific diagnosis.',
      recommendations: [
        'Monitor your symptoms closely',
        'Keep track of when symptoms occur and their duration',
        'Stay hydrated and get adequate rest',
        'Consult with a healthcare provider for a comprehensive evaluation'
      ],
      severity: hasCommonSymptoms ? 'medium' : 'low'
    });
  }
  
  // Sort by probability
  return results.sort((a, b) => b.probability - a.probability);
};
