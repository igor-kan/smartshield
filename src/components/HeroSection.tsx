
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onGetQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetQuote }) => {
  return (
    <div className="relative overflow-hidden">
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <CardContent className="p-12">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              AI-Powered Insurance Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Insurance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the future of insurance with AI-driven risk assessment, 
              instant approvals, and personalized coverage that adapts to your life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={onGetQuote}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              >
                Get Instant Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">30s</div>
                <div className="text-blue-200">Average Quote Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-blue-200">AI Claims Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">99.9%</div>
                <div className="text-blue-200">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
