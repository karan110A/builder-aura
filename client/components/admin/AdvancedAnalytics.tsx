import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChartWrapper from "../dashboard/ChartWrapper";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { XAxis, YAxis } from "../dashboard/RechartComponents";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BookOpen,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [chartType, setChartType] = useState("revenue");

  // Mock advanced analytics data
  const revenueData = [
    { month: "Jul", revenue: 45000, students: 120, courses: 8 },
    { month: "Aug", revenue: 52000, students: 145, courses: 10 },
    { month: "Sep", revenue: 48000, students: 135, courses: 9 },
    { month: "Oct", revenue: 61000, students: 160, courses: 12 },
    { month: "Nov", revenue: 67000, students: 175, courses: 14 },
    { month: "Dec", revenue: 74000, students: 195, courses: 15 },
  ];

  const performanceData = [
    { subject: "Mathematics", avgScore: 85, students: 120, satisfaction: 4.8 },
    { subject: "Physics", avgScore: 78, students: 95, satisfaction: 4.6 },
    { subject: "Chemistry", avgScore: 82, students: 110, satisfaction: 4.9 },
    { subject: "Biology", avgScore: 79, students: 85, satisfaction: 4.5 },
    { subject: "English", avgScore: 88, students: 75, satisfaction: 4.7 },
    { subject: "Computer Science", avgScore: 91, students: 60, satisfaction: 4.9 },
  ];

  const enrollmentTrends = [
    { month: "Jul", newEnrollments: 25, dropouts: 5, retention: 95 },
    { month: "Aug", newEnrollments: 35, dropouts: 8, retention: 92 },
    { month: "Sep", newEnrollments: 20, dropouts: 12, retention: 89 },
    { month: "Oct", newEnrollments: 45, dropouts: 6, retention: 94 },
    { month: "Nov", newEnrollments: 38, dropouts: 9, retention: 91 },
    { month: "Dec", newEnrollments: 42, dropouts: 7, retention: 93 },
  ];

  const teacherPerformance = [
    { name: "Dr. Rajesh Kumar", rating: 4.9, students: 120, courses: 3, revenue: 25000 },
    { name: "Prof. Sunita Sharma", rating: 4.8, students: 95, courses: 2, revenue: 18000 },
    { name: "Dr. Amit Verma", rating: 4.9, students: 110, courses: 2, revenue: 22000 },
    { name: "Dr. Priya Nair", rating: 4.5, students: 85, courses: 2, revenue: 15000 },
  ];

  const coursePopularity = [
    { name: "JEE Mathematics", value: 35, color: "#3b82f6" },
    { name: "NEET Physics", value: 25, color: "#ef4444" },
    { name: "Chemistry Advanced", value: 20, color: "#10b981" },
    { name: "Biology NEET", value: 15, color: "#f59e0b" },
    { name: "English Literature", value: 5, color: "#8b5cf6" },
  ];

  const operationalMetrics = [
    { 
      title: "Server Uptime", 
      value: "99.9%", 
      trend: "+0.1%", 
      status: "excellent",
      icon: Activity,
      color: "text-green-600"
    },
    { 
      title: "Support Response", 
      value: "2.3 hrs", 
      trend: "-0.5 hrs", 
      status: "good",
      icon: Clock,
      color: "text-blue-600"
    },
    { 
      title: "Payment Success", 
      value: "98.5%", 
      trend: "+1.2%", 
      status: "excellent",
      icon: CheckCircle,
      color: "text-green-600"
    },
    { 
      title: "User Satisfaction", 
      value: "4.7/5", 
      trend: "+0.2", 
      status: "good",
      icon: Star,
      color: "text-yellow-600"
    },
  ];

  const predictiveInsights = [
    {
      type: "opportunity",
      title: "Peak Enrollment Period",
      description: "Based on trends, expect 40% increase in enrollments in January-February.",
      confidence: 89,
      action: "Prepare marketing campaigns and teacher availability"
    },
    {
      type: "warning", 
      title: "Teacher Capacity Alert",
      description: "Dr. Rajesh Kumar approaching maximum student capacity (125/130).",
      confidence: 95,
      action: "Consider hiring additional mathematics faculty"
    },
    {
      type: "info",
      title: "Revenue Projection",
      description: "Current trajectory suggests ₹85,000 monthly revenue by March.",
      confidence: 76,
      action: "Review pricing strategy for premium courses"
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity": return "border-l-green-500 bg-green-50";
      case "warning": return "border-l-yellow-500 bg-yellow-50";
      default: return "border-l-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-gray-600">Comprehensive data analysis and insights</p>
        </div>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {operationalMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <Badge variant="outline" className="text-xs">
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenue & Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={true}
                    angle={0}
                    height={60}
                    interval="preserveStartEnd"
                    minTickGap={5}
                    orientation="bottom"
                    reversed={false}
                    tickCount={5}
                    type="category"
                  />
                  <YAxis
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={false}
                    orientation="left"
                    type="number"
                    width={60}
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Subject Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="subject"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={true}
                    interval="preserveStartEnd"
                    minTickGap={5}
                    orientation="bottom"
                    reversed={false}
                    tickCount={5}
                    type="category"
                  />
                  <YAxis
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={false}
                    orientation="left"
                    type="number"
                    width={60}
                  />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </CardContent>
        </Card>

        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Enrollment & Retention Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={true}
                    angle={0}
                    height={60}
                    interval="preserveStartEnd"
                    minTickGap={5}
                    orientation="bottom"
                    reversed={false}
                    tickCount={5}
                    type="category"
                  />
                  <YAxis
                    axisLine={true}
                    tickLine={true}
                    tickMargin={5}
                    tick={true}
                    allowDecimals={true}
                    allowDuplicatedCategory={false}
                    orientation="left"
                    type="number"
                    width={60}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="newEnrollments" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </CardContent>
        </Card>

        {/* Course Popularity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2" />
              Course Popularity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coursePopularity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {coursePopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Teacher Performance Leaderboard
          </CardTitle>
          <CardDescription>Top performing faculty based on ratings and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacherPerformance.map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{teacher.name}</h4>
                    <p className="text-sm text-gray-600">{teacher.students} students • {teacher.courses} courses</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-600">{teacher.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">₹{teacher.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI-Powered Predictive Insights
          </CardTitle>
          <CardDescription>Smart recommendations based on data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-r ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                    <p className="text-sm font-medium text-gray-900">
                      Recommended Action: {insight.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
