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
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  GraduationCap,
  Award,
  Calendar,
  Save,
  X
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
  salary: number;
  status: "active" | "inactive";
  joinDate: string;
  rating: number;
  studentsCount: number;
}

export default function TeacherManagement() {
  const { toast } = useToast();
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  
  // Mock teacher data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@padhaihub.com",
      phone: "+91 98765 43210",
      subject: "Mathematics",
      qualification: "Ph.D. in Mathematics, IIT Delhi",
      experience: 15,
      salary: 75000,
      status: "active",
      joinDate: "2020-01-15",
      rating: 4.9,
      studentsCount: 120
    },
    {
      id: 2,
      name: "Prof. Sunita Sharma",
      email: "sunita.sharma@padhaihub.com",
      phone: "+91 98765 43211",
      subject: "Physics",
      qualification: "M.Sc. Physics, Delhi University",
      experience: 12,
      salary: 65000,
      status: "active",
      joinDate: "2020-03-20",
      rating: 4.8,
      studentsCount: 95
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      email: "amit.verma@padhaihub.com",
      phone: "+91 98765 43212",
      subject: "Chemistry",
      qualification: "Ph.D. in Organic Chemistry",
      experience: 10,
      salary: 70000,
      status: "active",
      joinDate: "2021-06-01",
      rating: 4.9,
      studentsCount: 110
    }
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    qualification: "",
    experience: 0,
    salary: 0
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const teacher: Teacher = {
      id: teachers.length + 1,
      ...newTeacher,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      rating: 0,
      studentsCount: 0
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      subject: "",
      qualification: "",
      experience: 0,
      salary: 0
    });
    setIsAddingTeacher(false);

    toast({
      title: "Teacher Added Successfully",
      description: `${teacher.name} has been added to the faculty.`,
    });
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
  };

  const handleUpdateTeacher = () => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t));
      setEditingTeacher(null);
      
      toast({
        title: "Teacher Updated",
        description: "Teacher information has been updated successfully.",
      });
    }
  };

  const handleDeleteTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setTeachers(teachers.filter(t => t.id !== id));
    
    toast({
      title: "Teacher Removed",
      description: `${teacher?.name} has been removed from the faculty.`,
    });
  };

  const toggleTeacherStatus = (id: number) => {
    setTeachers(teachers.map(t => 
      t.id === id ? { ...t, status: t.status === "active" ? "inactive" : "active" } : t
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Teacher Management</h2>
          <p className="text-gray-600">Manage faculty profiles and assignments</p>
        </div>
        <Button onClick={() => setIsAddingTeacher(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Teacher
        </Button>
      </div>

      {/* Add Teacher Form */}
      {isAddingTeacher && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Teacher</CardTitle>
            <CardDescription>Enter teacher details to add them to the faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select onValueChange={(value) => setNewTeacher({...newTeacher, subject: value})}>
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
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={newTeacher.experience}
                  onChange={(e) => setNewTeacher({...newTeacher, experience: parseInt(e.target.value) || 0})}
                  placeholder="Years of experience"
                />
              </div>
              <div>
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={newTeacher.salary}
                  onChange={(e) => setNewTeacher({...newTeacher, salary: parseInt(e.target.value) || 0})}
                  placeholder="Monthly salary"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Textarea
                  id="qualification"
                  value={newTeacher.qualification}
                  onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                  placeholder="Enter educational qualifications"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddingTeacher(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleAddTeacher}>
                <Save className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teachers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {teacher.subject}
                  </CardDescription>
                </div>
                <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                  {teacher.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{teacher.experience} years experience</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Joined {teacher.joinDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{teacher.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{teacher.studentsCount}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Qualification:</p>
                <p className="text-xs text-gray-500 line-clamp-2">{teacher.qualification}</p>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button size="sm" variant="outline" onClick={() => handleEditTeacher(teacher)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleTeacherStatus(teacher.id)}
                >
                  {teacher.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeleteTeacher(teacher.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Teacher Modal would go here - simplified for now */}
      {editingTeacher && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl">
          <CardHeader>
            <CardTitle>Edit Teacher: {editingTeacher.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingTeacher(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTeacher}>
                Update Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
