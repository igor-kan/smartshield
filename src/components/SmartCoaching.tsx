
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const SmartCoaching = () => {
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const { toast } = useToast();

  const riskReductions = [
    {
      id: 1,
      category: 'Vehicle Maintenance',
      action: 'Replace worn tires (tread depth < 4/32")',
      impact: 'Reduce accident risk by 12%',
      discount: '$8.50',
      priority: 'High',
      timeframe: '2 weeks'
    },
    {
      id: 2,
      category: 'Driving Behavior',
      action: 'Complete defensive driving course',
      impact: 'Lower premium tier qualification',
      discount: '$15.00',
      priority: 'Medium',
      timeframe: '1 month'
    },
    {
      id: 3,
      category: 'Security',
      action: 'Install dash cam with AI monitoring',
      impact: 'Fraud protection & evidence',
      discount: '$12.00',
      priority: 'Medium',
      timeframe: '1 week'
    },
    {
      id: 4,
      category: 'Health',
      action: 'Sync fitness tracker for health monitoring',
      impact: 'Qualify for wellness discounts',
      discount: '$20.00',
      priority: 'Low',
      timeframe: 'Immediate'
    }
  ];

  const handleCompleteAction = (actionId: number) => {
    setCompletedActions(prev => [...prev, actionId]);
    const action = riskReductions.find(a => a.id === actionId);
    
    toast({
      title: "Action Completed!",
      description: `Great! You've earned a ${action?.discount}/month discount by completing this risk reduction action.`,
    });
  };

  const totalSavings = riskReductions
    .filter(action => completedActions.includes(action.id))
    .reduce((sum, action) => sum + parseFloat(action.discount.replace('$', '')), 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Smart Risk Coaching</CardTitle>
          <CardDescription className="text-green-100">
            AI-powered recommendations to reduce risk and lower premiums
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">${totalSavings.toFixed(2)}</div>
              <div className="text-green-100">Monthly Savings Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{completedActions.length}/{riskReductions.length}</div>
              <div className="text-green-100">Actions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">85%</div>
              <div className="text-green-100">Risk Score Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {riskReductions.map((action) => {
          const isCompleted = completedActions.includes(action.id);
          
          return (
            <Card key={action.id} className={`border-0 shadow-lg ${isCompleted ? 'bg-green-50' : 'bg-white'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{action.action}</h3>
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority} Priority
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-green-600 text-white">
                          ✓ Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{action.category}</p>
                    <p className="text-sm text-gray-500">{action.impact}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {action.discount}<span className="text-sm">/mo</span>
                    </div>
                    <div className="text-sm text-gray-500">Savings</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Complete by: <span className="font-medium">{action.timeframe}</span>
                  </div>
                  
                  {!isCompleted ? (
                    <Button 
                      onClick={() => handleCompleteAction(action.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Mark Complete
                    </Button>
                  ) : (
                    <div className="text-green-600 font-medium text-sm">
                      Discount Applied ✓
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Your Risk Profile Improvement</CardTitle>
          <CardDescription>Track your progress towards lower premiums</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Risk Score</span>
                <span className="text-lg font-bold text-green-600">85/100</span>
              </div>
              <Progress value={85} className="w-full h-3" />
              <p className="text-sm text-gray-600 mt-1">
                Excellent! You're in the top 15% of safe drivers in your area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Next Milestone</h4>
                <p className="text-sm text-blue-700">
                  Complete 2 more actions to unlock "Premium Driver" status and save an additional $25/month.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">AI Insights</h4>
                <p className="text-sm text-purple-700">
                  Your driving patterns show 95% correlation with our safest driver profiles.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
