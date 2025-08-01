import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Target,
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
  questions1Mark: number;
  questions2Mark: number;
  questions3Mark: number;
  questions4Mark: number;
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
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: "",
    type: "mcq",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1,
    difficulty: "medium",
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

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
      questions1Mark: 5,
      questions2Mark: 8,
      questions3Mark: 5,
      questions4Mark: 2,
      scheduledDate: "2024-01-20",
      scheduledTime: "10:00",
      status: "scheduled",
      studentsEnrolled: 28,
      studentsCompleted: 0,
      averageScore: 0,
      passingMarks: 40,
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
      questions1Mark: 10,
      questions2Mark: 5,
      questions3Mark: 0,
      questions4Mark: 0,
      scheduledDate: "2024-01-18",
      scheduledTime: "14:00",
      status: "completed",
      studentsEnrolled: 22,
      studentsCompleted: 22,
      averageScore: 78,
      passingMarks: 25,
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
      questions1Mark: 10,
      questions2Mark: 10,
      questions3Mark: 6,
      questions4Mark: 4,
      scheduledDate: "2024-01-25",
      scheduledTime: "09:00",
      status: "draft",
      studentsEnrolled: 18,
      studentsCompleted: 0,
      averageScore: 0,
      passingMarks: 60,
    },
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
    totalQuestions: 0,
    questions1Mark: 0,
    questions2Mark: 0,
    questions3Mark: 0,
    questions4Mark: 0,
    scheduledDate: "",
    scheduledTime: "",
    passingMarks: 25,
  });

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
  ];
  const teachers = [
    "Dr. Rajesh Kumar",
    "Prof. Sunita Sharma",
    "Dr. Amit Verma",
    "Dr. Priya Nair",
  ];
  const courses = [
    "Advanced Mathematics for JEE",
    "Physics for NEET Preparation",
    "Organic Chemistry Mastery",
  ];
  const testTypes = [
    { value: "quiz", label: "Quiz" },
    { value: "unit-test", label: "Unit Test" },
    { value: "mid-term", label: "Mid-term Exam" },
    { value: "final", label: "Final Exam" },
    { value: "mock-test", label: "Mock Test" },
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
      totalQuestions: newTest.questions1Mark + newTest.questions2Mark + newTest.questions3Mark + newTest.questions4Mark,
      status: "draft",
      studentsEnrolled: 0,
      studentsCompleted: 0,
      averageScore: 0,
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
      totalQuestions: 0,
      questions1Mark: 0,
      questions2Mark: 0,
      questions3Mark: 0,
      questions4Mark: 0,
      scheduledDate: "",
      scheduledTime: "",
      passingMarks: 25,
    });
    setIsCreatingTest(false);

    toast({
      title: "Test Created Successfully",
      description: `${test.title} has been added to the test library.`,
    });
  };

  const handleDeleteTest = (id: number) => {
    const test = tests.find((t) => t.id === id);
    setTests(tests.filter((t) => t.id !== id));

    toast({
      title: "Test Deleted",
      description: `${test?.title} has been removed from the test library.`,
    });
  };

  const updateTestStatus = (id: number, status: Test["status"]) => {
    setTests(tests.map((t) => (t.id === id ? { ...t, status } : t)));

    toast({
      title: "Test Status Updated",
      description: `Test status has been changed to ${status}.`,
    });
  };

  const handleEditTest = (test: Test) => {
    setEditingTest(test);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTest = () => {
    if (editingTest) {
      if (!editingTest.title || !editingTest.subject || !editingTest.teacher) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      setTests(
        tests.map((t) => (t.id === editingTest.id ? editingTest : t)),
      );
      setEditingTest(null);
      setIsEditDialogOpen(false);

      toast({
        title: "Test Updated",
        description: "Test information has been updated successfully.",
      });
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.correctAnswer) {
      toast({
        title: "Missing Information",
        description: "Please fill in question and correct answer.",
        variant: "destructive",
      });
      return;
    }

    const question: Question = {
      id: questions.length + 1,
      ...newQuestion as Question,
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      question: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
      difficulty: "medium",
    });
    setIsAddingQuestion(false);

    toast({
      title: "Question Added",
      description: "Question has been added to the test.",
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Question Deleted",
      description: "Question has been removed from the test.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-green-100 text-green-800";
      case "unit-test":
        return "bg-blue-100 text-blue-800";
      case "mid-term":
        return "bg-yellow-100 text-yellow-800";
      case "final":
        return "bg-red-100 text-red-800";
      case "mock-test":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "active":
        return <Timer className="h-4 w-4" />;
      case "scheduled":
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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
                  onChange={(e) =>
                    setNewTest({ ...newTest, title: e.target.value })
                  }
                  placeholder="Enter test title"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  onValueChange={(value) =>
                    setNewTest({ ...newTest, subject: value })
                  }
                >
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
                <Select
                  onValueChange={(value: any) =>
                    setNewTest({ ...newTest, type: value })
                  }
                >
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
                <Select
                  onValueChange={(value) =>
                    setNewTest({ ...newTest, teacher: value })
                  }
                >
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
                <Select
                  onValueChange={(value) =>
                    setNewTest({ ...newTest, course: value })
                  }
                >
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
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      duration: parseInt(e.target.value) || 60,
                    })
                  }
                  placeholder="Test duration"
                />
              </div>

              <div>
                <Label htmlFor="totalMarks">Total Marks (Auto-calculated)</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  value={newTest.totalMarks}
                  readOnly
                  className="bg-gray-50"
                  placeholder="Calculated from question distribution"
                />
              </div>

              <div>
                <Label htmlFor="passingMarks">Passing Marks</Label>
                <Input
                  id="passingMarks"
                  type="number"
                  value={newTest.passingMarks}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      passingMarks: parseInt(e.target.value) || 25,
                    })
                  }
                  placeholder="Minimum marks to pass"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Question Distribution by Marks</Label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div>
                    <Label htmlFor="questions1Mark" className="text-sm">1 Mark Questions</Label>
                    <Input
                      id="questions1Mark"
                      type="number"
                      min="0"
                      value={newTest.questions1Mark}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setNewTest({
                          ...newTest,
                          questions1Mark: value,
                          totalQuestions: value + newTest.questions2Mark + newTest.questions3Mark + newTest.questions4Mark,
                          totalMarks: (value * 1) + (newTest.questions2Mark * 2) + (newTest.questions3Mark * 3) + (newTest.questions4Mark * 4)
                        });
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="questions2Mark" className="text-sm">2 Mark Questions</Label>
                    <Input
                      id="questions2Mark"
                      type="number"
                      min="0"
                      value={newTest.questions2Mark}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setNewTest({
                          ...newTest,
                          questions2Mark: value,
                          totalQuestions: newTest.questions1Mark + value + newTest.questions3Mark + newTest.questions4Mark,
                          totalMarks: (newTest.questions1Mark * 1) + (value * 2) + (newTest.questions3Mark * 3) + (newTest.questions4Mark * 4)
                        });
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="questions3Mark" className="text-sm">3 Mark Questions</Label>
                    <Input
                      id="questions3Mark"
                      type="number"
                      min="0"
                      value={newTest.questions3Mark}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setNewTest({
                          ...newTest,
                          questions3Mark: value,
                          totalQuestions: newTest.questions1Mark + newTest.questions2Mark + value + newTest.questions4Mark,
                          totalMarks: (newTest.questions1Mark * 1) + (newTest.questions2Mark * 2) + (value * 3) + (newTest.questions4Mark * 4)
                        });
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="questions4Mark" className="text-sm">4 Mark Questions</Label>
                    <Input
                      id="questions4Mark"
                      type="number"
                      min="0"
                      value={newTest.questions4Mark}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setNewTest({
                          ...newTest,
                          questions4Mark: value,
                          totalQuestions: newTest.questions1Mark + newTest.questions2Mark + newTest.questions3Mark + value,
                          totalMarks: (newTest.questions1Mark * 1) + (newTest.questions2Mark * 2) + (newTest.questions3Mark * 3) + (value * 4)
                        });
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Total Questions: {newTest.totalQuestions} | Auto-calculated Total Marks: {newTest.totalMarks}
                </div>
              </div>

              <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={newTest.scheduledDate}
                  onChange={(e) =>
                    setNewTest({ ...newTest, scheduledDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="scheduledTime">Scheduled Time</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={newTest.scheduledTime}
                  onChange={(e) =>
                    setNewTest({ ...newTest, scheduledTime: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Test Description</Label>
                <Textarea
                  id="description"
                  value={newTest.description}
                  onChange={(e) =>
                    setNewTest({ ...newTest, description: e.target.value })
                  }
                  placeholder="Enter test description and instructions"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreatingTest(false)}
              >
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
                      {test.type.replace("-", " ")}
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
                    <span>
                      {test.scheduledDate} {test.scheduledTime}
                    </span>
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
                      <p className="text-2xl font-bold text-blue-600">
                        {test.studentsCompleted}
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {test.averageScore}%
                      </p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round(
                          (test.studentsCompleted / test.studentsEnrolled) *
                            100,
                        )}
                        %
                      </p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditTest(test)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedTest(test);
                    setShowQuestions(true);
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Questions ({test.totalQuestions})
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

      {/* Edit Test Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Test: {editingTest?.title}</DialogTitle>
            <DialogDescription>
              Update test information and settings
            </DialogDescription>
          </DialogHeader>
          {editingTest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="md:col-span-2">
                <Label htmlFor="edit-title">Test Title *</Label>
                <Input
                  id="edit-title"
                  value={editingTest.title}
                  onChange={(e) =>
                    setEditingTest({ ...editingTest, title: e.target.value })
                  }
                  placeholder="Enter test title"
                />
              </div>

              <div>
                <Label htmlFor="edit-subject">Subject *</Label>
                <Select
                  value={editingTest.subject}
                  onValueChange={(value) =>
                    setEditingTest({ ...editingTest, subject: value })
                  }
                >
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
                <Label htmlFor="edit-type">Test Type</Label>
                <Select
                  value={editingTest.type}
                  onValueChange={(value: any) =>
                    setEditingTest({ ...editingTest, type: value })
                  }
                >
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
                <Label htmlFor="edit-teacher">Teacher *</Label>
                <Select
                  value={editingTest.teacher}
                  onValueChange={(value) =>
                    setEditingTest({ ...editingTest, teacher: value })
                  }
                >
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
                <Label htmlFor="edit-course">Course</Label>
                <Select
                  value={editingTest.course}
                  onValueChange={(value) =>
                    setEditingTest({ ...editingTest, course: value })
                  }
                >
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
                <Label htmlFor="edit-duration">Duration (minutes)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  value={editingTest.duration}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      duration: parseInt(e.target.value) || 60,
                    })
                  }
                  placeholder="Test duration"
                />
              </div>

              <div>
                <Label htmlFor="edit-totalMarks">Total Marks</Label>
                <Input
                  id="edit-totalMarks"
                  type="number"
                  value={editingTest.totalMarks}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      totalMarks: parseInt(e.target.value) || 50,
                    })
                  }
                  placeholder="Total marks"
                />
              </div>

              <div>
                <Label htmlFor="edit-passingMarks">Passing Marks</Label>
                <Input
                  id="edit-passingMarks"
                  type="number"
                  value={editingTest.passingMarks}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      passingMarks: parseInt(e.target.value) || 25,
                    })
                  }
                  placeholder="Minimum marks to pass"
                />
              </div>

              <div>
                <Label htmlFor="edit-scheduledDate">Scheduled Date</Label>
                <Input
                  id="edit-scheduledDate"
                  type="date"
                  value={editingTest.scheduledDate}
                  onChange={(e) =>
                    setEditingTest({ ...editingTest, scheduledDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-scheduledTime">Scheduled Time</Label>
                <Input
                  id="edit-scheduledTime"
                  type="time"
                  value={editingTest.scheduledTime}
                  onChange={(e) =>
                    setEditingTest({ ...editingTest, scheduledTime: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="edit-description">Test Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTest.description}
                  onChange={(e) =>
                    setEditingTest({ ...editingTest, description: e.target.value })
                  }
                  placeholder="Enter test description and instructions"
                  rows={3}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingTest(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleUpdateTest}>
              <Save className="h-4 w-4 mr-2" />
              Update Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Questions Management Dialog */}
      <Dialog open={showQuestions} onOpenChange={setShowQuestions}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Manage Questions: {selectedTest?.title}</DialogTitle>
            <DialogDescription>
              Add and manage questions for this test
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="questions" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
              <TabsTrigger value="add-question">Add Question</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-4 h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No questions added yet</p>
                    <p className="text-sm">Switch to "Add Question" tab to start</p>
                  </div>
                ) : (
                  questions.map((question, index) => (
                    <Card key={question.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="text-xs">
                              Q{index + 1}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.marks} marks
                            </Badge>
                            <Badge
                              variant={question.difficulty === 'easy' ? 'default' :
                                       question.difficulty === 'medium' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {question.difficulty}
                            </Badge>
                          </div>
                          <p className="font-medium mb-2">{question.question}</p>

                          {question.type === 'mcq' && question.options && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded text-sm ${
                                    option === question.correctAnswer
                                      ? 'bg-green-100 border border-green-300'
                                      : 'bg-gray-50'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type !== 'mcq' && (
                            <div className="mt-2 p-2 bg-green-100 rounded text-sm">
                              <strong>Answer:</strong> {question.correctAnswer}
                            </div>
                          )}
                        </div>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="add-question" className="mt-4 h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question-text">Question *</Label>
                  <Textarea
                    id="question-text"
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, question: e.target.value })
                    }
                    placeholder="Enter your question here"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="question-type">Question Type</Label>
                    <Select
                      value={newQuestion.type}
                      onValueChange={(value: any) =>
                        setNewQuestion({ ...newQuestion, type: value, options: value === 'mcq' ? ["", "", "", ""] : undefined })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                        <SelectItem value="long-answer">Long Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="question-marks">Marks</Label>
                    <Input
                      id="question-marks"
                      type="number"
                      value={newQuestion.marks}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) || 1 })
                      }
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="question-difficulty">Difficulty</Label>
                    <Select
                      value={newQuestion.difficulty}
                      onValueChange={(value: any) =>
                        setNewQuestion({ ...newQuestion, difficulty: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newQuestion.type === 'mcq' && (
                  <div>
                    <Label>Options *</Label>
                    <div className="space-y-2 mt-2">
                      {newQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-8 text-sm font-medium">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(newQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setNewQuestion({ ...newQuestion, options: newOptions });
                            }}
                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="correct-answer">Correct Answer *</Label>
                  {newQuestion.type === 'mcq' ? (
                    <Select
                      value={newQuestion.correctAnswer}
                      onValueChange={(value) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                      <SelectContent>
                        {newQuestion.options?.map((option, index) => (
                          option && (
                            <SelectItem key={index} value={option}>
                              {String.fromCharCode(65 + index)}. {option}
                            </SelectItem>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                  ) : newQuestion.type === 'true-false' ? (
                    <Select
                      value={newQuestion.correctAnswer}
                      onValueChange={(value) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">True</SelectItem>
                        <SelectItem value="False">False</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Textarea
                      id="correct-answer"
                      value={newQuestion.correctAnswer}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                      }
                      placeholder="Enter the correct answer or answer guidelines"
                      rows={2}
                    />
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewQuestion({
                        question: "",
                        type: "mcq",
                        options: ["", "", "", ""],
                        correctAnswer: "",
                        marks: 1,
                        difficulty: "medium",
                      });
                    }}
                  >
                    Clear
                  </Button>
                  <Button onClick={handleAddQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Total Questions: {questions.length} | Total Marks: {questions.reduce((sum, q) => sum + q.marks, 0)}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setShowQuestions(false);
                setSelectedTest(null);
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
