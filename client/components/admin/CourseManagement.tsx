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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Save,
  X,
  Star,
  TrendingUp,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  subject: string;
  description: string;
  teacher: string;
  duration: string;
  price: number;
  maxStudents: number;
  enrolledStudents: number;
  startDate: string;
  endDate: string;
  schedule: string;
  status: "active" | "inactive" | "upcoming";
  rating: number;
  level: "beginner" | "intermediate" | "advanced";
}

export default function CourseManagement() {
  const { toast } = useToast();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Mock course data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced Mathematics for JEE",
      subject: "Mathematics",
      description:
        "Comprehensive mathematics course covering all JEE topics with problem-solving techniques.",
      teacher: "Dr. Rajesh Kumar",
      duration: "12 months",
      price: 15000,
      maxStudents: 30,
      enrolledStudents: 28,
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      status: "active",
      rating: 4.9,
      level: "advanced",
    },
    {
      id: 2,
      title: "Physics for NEET Preparation",
      subject: "Physics",
      description:
        "Complete physics preparation for NEET with extensive practice sessions.",
      teacher: "Prof. Sunita Sharma",
      duration: "10 months",
      price: 12000,
      maxStudents: 25,
      enrolledStudents: 22,
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      schedule: "Tue, Thu, Sat - 2:00 PM",
      status: "active",
      rating: 4.8,
      level: "intermediate",
    },
    {
      id: 3,
      title: "Organic Chemistry Mastery",
      subject: "Chemistry",
      description:
        "Deep dive into organic chemistry with reaction mechanisms and problem solving.",
      teacher: "Dr. Amit Verma",
      duration: "8 months",
      price: 10000,
      maxStudents: 20,
      enrolledStudents: 18,
      startDate: "2024-03-01",
      endDate: "2024-10-31",
      schedule: "Mon, Wed - 4:00 PM",
      status: "active",
      rating: 4.9,
      level: "advanced",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    subject: "",
    description: "",
    teacher: "",
    duration: "",
    price: 0,
    maxStudents: 0,
    startDate: "",
    endDate: "",
    schedule: "",
    level: "beginner" as const,
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
  const levels = ["beginner", "intermediate", "advanced"];

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.subject || !newCourse.teacher) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const course: Course = {
      id: courses.length + 1,
      ...newCourse,
      enrolledStudents: 0,
      status: "upcoming",
      rating: 0,
    };

    setCourses([...courses, course]);
    setNewCourse({
      title: "",
      subject: "",
      description: "",
      teacher: "",
      duration: "",
      price: 0,
      maxStudents: 0,
      startDate: "",
      endDate: "",
      schedule: "",
      level: "beginner",
    });
    setIsAddingCourse(false);

    toast({
      title: "Course Created Successfully",
      description: `${course.title} has been added to the course catalog.`,
    });
  };

  const handleDeleteCourse = (id: number) => {
    const course = courses.find((c) => c.id === id);
    setCourses(courses.filter((c) => c.id !== id));

    toast({
      title: "Course Deleted",
      description: `${course?.title} has been removed from the catalog.`,
    });
  };

  const toggleCourseStatus = (id: number) => {
    setCourses(
      courses.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "active" ? "inactive" : "active",
            }
          : c,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-gray-600">Create and manage course offerings</p>
        </div>
        <Button onClick={() => setIsAddingCourse(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Add Course Form */}
      {isAddingCourse && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>
              Enter course details to add it to the catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, subject: value })
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
                <Label htmlFor="teacher">Assigned Teacher *</Label>
                <Select
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, teacher: value })
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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, duration: e.target.value })
                  }
                  placeholder="e.g., 12 months, 6 weeks"
                />
              </div>

              <div>
                <Label htmlFor="level">Level</Label>
                <Select
                  onValueChange={(value: any) =>
                    setNewCourse({ ...newCourse, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Course price"
                />
              </div>

              <div>
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={newCourse.maxStudents}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      maxStudents: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Maximum enrollment"
                />
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCourse.startDate}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, startDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCourse.endDate}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, endDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={newCourse.schedule}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, schedule: e.target.value })
                  }
                  placeholder="e.g., Mon, Wed, Fri - 10:00 AM"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Enter detailed course description"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsAddingCourse(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>
                <Save className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.subject}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span>₹{course.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.startDate}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Enrollment Progress
                  </span>
                  <span className="text-sm text-gray-600">
                    {course.enrolledStudents}/{course.maxStudents}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(course.enrolledStudents / course.maxStudents) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Schedule:</p>
                <p className="text-sm font-medium">{course.schedule}</p>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleCourseStatus(course.id)}
                >
                  {course.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteCourse(course.id)}
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
