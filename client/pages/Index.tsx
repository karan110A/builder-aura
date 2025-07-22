import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert Faculty",
      description: "Learn from experienced teachers with proven track records",
    },
    {
      icon: Users,
      title: "Small Batches",
      description: "Personalized attention with limited students per class",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "Morning and evening batches to suit your schedule",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "95% of our students achieve their target scores",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Focused preparation for boards, competitive exams",
    },
    {
      icon: Brain,
      title: "Modern Teaching",
      description: "Interactive lessons with digital tools and resources",
    },
  ];

  const subjects = [
    { name: "Mathematics", students: "500+", rating: 4.9 },
    { name: "Physics", students: "350+", rating: 4.8 },
    { name: "Chemistry", students: "400+", rating: 4.9 },
    { name: "Biology", students: "250+", rating: 4.7 },
    { name: "English", students: "300+", rating: 4.8 },
    { name: "Computer Science", students: "200+", rating: 4.9 },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      class: "Class 12, PCM",
      content:
        "PadhaiHub helped me score 96% in boards. The teachers are amazing!",
      rating: 5,
    },
    {
      name: "Arjun Patel",
      class: "JEE Aspirant",
      content:
        "Got selected in IIT Delhi thanks to the excellent coaching here.",
      rating: 5,
    },
    {
      name: "Sneha Gupta",
      class: "NEET Aspirant",
      content:
        "The biology faculty is outstanding. Highly recommend PadhaiHub!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                #1 Tuition Center in the City
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Excel in Your
                <span className="text-blue-600"> Academic Journey</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join PadhaiHub and unlock your potential with expert guidance,
                personalized learning, and proven teaching methods that
                guarantee success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Start Learning Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/courses">View Courses</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students Taught</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center mb-6">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white">Quality Education</h3>
                    <p className="text-gray-600 dark:text-gray-300">Trusted by thousands</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="dark:text-gray-200">Experienced Faculty</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="dark:text-gray-200">Small Batch Sizes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="dark:text-gray-200">Regular Assessments</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="dark:text-gray-200">Doubt Clearing Sessions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PadhaiHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive learning solutions designed to help
              students achieve their academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Subjects
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive coaching for all major subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">
                        {subject.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription>
                    {subject.students} students enrolled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Success stories from our proud students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.class}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful students. Enroll now and transform your
            academic future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
