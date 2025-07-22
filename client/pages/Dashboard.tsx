import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  BookOpen,
  Calendar as CalendarIcon,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  User,
  Bell,
  FileText,
  BarChart3,
  GraduationCap,
  DollarSign,
  Users,
  BookMarked,
} from "lucide-react";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import StudyTimer from "@/components/dashboard/StudyTimer";
import QuickActions from "@/components/dashboard/QuickActions";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock student data
  const studentData = {
    name: "Priya Sharma",
    class: "Class 12 - PCM",
    studentId: "STU2024001",
    avatar: "/placeholder.svg",
    overallGrade: "A+",
    attendance: 94,
    totalCredits: 180,
    completedCredits: 165,
  };

  const stats = [
    {
      title: "Overall Grade",
      value: studentData.overallGrade,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Attendance",
      value: `${studentData.attendance}%`,
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Assignments Due",
      value: "3",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Next Exam",
      value: "5 days",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const upcomingClasses = [
    {
      subject: "Mathematics",
      time: "10:00 AM - 11:30 AM",
      teacher: "Dr. Rajesh Kumar",
      room: "Room 201",
      type: "Regular Class",
    },
    {
      subject: "Physics",
      time: "12:00 PM - 1:30 PM",
      teacher: "Prof. Sunita Sharma",
      room: "Lab 1",
      type: "Practical",
    },
    {
      subject: "Chemistry",
      time: "2:00 PM - 3:30 PM",
      teacher: "Dr. Amit Verma",
      room: "Room 301",
      type: "Regular Class",
    },
  ];

  const assignments = [
    {
      subject: "Mathematics",
      title: "Calculus Problem Set 5",
      dueDate: "2024-01-15",
      status: "pending",
      priority: "high",
    },
    {
      subject: "Physics",
      title: "Wave Mechanics Lab Report",
      dueDate: "2024-01-18",
      status: "in-progress",
      priority: "medium",
    },
    {
      subject: "Chemistry",
      title: "Organic Chemistry Notes",
      dueDate: "2024-01-20",
      status: "completed",
      priority: "low",
    },
  ];

  const recentGrades = [
    { subject: "Mathematics", assignment: "Mid-term Exam", grade: "A+", score: "95/100" },
    { subject: "Physics", assignment: "Mechanics Quiz", grade: "A", score: "88/100" },
    { subject: "Chemistry", assignment: "Organic Lab", grade: "A+", score: "97/100" },
    { subject: "English", assignment: "Essay Writing", grade: "B+", score: "82/100" },
  ];

  const announcements = [
    {
      title: "Winter Break Schedule",
      content: "Classes will resume on January 8th, 2024. All pending assignments should be submitted by January 10th.",
      date: "2024-01-05",
      priority: "high",
    },
    {
      title: "New Study Material Available",
      content: "Updated physics study guides are now available in the resources section.",
      date: "2024-01-03",
      priority: "medium",
    },
    {
      title: "Parent-Teacher Meeting",
      content: "Scheduled for January 15th, 2024. Please confirm your attendance.",
      date: "2024-01-02",
      priority: "low",
    },
  ];

  const performanceData = [
    { name: 'Jan', value: 85 },
    { name: 'Feb', value: 88 },
    { name: 'Mar', value: 82 },
    { name: 'Apr', value: 91 },
    { name: 'May', value: 89 },
    { name: 'Jun', value: 94 },
  ];

  const subjectPerformance = [
    { name: 'Math', value: 95 },
    { name: 'Physics', value: 88 },
    { name: 'Chemistry', value: 92 },
    { name: 'English', value: 86 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {studentData.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {studentData.class} • ID: {studentData.studentId}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} dark:bg-opacity-20 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Classes */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Today's Classes
                  </CardTitle>
                  <CardDescription>Your schedule for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((class_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{class_.subject}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{class_.teacher}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{class_.room}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600 dark:text-blue-400">{class_.time}</p>
                          <Badge variant="outline">{class_.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Completion</span>
                      <span>{Math.round((studentData.completedCredits / studentData.totalCredits) * 100)}%</span>
                    </div>
                    <Progress value={(studentData.completedCredits / studentData.totalCredits) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Attendance Rate</span>
                      <span>{studentData.attendance}%</span>
                    </div>
                    <Progress value={studentData.attendance} />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Study Materials
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Join Study Group
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Recent Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignments.slice(0, 3).map((assignment, index) => (
                      <div key={index} className={`p-3 border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 dark:bg-gray-800 rounded-r`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.subject}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
                          </div>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {announcements.slice(0, 3).map((announcement, index) => (
                      <div key={index} className={`p-3 border-l-4 ${getPriorityColor(announcement.priority)} bg-gray-50 dark:bg-gray-800 rounded-r`}>
                        <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{announcement.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{announcement.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your complete class schedule for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <div key={day} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">{day}</h3>
                        <div className="grid gap-2">
                          {upcomingClasses.map((class_, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <span className="font-medium">{class_.subject}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{class_.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Track your assignments and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className={`p-4 border-l-4 ${getPriorityColor(assignment.priority)} bg-white dark:bg-gray-800 rounded-r shadow-sm`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{assignment.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{assignment.subject}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Recent Grades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGrades.map((grade, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div>
                          <h4 className="font-medium">{grade.assignment}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{grade.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{grade.grade}</p>
                          <p className="text-sm text-gray-500">{grade.score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {studentData.overallGrade}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Overall Grade</p>
                  </div>
                  
                  <div className="space-y-3">
                    {['Mathematics', 'Physics', 'Chemistry', 'English'].map((subject) => (
                      <div key={subject} className="flex justify-between items-center">
                        <span>{subject}</span>
                        <Badge variant="outline">A+</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Study Materials', 'Practice Tests', 'Video Lectures', 'Reference Books', 'Lab Manuals', 'Past Papers'].map((resource) => (
                <Card key={resource} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookMarked className="h-5 w-5 mr-2" />
                      {resource}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Access {resource.toLowerCase()} for all your subjects
                    </p>
                    <Button className="w-full">
                      Access {resource}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
