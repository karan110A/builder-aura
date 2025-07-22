import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  Clock,
  Users,
  Calendar,
  Save,
  X,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Timer,
  Target
} from "lucide-react";

interface Test {
  id: number;
  title: string;
  subject: string;
  type: "quiz" | "unit-test" | "mid-term" | "final" | "mock-test";
  description: string;
  teacher: string;
  course: string;
  duration: number; // in minutes
  totalMarks: number;
  totalQuestions: number;
  scheduledDate: string;
  scheduledTime: string;
  status: "draft" | "scheduled" | "active" | "completed" | "cancelled";
  studentsEnrolled: number;
  studentsCompleted: number;
  averageScore: number;
  passingMarks: number;
}

interface Question {
  id: number;
  question: string;
  type: "mcq" | "true-false" | "short-answer" | "long-answer";
  options?: string[];
  correctAnswer: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
}

export default function TestManagement() {
  const { toast } = useToast();
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  
  // Mock test data
  const [tests, setTests] = useState<Test[]>([
    {
      id: 1,
      title: "Calculus Unit Test",
      subject: "Mathematics",
      type: "unit-test",
      description: "Test covering differentiation and integration concepts",
      teacher: "Dr. Rajesh Kumar",
      course: "Advanced Mathematics for JEE",
      duration: 120,
      totalMarks: 100,
      totalQuestions: 20,
      scheduledDate: "2024-01-20",
      scheduledTime: "10:00",
      status: "scheduled",
      studentsEnrolled: 28,
      studentsCompleted: 0,
      averageScore: 0,
      passingMarks: 40
    },
    {
      id: 2,
      title: "Mechanics Quiz",
      subject: "Physics",
      type: "quiz",
      description: "Quick assessment on Newton's laws and motion",
      teacher: "Prof. Sunita Sharma",
      course: "Physics for NEET Preparation",
      duration: 60,
      totalMarks: 50,
      totalQuestions: 15,
      scheduledDate: "2024-01-18",
      scheduledTime: "14:00",
      status: "completed",
      studentsEnrolled: 22,
      studentsCompleted: 22,
      averageScore: 78,
      passingMarks: 25
    },
    {
      id: 3,
      title: "Organic Reactions Mock Test",
      subject: "Chemistry",
      type: "mock-test",
      description: "Comprehensive test on organic reaction mechanisms",
      teacher: "Dr. Amit Verma",
      course: "Organic Chemistry Mastery",
      duration: 180,
      totalMarks: 150,
      totalQuestions: 30,
      scheduledDate: "2024-01-25",
      scheduledTime: "09:00",
      status: "draft",
      studentsEnrolled: 18,
      studentsCompleted: 0,
      averageScore: 0,
      passingMarks: 60
    }
  ]);

  const [newTest, setNewTest] = useState({
    title: "",
    subject: "",
    type: "quiz" as const,
    description: "",
    teacher: "",
    course: "",
    duration: 60,
    totalMarks: 50,
    scheduledDate: "",
    scheduledTime: "",
    passingMarks: 25
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
  const teachers = ["Dr. Rajesh Kumar", "Prof. Sunita Sharma", "Dr. Amit Verma", "Dr. Priya Nair"];
  const courses = ["Advanced Mathematics for JEE", "Physics for NEET Preparation", "Organic Chemistry Mastery"];
  const testTypes = [
    { value: "quiz", label: "Quiz" },
    { value: "unit-test", label: "Unit Test" },
    { value: "mid-term", label: "Mid-term Exam" },
    { value: "final", label: "Final Exam" },
    { value: "mock-test", label: "Mock Test" }
  ];

  const handleCreateTest = () => {
    if (!newTest.title || !newTest.subject || !newTest.teacher) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const test: Test = {
      id: tests.length + 1,
      ...newTest,
      totalQuestions: 0,
      status: "draft",
      studentsEnrolled: 0,
      studentsCompleted: 0,
      averageScore: 0
    };

    setTests([...tests, test]);
    setNewTest({
      title: "",
      subject: "",
      type: "quiz",
      description: "",
      teacher: "",
      course: "",
      duration: 60,
      totalMarks: 50,
      scheduledDate: "",
      scheduledTime: "",
      passingMarks: 25
    });
    setIsCreatingTest(false);

    toast({
      title: "Test Created Successfully",
      description: `${test.title} has been added to the test library.`,
    });
  };

  const handleDeleteTest = (id: number) => {
    const test = tests.find(t => t.id === id);
    setTests(tests.filter(t => t.id !== id));
    
    toast({
      title: "Test Deleted",
      description: `${test?.title} has been removed from the test library.`,
    });
  };

  const updateTestStatus = (id: number, status: Test['status']) => {
    setTests(tests.map(t => 
      t.id === id ? { ...t, status } : t
    ));

    toast({
      title: "Test Status Updated",
      description: `Test status has been changed to ${status}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz": return "bg-green-100 text-green-800";
      case "unit-test": return "bg-blue-100 text-blue-800";
      case "mid-term": return "bg-yellow-100 text-yellow-800";
      case "final": return "bg-red-100 text-red-800";
      case "mock-test": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "active": return <Timer className="h-4 w-4" />;
      case "scheduled": return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Test & Assessment Management</h2>
          <p className="text-gray-600">Create, schedule and manage tests</p>
        </div>
        <Button onClick={() => setIsCreatingTest(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {/* Create Test Form */}
      {isCreatingTest && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Test</CardTitle>
            <CardDescription>Set up a new test or assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Test Title *</Label>
                <Input
                  id="title"
                  value={newTest.title}
                  onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                  placeholder="Enter test title"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select onValueChange={(value) => setNewTest({...newTest, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Test Type</Label>
                <Select onValueChange={(value: any) => setNewTest({...newTest, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="teacher">Teacher *</Label>
                <Select onValueChange={(value) => setNewTest({...newTest, teacher: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="course">Course</Label>
                <Select onValueChange={(value) => setNewTest({...newTest, course: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newTest.duration}
                  onChange={(e) => setNewTest({...newTest, duration: parseInt(e.target.value) || 60})}
                  placeholder="Test duration"
                />
              </div>

              <div>
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  value={newTest.totalMarks}
                  onChange={(e) => setNewTest({...newTest, totalMarks: parseInt(e.target.value) || 50})}
                  placeholder="Total marks"
                />
              </div>

              <div>
                <Label htmlFor="passingMarks">Passing Marks</Label>
                <Input
                  id="passingMarks"
                  type="number"
                  value={newTest.passingMarks}
                  onChange={(e) => setNewTest({...newTest, passingMarks: parseInt(e.target.value) || 25})}
                  placeholder="Minimum marks to pass"
                />
              </div>

              <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={newTest.scheduledDate}
                  onChange={(e) => setNewTest({...newTest, scheduledDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="scheduledTime">Scheduled Time</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={newTest.scheduledTime}
                  onChange={(e) => setNewTest({...newTest, scheduledTime: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Test Description</Label>
                <Textarea
                  id="description"
                  value={newTest.description}
                  onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                  placeholder="Enter test description and instructions"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreatingTest(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleCreateTest}>
                <Save className="h-4 w-4 mr-2" />
                Create Test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tests List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{test.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getStatusColor(test.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(test.status)}
                        <span className="ml-1">{test.status}</span>
                      </div>
                    </Badge>
                    <Badge className={getTypeColor(test.type)}>
                      {test.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardDescription>{test.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{test.subject}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{test.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{test.duration} mins</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{test.totalMarks} marks</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{test.scheduledDate} {test.scheduledTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Pass: {test.passingMarks}</span>
                  </div>
                </div>
              </div>

              {test.status === "completed" && (
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{test.studentsCompleted}</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{test.averageScore}%</p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round((test.studentsCompleted / test.studentsEnrolled) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4">
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                
                {test.status === "draft" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTestStatus(test.id, "scheduled")}
                  >
                    Schedule
                  </Button>
                )}
                
                {test.status === "scheduled" && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateTestStatus(test.id, "active")}
                    >
                      Start Test
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateTestStatus(test.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                
                {test.status === "completed" && (
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Results
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeleteTest(test.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
