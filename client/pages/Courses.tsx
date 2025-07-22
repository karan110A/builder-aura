import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Atom, 
  TestTube, 
  Dna, 
  BookOpen, 
  Monitor,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Target,
  Calendar,
  Award
} from "lucide-react";

export default function Courses() {
  const courses = {
    academic: [
      {
        id: "math",
        icon: Calculator,
        title: "Mathematics",
        description: "Comprehensive math coaching for all boards and competitive exams",
        duration: "12 months",
        batchSize: "15 students",
        rating: 4.9,
        students: 500,
        price: "₹8,000/month",
        features: [
          "Algebra, Calculus, Trigonometry",
          "Problem-solving techniques",
          "Regular mock tests",
          "Doubt clearing sessions"
        ],
        suitable: ["Class 9-12", "JEE Main & Advanced", "Board Exams"]
      },
      {
        id: "physics",
        icon: Atom,
        title: "Physics",
        description: "Master physics concepts with practical approach and problem solving",
        duration: "12 months",
        batchSize: "12 students",
        rating: 4.8,
        students: 350,
        price: "₹7,500/month",
        features: [
          "Mechanics, Thermodynamics, Optics",
          "Laboratory experiments",
          "Conceptual clarity",
          "JEE/NEET focused teaching"
        ],
        suitable: ["Class 11-12", "JEE Main & Advanced", "NEET"]
      },
      {
        id: "chemistry",
        icon: TestTube,
        title: "Chemistry",
        description: "Organic, Inorganic, and Physical chemistry made simple",
        duration: "12 months",
        batchSize: "15 students",
        rating: 4.9,
        students: 400,
        price: "₹7,500/month",
        features: [
          "Organic reaction mechanisms",
          "Inorganic compound properties",
          "Physical chemistry calculations",
          "Regular practicals"
        ],
        suitable: ["Class 11-12", "JEE Main & Advanced", "NEET"]
      },
      {
        id: "biology",
        icon: Dna,
        title: "Biology",
        description: "Complete biology coverage for NEET and board exams",
        duration: "12 months",
        batchSize: "20 students",
        rating: 4.7,
        students: 250,
        price: "₹6,500/month",
        features: [
          "Botany and Zoology",
          "NCERT based teaching",
          "Diagram practice",
          "NEET specific preparation"
        ],
        suitable: ["Class 11-12", "NEET", "Board Exams"]
      },
      {
        id: "english",
        icon: BookOpen,
        title: "English",
        description: "Improve language skills, literature, and communication",
        duration: "10 months",
        batchSize: "18 students",
        rating: 4.8,
        students: 300,
        price: "₹5,000/month",
        features: [
          "Grammar and vocabulary",
          "Literature analysis",
          "Writing skills",
          "Speaking confidence"
        ],
        suitable: ["Class 9-12", "Board Exams", "Communication Skills"]
      },
      {
        id: "computer",
        icon: Monitor,
        title: "Computer Science",
        description: "Programming, algorithms, and computer science fundamentals",
        duration: "12 months",
        batchSize: "12 students",
        rating: 4.9,
        students: 200,
        price: "₹9,000/month",
        features: [
          "Python, C++, Java programming",
          "Data structures and algorithms",
          "Web development basics",
          "Project-based learning"
        ],
        suitable: ["Class 11-12", "Board Exams", "Competitive Programming"]
      }
    ],
    competitive: [
      {
        id: "jee",
        icon: Target,
        title: "JEE Main & Advanced",
        description: "Complete preparation for India's toughest engineering entrance",
        duration: "24 months",
        batchSize: "25 students",
        rating: 4.9,
        students: 300,
        price: "₹15,000/month",
        features: [
          "Physics, Chemistry, Mathematics",
          "Previous year papers",
          "Mock tests and analysis",
          "Rank improvement strategies"
        ],
        suitable: ["Class 11-12", "Droppers", "Repeaters"]
      },
      {
        id: "neet",
        icon: Award,
        title: "NEET",
        description: "Medical entrance exam preparation with expert guidance",
        duration: "24 months",
        batchSize: "30 students",
        rating: 4.8,
        students: 400,
        price: "₹12,000/month",
        features: [
          "Physics, Chemistry, Biology",
          "NCERT mastery",
          "Medical exam strategies",
          "All India test series"
        ],
        suitable: ["Class 11-12", "Droppers", "Repeaters"]
      }
    ]
  };

  const timings = [
    { batch: "Morning Batch", time: "6:00 AM - 9:00 AM", suitable: "School students" },
    { batch: "Day Batch", time: "10:00 AM - 1:00 PM", suitable: "Droppers/Gap year" },
    { batch: "Evening Batch", time: "4:00 PM - 7:00 PM", suitable: "School students" },
    { batch: "Night Batch", time: "7:30 PM - 10:30 PM", suitable: "Working professionals" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Our Courses
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Comprehensive Learning
            <span className="text-blue-600"> Programs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide range of courses designed to help you excel in 
            academic subjects and competitive exams with expert guidance.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="academic" className="text-lg">Academic Subjects</TabsTrigger>
              <TabsTrigger value="competitive" className="text-lg">Competitive Exams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.academic.map((course, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <course.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-base">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.batchSize}
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-blue-600">
                        {course.price}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Course Features:</h4>
                        {course.features.map((feature, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Suitable for:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.suitable.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full" asChild>
                        <Link to="/contact">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="competitive">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {courses.competitive.map((course, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <course.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-base">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.batchSize}
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-green-600">
                        {course.price}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Course Features:</h4>
                        {course.features.map((feature, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Suitable for:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.suitable.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full" asChild>
                        <Link to="/contact">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Timings Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible Batch Timings
            </h2>
            <p className="text-xl text-gray-600">
              Choose the timing that works best for your schedule
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timings.map((timing, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{timing.batch}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    {timing.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Perfect for {timing.suitable}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our expert-led courses and accelerate your academic journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/teachers">Meet Our Teachers</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
