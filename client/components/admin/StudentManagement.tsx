import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  UserPlus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Calendar as CalendarIcon,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  User,
  Users,
  BookOpen,
  CreditCard,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  class: string;
  subjects: string[];
  joiningDate: Date;
  feeStatus: "paid" | "pending" | "overdue";
  totalFees: number;
  paidFees: number;
  status: "active" | "inactive" | "graduated";
  avatar?: string;
}

interface NewStudentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  class: string;
  subjects: string[];
  joiningDate?: Date;
}

export default function StudentManagement() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      firstName: "Arjun",
      lastName: "Sharma",
      email: "arjun.sharma@email.com",
      phone: "+91 9876543210",
      dateOfBirth: new Date("2006-05-15"),
      address: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      parentName: "Rajesh Sharma",
      parentPhone: "+91 9876543211",
      parentEmail: "rajesh.sharma@email.com",
      class: "Class 12 - PCM",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      joiningDate: new Date("2023-06-01"),
      feeStatus: "paid",
      totalFees: 50000,
      paidFees: 50000,
      status: "active",
    },
    {
      id: "2",
      firstName: "Priya",
      lastName: "Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543212",
      dateOfBirth: new Date("2007-03-22"),
      address: "456 Ring Road",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
      parentName: "Amit Patel",
      parentPhone: "+91 9876543213",
      parentEmail: "amit.patel@email.com",
      class: "Class 11 - PCB",
      subjects: ["Physics", "Chemistry", "Biology"],
      joiningDate: new Date("2023-04-15"),
      feeStatus: "pending",
      totalFees: 45000,
      paidFees: 30000,
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const [newStudent, setNewStudent] = useState<NewStudentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    class: "",
    subjects: [],
  });

  const [dobDate, setDobDate] = useState<Date>();
  const [joiningDate, setJoiningDate] = useState<Date>();
  const [editDobDate, setEditDobDate] = useState<Date>();
  const [editJoiningDate, setEditJoiningDate] = useState<Date>();

  const classes = [
    "Class 8", "Class 9", "Class 10",
    "Class 11 - PCM", "Class 11 - PCB", "Class 11 - Commerce",
    "Class 12 - PCM", "Class 12 - PCB", "Class 12 - Commerce"
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "English", "Hindi", "History", "Geography",
    "Economics", "Accountancy", "Business Studies"
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      dateOfBirth: dobDate || new Date(),
      joiningDate: joiningDate || new Date(),
      feeStatus: "pending",
      totalFees: 45000,
      paidFees: 0,
      status: "active",
    };

    setStudents([...students, student]);
    setNewStudent({
      firstName: "", lastName: "", email: "", phone: "", address: "",
      city: "", state: "", pincode: "", parentName: "", parentPhone: "",
      parentEmail: "", class: "", subjects: [],
    });
    setDobDate(undefined);
    setJoiningDate(undefined);
    setIsAddDialogOpen(false);

    toast({
      title: "Student Added",
      description: `${student.firstName} ${student.lastName} has been added successfully.`,
    });
  };

  const handleEditStudent = (student: Student) => {
    setEditStudent(student);
    setEditDobDate(student.dateOfBirth);
    setEditJoiningDate(student.joiningDate);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!editStudent) return;

    const updatedStudent: Student = {
      ...editStudent,
      dateOfBirth: editDobDate || editStudent.dateOfBirth,
      joiningDate: editJoiningDate || editStudent.joiningDate,
    };

    setStudents(students.map(s => s.id === editStudent.id ? updatedStudent : s));
    setIsEditDialogOpen(false);
    setEditStudent(null);
    setEditDobDate(undefined);
    setEditJoiningDate(undefined);

    toast({
      title: "Student Updated",
      description: `${updatedStudent.firstName} ${updatedStudent.lastName} has been updated successfully.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student Removed",
      description: "Student has been removed from the system.",
    });
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "graduated": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-gray-600">Manage student data and enrollments</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter student details and enrollment information
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      placeholder="student@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dobDate ? format(dobDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dobDate} onSelect={setDobDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={newStudent.address}
                      onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newStudent.city}
                        onChange={(e) => setNewStudent({...newStudent, city: e.target.value})}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={newStudent.state}
                        onChange={(e) => setNewStudent({...newStudent, state: e.target.value})}
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={newStudent.pincode}
                        onChange={(e) => setNewStudent({...newStudent, pincode: e.target.value})}
                        placeholder="000000"
                      />
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian & Academic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Parent/Guardian Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input
                      id="parentName"
                      value={newStudent.parentName}
                      onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                      placeholder="Enter parent name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent Phone</Label>
                    <Input
                      id="parentPhone"
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Parent Email</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={newStudent.parentEmail}
                      onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                      placeholder="parent@email.com"
                    />
                  </div>

                  <h3 className="font-semibold text-lg pt-4">Academic Information</h3>

                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select value={newStudent.class} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Subjects</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                      {subjects.map((subject) => (
                        <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStudent.subjects.includes(subject)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewStudent({
                                  ...newStudent,
                                  subjects: [...newStudent.subjects, subject]
                                });
                              } else {
                                setNewStudent({
                                  ...newStudent,
                                  subjects: newStudent.subjects.filter(s => s !== subject)
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Joining Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {joiningDate ? format(joiningDate, "PPP") : "Pick joining date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={joiningDate} onSelect={setJoiningDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Student Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogDescription>
                  Update student details and information
                </DialogDescription>
              </DialogHeader>
              {editStudent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="editFirstName">First Name *</Label>
                        <Input
                          id="editFirstName"
                          value={editStudent.firstName}
                          onChange={(e) => setEditStudent({...editStudent, firstName: e.target.value})}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editLastName">Last Name *</Label>
                        <Input
                          id="editLastName"
                          value={editStudent.lastName}
                          onChange={(e) => setEditStudent({...editStudent, lastName: e.target.value})}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editEmail">Email Address *</Label>
                      <Input
                        id="editEmail"
                        type="email"
                        value={editStudent.email}
                        onChange={(e) => setEditStudent({...editStudent, email: e.target.value})}
                        placeholder="student@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editPhone">Phone Number</Label>
                      <Input
                        id="editPhone"
                        value={editStudent.phone}
                        onChange={(e) => setEditStudent({...editStudent, phone: e.target.value})}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editDobDate ? format(editDobDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={editDobDate} onSelect={setEditDobDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editAddress">Address</Label>
                      <Textarea
                        id="editAddress"
                        value={editStudent.address}
                        onChange={(e) => setEditStudent({...editStudent, address: e.target.value})}
                        placeholder="Enter complete address"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="editCity">City</Label>
                        <Input
                          id="editCity"
                          value={editStudent.city}
                          onChange={(e) => setEditStudent({...editStudent, city: e.target.value})}
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editState">State</Label>
                        <Input
                          id="editState"
                          value={editStudent.state}
                          onChange={(e) => setEditStudent({...editStudent, state: e.target.value})}
                          placeholder="State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editPincode">Pincode</Label>
                        <Input
                          id="editPincode"
                          value={editStudent.pincode}
                          onChange={(e) => setEditStudent({...editStudent, pincode: e.target.value})}
                          placeholder="000000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent/Guardian & Academic Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Parent/Guardian Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="editParentName">Parent/Guardian Name</Label>
                      <Input
                        id="editParentName"
                        value={editStudent.parentName}
                        onChange={(e) => setEditStudent({...editStudent, parentName: e.target.value})}
                        placeholder="Enter parent name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editParentPhone">Parent Phone</Label>
                      <Input
                        id="editParentPhone"
                        value={editStudent.parentPhone}
                        onChange={(e) => setEditStudent({...editStudent, parentPhone: e.target.value})}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editParentEmail">Parent Email</Label>
                      <Input
                        id="editParentEmail"
                        type="email"
                        value={editStudent.parentEmail}
                        onChange={(e) => setEditStudent({...editStudent, parentEmail: e.target.value})}
                        placeholder="parent@email.com"
                      />
                    </div>

                    <h3 className="font-semibold text-lg pt-4">Academic Information</h3>

                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select value={editStudent.class} onValueChange={(value) => setEditStudent({...editStudent, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Subjects</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                        {subjects.map((subject) => (
                          <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editStudent.subjects.includes(subject)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditStudent({
                                    ...editStudent,
                                    subjects: [...editStudent.subjects, subject]
                                  });
                                } else {
                                  setEditStudent({
                                    ...editStudent,
                                    subjects: editStudent.subjects.filter(s => s !== subject)
                                  });
                                }
                              }}
                              className="rounded"
                            />
                            <span className="text-sm">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Joining Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editJoiningDate ? format(editJoiningDate, "PPP") : "Pick joining date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={editJoiningDate} onSelect={setEditJoiningDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={editStudent.status} onValueChange={(value: "active" | "inactive" | "graduated") => setEditStudent({...editStudent, status: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="graduated">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fee Status</Label>
                      <Select value={editStudent.feeStatus} onValueChange={(value: "paid" | "pending" | "overdue") => setEditStudent({...editStudent, feeStatus: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="editTotalFees">Total Fees</Label>
                        <Input
                          id="editTotalFees"
                          type="number"
                          value={editStudent.totalFees}
                          onChange={(e) => setEditStudent({...editStudent, totalFees: parseInt(e.target.value) || 0})}
                          placeholder="45000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editPaidFees">Paid Fees</Label>
                        <Input
                          id="editPaidFees"
                          type="number"
                          value={editStudent.paidFees}
                          onChange={(e) => setEditStudent({...editStudent, paidFees: parseInt(e.target.value) || 0})}
                          placeholder="30000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateStudent}>Update Student</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {student.firstName} {student.lastName}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {student.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {student.phone}
                      </span>
                      <span className="flex items-center">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {student.class}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex space-x-2 mb-2">
                      <Badge className={getFeeStatusColor(student.feeStatus)}>
                        {student.feeStatus}
                      </Badge>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Fees: ₹{student.paidFees.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Detail View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                    <p><strong>Date of Birth:</strong> {format(selectedStudent.dateOfBirth, "PPP")}</p>
                    <p><strong>Address:</strong> {selectedStudent.address}, {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Academic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Class:</strong> {selectedStudent.class}</p>
                    <p><strong>Subjects:</strong> {selectedStudent.subjects.join(", ")}</p>
                    <p><strong>Joining Date:</strong> {format(selectedStudent.joiningDate, "PPP")}</p>
                    <div className="flex items-center">
                      <strong>Status:</strong>
                      <Badge className={`ml-2 ${getStatusColor(selectedStudent.status)}`}>
                        {selectedStudent.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Parent/Guardian Information</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <p><strong>Name:</strong> {selectedStudent.parentName}</p>
                  <p><strong>Phone:</strong> {selectedStudent.parentPhone}</p>
                  <p><strong>Email:</strong> {selectedStudent.parentEmail}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Fee Information</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <p><strong>Total Fees:</strong> ₹{selectedStudent.totalFees.toLocaleString()}</p>
                  <p><strong>Paid Fees:</strong> ₹{selectedStudent.paidFees.toLocaleString()}</p>
                  <p><strong>Status:</strong> 
                    <Badge className={`ml-2 ${getFeeStatusColor(selectedStudent.feeStatus)}`}>
                      {selectedStudent.feeStatus}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
