
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const ClaimsPortal = () => {
  const [showNewClaim, setShowNewClaim] = useState(false);
  const [claimData, setClaimData] = useState({
    type: '',
    description: '',
    amount: '',
    date: ''
  });
  const { toast } = useToast();

  const existingClaims = [
    {
      id: 'CLM-2024-001',
      type: 'Auto Accident',
      date: '2024-01-10',
      amount: 3500,
      status: 'Approved',
      progress: 100
    },
    {
      id: 'CLM-2024-002',
      type: 'Windshield Damage',
      date: '2024-01-15',
      amount: 450,
      status: 'Processing',
      progress: 75
    },
    {
      id: 'CLM-2024-003',
      type: 'Home Water Damage',
      date: '2024-01-18',
      amount: 1200,
      status: 'Under Review',
      progress: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitClaim = () => {
    toast({
      title: "Claim Submitted Successfully!",
      description: "Your claim has been processed by AI and assigned claim ID CLM-2024-004. Expected processing time: 2-3 business days.",
    });
    setShowNewClaim(false);
    setClaimData({ type: '', description: '', amount: '', date: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setClaimData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Claims Portal</h1>
          <p className="text-gray-600">Submit and track your insurance claims</p>
        </div>
        <Button 
          onClick={() => setShowNewClaim(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          File New Claim
        </Button>
      </div>

      {showNewClaim && (
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">File New Claim</CardTitle>
            <CardDescription>AI-powered claim processing for faster approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="claimType">Claim Type</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto-accident">Auto Accident</SelectItem>
                    <SelectItem value="auto-theft">Auto Theft</SelectItem>
                    <SelectItem value="auto-vandalism">Auto Vandalism</SelectItem>
                    <SelectItem value="home-fire">Home Fire</SelectItem>
                    <SelectItem value="home-water">Home Water Damage</SelectItem>
                    <SelectItem value="home-theft">Home Theft</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="incidentDate">Incident Date</Label>
                <Input
                  id="incidentDate"
                  type="date"
                  value={claimData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="estimatedAmount">Estimated Amount</Label>
              <Input
                id="estimatedAmount"
                type="number"
                placeholder="Enter estimated claim amount"
                value={claimData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail..."
                value={claimData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AI Analysis in Progress</h4>
              <p className="text-sm text-blue-700">
                Our AI will analyze your claim details, cross-reference with policy coverage, 
                and provide instant preliminary approval where possible.
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSubmitClaim} className="flex-1">
                Submit Claim
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNewClaim(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">$5,150</div>
            <div className="text-green-100">Total Claims Paid</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">2.1 days</div>
            <div className="text-blue-100">Avg. Processing Time</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-purple-100">Customer Satisfaction</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
          <CardDescription>Track the status of your submitted claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingClaims.map((claim) => (
              <div key={claim.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-lg">{claim.id}</div>
                    <div className="text-gray-600">{claim.type}</div>
                    <div className="text-sm text-gray-500">{claim.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${claim.amount.toLocaleString()}</div>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Progress</span>
                    <span className="text-sm text-gray-600">{claim.progress}%</span>
                  </div>
                  <Progress value={claim.progress} className="w-full" />
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Documentation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
