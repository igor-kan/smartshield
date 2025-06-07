
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { calculatePremium } from '@/utils/premiumCalculator';
import { useToast } from '@/hooks/use-toast';

export const RiskAssessment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    vehicleYear: '',
    vehicleType: '',
    drivingHistory: '',
    annualMileage: '',
    creditScore: '',
    coverageType: ''
  });
  const [premium, setPremium] = useState<number | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      generateQuote();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateQuote = () => {
    const calculatedPremium = calculatePremium(formData);
    const calculatedRiskScore = Math.floor(Math.random() * 30) + 70; // Mock risk score
    
    setPremium(calculatedPremium);
    setRiskScore(calculatedRiskScore);
    
    toast({
      title: "Quote Generated Successfully!",
      description: `Your personalized premium has been calculated using AI analysis.`,
    });
  };

  const getRiskLevel = (score: number) => {
    if (score >= 90) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score >= 70) return { level: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { level: 'High', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  if (premium && riskScore) {
    const risk = getRiskLevel(riskScore);
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-700">Your Personalized Quote</CardTitle>
            <CardDescription>AI-generated based on your unique risk profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="text-4xl font-bold text-blue-600 mb-2">${premium}</div>
                  <div className="text-gray-600">Monthly Premium</div>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">AI-Optimized</Badge>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Risk Score</span>
                    <Badge className={`${risk.textColor} bg-gray-100`}>{risk.level} Risk</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full ${risk.color}`}
                      style={{ width: `${riskScore}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">{riskScore}/100</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Coverage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Liability Coverage</span>
                      <span className="font-semibold">$100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Collision Coverage</span>
                      <span className="font-semibold">$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comprehensive</span>
                      <span className="font-semibold">$25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deductible</span>
                      <span className="font-semibold">$500</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Purchase Policy
                  </Button>
                  <Button variant="outline" className="w-full">
                    Customize Coverage
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <CardTitle className="text-2xl">AI Risk Assessment</CardTitle>
              <CardDescription>Step {step} of {totalSteps}</CardDescription>
            </div>
            <Badge variant="secondary">Smart Analysis</Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Vehicle Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleYear">Vehicle Year</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    placeholder="e.g., 2020"
                    value={formData.vehicleYear}
                    onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Driving History</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drivingHistory">Driving Record</Label>
                  <Select onValueChange={(value) => handleInputChange('drivingHistory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your record" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clean">Clean Record</SelectItem>
                      <SelectItem value="minor">Minor Violations</SelectItem>
                      <SelectItem value="major">Major Violations</SelectItem>
                      <SelectItem value="accidents">Recent Accidents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualMileage">Annual Mileage</Label>
                  <Input
                    id="annualMileage"
                    type="number"
                    placeholder="e.g., 12000"
                    value={formData.annualMileage}
                    onChange={(e) => handleInputChange('annualMileage', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Coverage Preferences</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="creditScore">Credit Score Range</Label>
                  <Select onValueChange={(value) => handleInputChange('creditScore', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (750+)</SelectItem>
                      <SelectItem value="good">Good (700-749)</SelectItem>
                      <SelectItem value="fair">Fair (650-699)</SelectItem>
                      <SelectItem value="poor">Poor (Below 650)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="coverageType">Coverage Type</Label>
                  <Select onValueChange={(value) => handleInputChange('coverageType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {step === totalSteps ? 'Generate Quote' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
