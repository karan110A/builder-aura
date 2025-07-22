import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Heart,
  Target,
  Clock,
  CheckCircle,
  Star,
  Building,
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, value: "1000+", label: "Students Taught" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: BookOpen, value: "15+", label: "Subjects Offered" },
    { icon: Clock, value: "10+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence in Education",
      description:
        "We strive to provide the highest quality education with innovative teaching methods and personalized attention to each student.",
    },
    {
      icon: Heart,
      title: "Student-Centric Approach",
      description:
        "Every decision we make is focused on student success, ensuring their academic and personal growth in a supportive environment.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "We constantly evolve our teaching methods and curriculum to stay ahead of educational trends and exam patterns.",
    },
    {
      icon: Building,
      title: "Community Building",
      description:
        "We foster a learning community where students, teachers, and parents work together towards common academic goals.",
    },
  ];

  const achievements = [
    "Top-rated tuition center in the region for 5 consecutive years",
    "Over 95% board exam success rate",
    "500+ students qualified for JEE/NEET in the last 3 years",
    "Award for 'Best Educational Institution' by City Education Board",
    "Featured in leading educational magazines",
    "Zero dropout rate - all students complete their courses",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              About PadhaiHub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Students Since
              <span className="text-blue-600"> 2014</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded with a vision to transform education, PadhaiHub has been a
              beacon of academic excellence, helping thousands of students
              achieve their dreams through quality education and personalized
              guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-blue-600">
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {stat.label}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  PadhaiHub was founded in 2014 by a group of passionate
                  educators who believed that every student deserves access to
                  quality education. What started as a small coaching center
                  with just 20 students has now grown into one of the most
                  trusted educational institutions in the region.
                </p>
                <p>
                  Our journey began with a simple mission: to bridge the gap
                  between traditional teaching methods and modern educational
                  needs. We recognized that each student is unique and requires
                  personalized attention to reach their full potential.
                </p>
                <p>
                  Over the years, we have continuously evolved our teaching
                  methodologies, incorporated technology into our classrooms,
                  and built a team of exceptional educators who share our vision
                  of academic excellence.
                </p>
                <p>
                  Today, PadhaiHub stands as a testament to the power of
                  dedicated teaching and student-centric education, with
                  thousands of success stories and a legacy of academic
                  achievement.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Provide personalized education that caters to each student's
                    learning style
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Foster critical thinking and problem-solving abilities
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Create a supportive environment that encourages academic
                    growth
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Prepare students not just for exams, but for life
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do at PadhaiHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100">
              Milestones that mark our journey of excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start bg-white/10 rounded-lg p-6"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-800" />
                  </div>
                </div>
                <span className="text-white text-lg">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
