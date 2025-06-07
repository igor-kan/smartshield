import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const PolicyDashboard = () => {
  const policies = [
    {
      id: 1,
      type: 'Auto Insurance',
      vehicle: '2020 Honda Accord',
      premium: 89,
      status: 'Active',
      nextPayment: '2024-01-15',
      coverage: 85
    },
    {
      id: 2,
      type: 'Home Insurance',
      property: '123 Main St, CA',
      premium: 156,
      status: 'Active',
      nextPayment: '2024-01-20',
      coverage: 92
    },
    {
      id: 3,
      type: 'Life Insurance',
      details: '$500,000 Term',
      premium: 45,
      status: 'Pending',
      nextPayment: '2024-01-10',
      coverage: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Policy Dashboard</h1>
          <p className="text-gray-600">Manage your insurance policies</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New Policy
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">$290</div>
            <div className="text-blue-100">Total Monthly Premium</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">3</div>
            <div className="text-green-100">Active Policies</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">$15K</div>
            <div className="text-purple-100">Claims Paid YTD</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{policy.type}</CardTitle>
                  <CardDescription>
                    {policy.vehicle || policy.property || policy.details}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(policy.status)}>
                  {policy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600">${policy.premium}</div>
                  <div className="text-sm text-gray-600">Monthly Premium</div>
                </div>
                
                <div>
                  <div className="text-lg font-semibold">{policy.nextPayment}</div>
                  <div className="text-sm text-gray-600">Next Payment</div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium">Coverage</span>
                    <span className="text-sm text-gray-600">{policy.coverage}%</span>
                  </div>
                  <Progress value={policy.coverage} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Manage Policy
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to optimize your coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <div className="font-semibold text-blue-700">Bundle Discount Available</div>
              <div className="text-sm text-gray-600">Save 15% by bundling your auto and home insurance</div>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
              <div className="font-semibold text-green-700">Safe Driver Reward</div>
              <div className="text-sm text-gray-600">Your driving score improved! You qualify for a 10% discount</div>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <div className="font-semibold text-purple-700">Coverage Gap Detected</div>
              <div className="text-sm text-gray-600">Consider adding umbrella insurance for additional protection</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
