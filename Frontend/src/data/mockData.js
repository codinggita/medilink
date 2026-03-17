export const specialties = [
  { name: 'Cardiology', specialty: 'Heart specialist' },
  { name: 'Neurology', specialty: 'Brain and nervous system' },
  { name: 'Dental Care', specialty: 'Oral health' },
  { name: 'Ophthalmology', specialty: 'Eye care' },
  { name: 'Pediatrics', specialty: 'Children\'s health' },
  { name: 'Nutrition', specialty: 'Diet and wellness' },
  { name: 'Dermatology', specialty: 'Skin care' },
  { name: 'Orthopedics', specialty: 'Bone and joint' },
];

export const doctors = [
  { 
    id: 1, 
    name: 'Dr. James Wilson', 
    specialty: 'Senior Cardiologist', 
    clinic: 'Heart & Vascular Institute',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 2, 
    name: 'Dr. Sarah Chen', 
    specialty: 'Neurologist', 
    clinic: 'Brain Care Specialist Center',
    img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 3, 
    name: 'Dr. Michael Roe', 
    specialty: 'Pediatrician', 
    clinic: 'Kids Health Hospital',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 4, 
    name: 'Dr. Emily Davis', 
    specialty: 'Dermatologist', 
    clinic: 'Clear Skin Clinic',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];

export const clinics = [
  { name: 'Heart & Vascular Institute', loc: 'North Medical Plaza, Seattle' },
  { name: 'Brain Care Specialist Center', loc: 'City Wellness Center, Seattle' },
  { name: 'Kids Health Hospital', loc: 'Children\'s Medical Plaza, Seattle' },
  { name: 'Clear Skin Clinic', loc: '102 East Lake Ave, Seattle' },
  { name: 'Seattle General Hospital', loc: 'Downtown Seattle' },
  { name: 'Urgent Care Plus', loc: 'Capitol Hill, Seattle' }
];

export const notifications = [
  {
    id: 1,
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. James Wilson is tomorrow at 10:00 AM.',
    time: '2 hours ago',
    type: 'appointment',
    unread: true
  },
  {
    id: 2,
    title: 'New Lab Results',
    message: 'Your Blood Panel results are now available for review.',
    time: '5 hours ago',
    type: 'report',
    unread: true
  },
  {
    id: 3,
    title: 'Prescription Ready',
    message: 'Your prescription for Lisinopril has been filled at City Pharmacy.',
    time: 'Yesterday',
    type: 'prescription',
    unread: false
  },
  {
    id: 4,
    title: 'Security Alert',
    message: 'A new login was detected from a Chrome browser on Windows.',
    time: '2 days ago',
    type: 'security',
    unread: false
  }
];
