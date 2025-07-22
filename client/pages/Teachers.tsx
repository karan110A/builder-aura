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
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Award,
  BookOpen,
  Star,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Teachers() {
  const teachers = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      subject: "Mathematics",
      qualification: "Ph.D. in Mathematics, IIT Delhi",
      experience: "15 years",
      specialization: "JEE Advanced, Calculus, Algebra",
      rating: 4.9,
      students: 500,
      image: "/placeholder.svg",
      bio: "Expert in advanced mathematics with a passion for making complex concepts simple. Has guided 200+ students to IIT selections.",
      achievements: [
        "Former IIT Delhi faculty",
        "Author of 3 mathematics books",
        "100+ IIT selections",
      ],
    },
    {
      id: 2,
      name: "Prof. Sunita Sharma",
      subject: "Physics",
      qualification: "M.Sc. Physics, Delhi University",
      experience: "12 years",
      specialization: "Mechanics, Thermodynamics, JEE/NEET",
      rating: 4.8,
      students: 350,
      image: "/placeholder.svg",
      bio: "Renowned physics teacher known for her experimental approach and conceptual clarity. Makes physics fun and understandable.",
      achievements: [
        "Best Teacher Award 2023",
        "85% success rate in JEE",
        "Research in Quantum Physics",
      ],
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      subject: "Chemistry",
      qualification: "Ph.D. in Organic Chemistry",
      experience: "10 years",
      specialization: "Organic Chemistry, NEET, JEE",
      rating: 4.9,
      students: 400,
      image: "/placeholder.svg",
      bio: "Passionate chemistry educator with expertise in organic mechanisms. Known for his systematic teaching approach.",
      achievements: [
        "Former research scientist",
        "50+ research publications",
        "90% NEET success rate",
      ],
    },
    {
      id: 4,
      name: "Dr. Priya Nair",
      subject: "Biology",
      qualification: "Ph.D. in Botany, JNU",
      experience: "8 years",
      specialization: "NEET, Botany, Zoology",
      rating: 4.7,
      students: 250,
      image: "/placeholder.svg",
      bio: "Young and dynamic biology teacher who connects with students easily. Excellent track record in NEET preparation.",
      achievements: [
        "NEET topper mentor",
        "Innovative teaching methods",
        "Student-friendly approach",
      ],
    },
    {
      id: 5,
      name: "Prof. Vikram Singh",
      subject: "English",
      qualification: "M.A. English Literature",
      experience: "14 years",
      specialization: "Literature, Grammar, Communication",
      rating: 4.8,
      students: 300,
      image: "/placeholder.svg",
      bio: "Experienced English teacher focusing on literature appreciation and language skills development.",
      achievements: [
        "Published poet",
        "Communication skills expert",
        "Board exam specialist",
      ],
    },
    {
      id: 6,
      name: "Mr. Arjun Khanna",
      subject: "Computer Science",
      qualification: "B.Tech CSE, IIT Bombay",
      experience: "6 years",
      specialization: "Programming, DSA, Web Development",
      rating: 4.9,
      students: 200,
      image: "/placeholder.svg",
      bio: "Young tech enthusiast bringing industry experience to classroom. Expert in modern programming languages.",
      achievements: [
        "Ex-Google engineer",
        "Open source contributor",
        "Coding competition mentor",
      ],
    },
  ];

  const stats = [
    { label: "Expert Faculty", value: "20+", icon: Users },
    { label: "Combined Experience", value: "200+ Years", icon: Calendar },
    { label: "Students Taught", value: "10,000+", icon: GraduationCap },
    { label: "Success Rate", value: "95%", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Our Faculty
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our
            <span className="text-blue-600"> Expert Teachers</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from the best educators who are passionate about teaching and
            committed to your academic success. Our faculty brings years of
            experience and proven results.
          </p>
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

      {/* Teachers Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Distinguished Faculty
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Dedicated educators committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                  <CardDescription className="text-base font-semibold text-blue-600">
                    {teacher.subject}
                  </CardDescription>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {teacher.rating}
                    </span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-sm text-gray-600">
                      {teacher.students}+ students
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Qualification:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {teacher.qualification}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Experience:</h4>
                    <p className="text-sm text-gray-600">
                      {teacher.experience}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Specialization:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {teacher.specialization}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">About:</h4>
                    <p className="text-sm text-gray-600">{teacher.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {teacher.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <Award className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Teacher
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Teaching Philosophy
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At PadhaiHub, we believe that every student has the potential
                  to excel. Our teachers are not just educators but mentors who
                  guide students through their academic journey with patience,
                  expertise, and dedication.
                </p>
                <p>
                  We follow a student-centric approach where each teacher adapts
                  their methodology to suit different learning styles. Our small
                  batch sizes ensure personalized attention for every student.
                </p>
                <p>
                  Our faculty undergoes continuous training to stay updated with
                  the latest examination patterns, teaching techniques, and
                  educational technology.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What Makes Our Teachers Special
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Subject Matter Experts</h4>
                    <p className="text-gray-600 text-sm">
                      Deep knowledge and passion for their subjects
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Student-Friendly Approach</h4>
                    <p className="text-gray-600 text-sm">
                      Approachable and understanding of student needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Proven Track Record</h4>
                    <p className="text-gray-600 text-sm">
                      Consistent results and student success stories
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Always Available</h4>
                    <p className="text-gray-600 text-sm">
                      Regular doubt sessions and guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Learn from the Best
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our expert faculty and experience the difference quality
            teaching makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="h-4 w-4 mr-2" />
              Schedule a Demo Class
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Visit Our Center
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
