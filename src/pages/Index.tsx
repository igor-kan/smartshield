import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskAssessment } from '@/components/RiskAssessment';
import { PolicyDashboard } from '@/components/PolicyDashboard';
import { ClaimsPortal } from '@/components/ClaimsPortal';
import { HeroSection } from '@/components/HeroSection';
import { InstantQuote } from '@/components/InstantQuote';
import { SmartCoaching } from '@/components/SmartCoaching';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  const handleGetQuote = () => {
    setActiveTab('instant-quote');
    toast({
      title: "Welcome to Smart Insurance",
      description: "Let's create your personalized policy with AI-driven risk assessment.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartInsure AI</h1>
                <p className="text-sm text-gray-600">Intelligent Insurance Solutions</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              AI-Powered
            </Badge>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="instant-quote">Instant Quote</TabsTrigger>
            <TabsTrigger value="quote">Risk Assessment</TabsTrigger>
            <TabsTrigger value="dashboard">My Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="coaching">Smart Coaching</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <HeroSection onGetQuote={handleGetQuote} />
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-600">Dynamic Risk Profiling</CardTitle>
                  <CardDescription>
                    AI analyzes 50+ data points to create your unique risk profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="text-green-600 font-semibold">98.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full w-[98.5%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-indigo-600">Real-time Approval</CardTitle>
                  <CardDescription>
                    Get instant policy approval and claims processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Average: 2.3 seconds</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-600">Custom Policies</CardTitle>
                  <CardDescription>
                    Tailored coverage based on your unique lifestyle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Badge variant="outline">Auto</Badge>
                    <Badge variant="outline">Home</Badge>
                    <Badge variant="outline">Health</Badge>
                    <Badge variant="outline">Life</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-blue-100 mb-6">
                      Join thousands of customers who trust our AI-powered insurance platform. 
                      Get your personalized quote in under 3 minutes.
                    </p>
                    <Button 
                      onClick={handleGetQuote}
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Start Your Quote
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">$2.3B+</div>
                    <div className="text-blue-200">Claims Processed</div>
                    <div className="text-2xl font-bold mt-4">4.9/5</div>
                    <div className="text-blue-200">Customer Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instant-quote">
            <InstantQuote />
          </TabsContent>

          <TabsContent value="quote">
            <RiskAssessment />
          </TabsContent>

          <TabsContent value="dashboard">
            <PolicyDashboard />
          </TabsContent>

          <TabsContent value="claims">
            <ClaimsPortal />
          </TabsContent>

          <TabsContent value="coaching">
            <SmartCoaching />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
