import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentManagement from "@/components/admin/StudentManagement";
import TeacherManagement from "@/components/admin/TeacherManagement";
import CourseManagement from "@/components/admin/CourseManagement";
import TestManagement from "@/components/admin/TestManagement";
import AdvancedAnalytics from "@/components/admin/AdvancedAnalytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  TrendingUp,
  UserPlus,
  Plus,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Download,
  Upload,
  Search,
  Filter,
  Shield,
  Bell,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock admin data
  const adminStats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Teachers",
      value: "24",
      change: "+2",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Running Courses",
      value: "18",
      change: "+3",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Reviews",
      value: "47",
      change: "-5",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentActivities = [
    {
      type: "student",
      action: "New student enrolled",
      details: "Rohit Sharma - Class 12 PCM",
      time: "2 min ago",
      icon: UserPlus,
    },
    {
      type: "teacher",
      action: "Teacher updated profile",
      details: "Dr. Rajesh Kumar - Mathematics",
      time: "15 min ago",
      icon: Users,
    },
    {
      type: "course",
      action: "New course created",
      details: "Advanced Physics - JEE Preparation",
      time: "1 hour ago",
      icon: BookOpen,
    },
    {
      type: "test",
      action: "Test results published",
      details: "Mathematics Unit Test - Class 11",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      type: "review",
      action: "New review submitted",
      details: "5-star review for Chemistry course",
      time: "3 hours ago",
      icon: MessageSquare,
    },
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "Server backup scheduled for tonight at 2 AM",
      priority: "medium",
    },
    {
      type: "info",
      message: "5 new teacher applications pending approval",
      priority: "low",
    },
    {
      type: "error",
      message: "Payment gateway connection issue reported",
      priority: "high",
    },
    {
      type: "success",
      message: "Monthly report generated successfully",
      priority: "low",
    },
  ];

  const quickActions = [
    {
      title: "Add New Teacher",
      description: "Register a new faculty member",
      icon: UserPlus,
      action: "add-teacher",
      color: "bg-blue-500",
    },
    {
      title: "Create Course",
      description: "Set up a new course offering",
      icon: Plus,
      action: "add-course",
      color: "bg-green-500",
    },
    {
      title: "Schedule Test",
      description: "Create and schedule assessments",
      icon: Calendar,
      action: "add-test",
      color: "bg-purple-500",
    },
    {
      title: "Send Announcement",
      description: "Broadcast message to all users",
      icon: Bell,
      action: "send-announcement",
      color: "bg-orange-500",
    },
    {
      title: "Generate Report",
      description: "Create detailed analytics report",
      icon: BarChart3,
      action: "generate-report",
      color: "bg-indigo-500",
    },
    {
      title: "Manage Settings",
      description: "Configure system preferences",
      icon: Settings,
      action: "settings",
      color: "bg-gray-500",
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <Shield className="h-8 w-8 mr-3" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-blue-100">
                Comprehensive management system for PadhaiHub operations
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-purple-600"
              >
                <Activity className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Admin Interface */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start text-left hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center w-full mb-2">
                        <div
                          className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}
                        >
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold">{action.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <activity.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-3 border-l-4 rounded-r ${getPriorityColor(alert.priority)}`}
                      >
                        <div className="flex items-start">
                          {getAlertIcon(alert.type)}
                          <p className="ml-2 text-sm font-medium">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <TeacherManagement />
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <CourseManagement />
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Test & Assessment Management</CardTitle>
                    <CardDescription>
                      Create, schedule and manage tests
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Test management interface will be implemented here</p>
                  <p className="text-sm">
                    Features: Test Creation, Scheduling, Auto-grading, Results
                    Analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Comprehensive data analysis and reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Analytics dashboard will be implemented here</p>
                  <p className="text-sm">
                    Features: Performance Analytics, Revenue Reports, User
                    Engagement Metrics
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
