
interface FormData {
  age: string;
  location: string;
  vehicleYear: string;
  vehicleType: string;
  drivingHistory: string;
  annualMileage: string;
  creditScore: string;
  coverageType: string;
}

export const calculatePremium = (data: FormData): number => {
  let basePremium = 120; // Base monthly premium
  
  // Age factor
  const age = parseInt(data.age);
  if (age < 25) basePremium *= 1.5;
  else if (age < 35) basePremium *= 1.2;
  else if (age >= 65) basePremium *= 1.1;
  
  // Location factor
  const locationMultipliers: { [key: string]: number } = {
    'CA': 1.3,
    'NY': 1.4,
    'TX': 1.0,
    'FL': 1.2,
    'IL': 1.1
  };
  basePremium *= locationMultipliers[data.location] || 1.0;
  
  // Vehicle year factor
  const vehicleYear = parseInt(data.vehicleYear);
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - vehicleYear;
  if (vehicleAge < 3) basePremium *= 1.2;
  else if (vehicleAge > 10) basePremium *= 0.8;
  
  // Vehicle type factor
  const vehicleMultipliers: { [key: string]: number } = {
    'sedan': 1.0,
    'suv': 1.1,
    'truck': 1.2,
    'coupe': 1.3,
    'convertible': 1.5
  };
  basePremium *= vehicleMultipliers[data.vehicleType] || 1.0;
  
  // Driving history factor
  const drivingMultipliers: { [key: string]: number } = {
    'clean': 0.9,
    'minor': 1.1,
    'major': 1.4,
    'accidents': 1.6
  };
  basePremium *= drivingMultipliers[data.drivingHistory] || 1.0;
  
  // Annual mileage factor
  const mileage = parseInt(data.annualMileage);
  if (mileage > 15000) basePremium *= 1.2;
  else if (mileage < 7500) basePremium *= 0.9;
  
  // Credit score factor
  const creditMultipliers: { [key: string]: number } = {
    'excellent': 0.85,
    'good': 0.95,
    'fair': 1.1,
    'poor': 1.3
  };
  basePremium *= creditMultipliers[data.creditScore] || 1.0;
  
  // Coverage type factor
  const coverageMultipliers: { [key: string]: number } = {
    'basic': 0.8,
    'standard': 1.0,
    'premium': 1.3,
    'comprehensive': 1.6
  };
  basePremium *= coverageMultipliers[data.coverageType] || 1.0;
  
  // Add some randomization for AI effect (±10%)
  const randomFactor = 0.9 + Math.random() * 0.2;
  basePremium *= randomFactor;
  
  return Math.round(basePremium);
};
