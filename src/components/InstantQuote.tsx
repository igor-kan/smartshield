
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export const InstantQuote = () => {
  const [userInput, setUserInput] = useState('');
  const [coverage, setCoverage] = useState({
    deductible: [500],
    liability: [100000],
    comprehensive: true,
    collision: true,
    roadside: false,
    rental: false
  });
  const [basePremium, setBasePremium] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleNLPQuote = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const premium = Math.floor(Math.random() * 200) + 80;
      setBasePremium(premium);
      setIsProcessing(false);
      
      toast({
        title: "AI Quote Generated!",
        description: `Based on your description, we've created a personalized quote for you.`,
      });
    }, 2000);
  };

  const calculatePremium = () => {
    let total = basePremium;
    
    // Deductible adjustment
    if (coverage.deductible[0] < 500) total += 20;
    if (coverage.deductible[0] > 1000) total -= 15;
    
    // Liability adjustment
    if (coverage.liability[0] > 100000) total += 25;
    
    // Add-ons
    if (coverage.roadside) total += 15;
    if (coverage.rental) total += 22;
    if (!coverage.comprehensive) total -= 30;
    if (!coverage.collision) total -= 25;
    
    return Math.max(total, 50);
  };

  const finalPremium = calculatePremium();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">AI-Powered Instant Quote</CardTitle>
          <CardDescription className="text-blue-100">
            Describe your insurance needs in natural language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nlp-input" className="text-white">
              Tell us about your insurance needs
            </Label>
            <Textarea
              id="nlp-input"
              placeholder="e.g., I'm a 28-year-old software engineer who drives a 2019 Honda Civic. I commute 15 miles daily and have a clean driving record. I want comprehensive coverage with a low deductible."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              rows={3}
            />
          </div>
          <Button 
            onClick={handleNLPQuote}
            disabled={!userInput.trim() || isProcessing}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            {isProcessing ? 'AI Processing...' : 'Generate AI Quote'}
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Customize Your Policy</CardTitle>
            <CardDescription>Adjust coverage options to fit your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Deductible: ${coverage.deductible[0]}</Label>
              <Slider
                value={coverage.deductible}
                onValueChange={(value) => setCoverage(prev => ({ ...prev, deductible: value }))}
                max={2000}
                min={250}
                step={250}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$250</span>
                <span>$2,000</span>
              </div>
            </div>

            <div>
              <Label>Liability Coverage: ${coverage.liability[0].toLocaleString()}</Label>
              <Slider
                value={coverage.liability}
                onValueChange={(value) => setCoverage(prev => ({ ...prev, liability: value }))}
                max={500000}
                min={50000}
                step={25000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$50K</span>
                <span>$500K</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Comprehensive Coverage</Label>
                <Switch
                  checked={coverage.comprehensive}
                  onCheckedChange={(checked) => setCoverage(prev => ({ ...prev, comprehensive: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Collision Coverage</Label>
                <Switch
                  checked={coverage.collision}
                  onCheckedChange={(checked) => setCoverage(prev => ({ ...prev, collision: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Roadside Assistance (+$15/mo)</Label>
                <Switch
                  checked={coverage.roadside}
                  onCheckedChange={(checked) => setCoverage(prev => ({ ...prev, roadside: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Rental Car Coverage (+$22/mo)</Label>
                <Switch
                  checked={coverage.rental}
                  onCheckedChange={(checked) => setCoverage(prev => ({ ...prev, rental: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Your Quote</CardTitle>
            <CardDescription>Real-time premium calculation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${finalPremium}
              </div>
              <div className="text-gray-600 mb-4">Monthly Premium</div>
              <Badge className="bg-green-100 text-green-800 mb-4">
                AI-Optimized Price
              </Badge>
              
              <div className="space-y-2 text-sm text-left mt-6">
                <div className="flex justify-between">
                  <span>Base Premium</span>
                  <span>${basePremium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductible Adjustment</span>
                  <span className={coverage.deductible[0] < 500 ? 'text-red-600' : coverage.deductible[0] > 1000 ? 'text-green-600' : ''}>
                    {coverage.deductible[0] < 500 ? '+$20' : coverage.deductible[0] > 1000 ? '-$15' : '$0'}
                  </span>
                </div>
                {coverage.roadside && (
                  <div className="flex justify-between">
                    <span>Roadside Assistance</span>
                    <span className="text-red-600">+$15</span>
                  </div>
                )}
                {coverage.rental && (
                  <div className="flex justify-between">
                    <span>Rental Coverage</span>
                    <span className="text-red-600">+$22</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly</span>
                  <span>${finalPremium}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Purchase This Policy
              </Button>
              <Button variant="outline" className="w-full">
                Save Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle>AI Risk Analysis</CardTitle>
          <CardDescription>Transparent insights into your premium calculation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">Low</div>
              <div className="text-sm text-gray-600">Accident Risk</div>
              <div className="text-xs text-gray-500 mt-1">Based on driving history & location</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Medium</div>
              <div className="text-sm text-gray-600">Theft Risk</div>
              <div className="text-xs text-gray-500 mt-1">Vehicle model & parking location</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">Medium</div>
              <div className="text-sm text-gray-600">Weather Risk</div>
              <div className="text-xs text-gray-500 mt-1">Regional climate patterns</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
