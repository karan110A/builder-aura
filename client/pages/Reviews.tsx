import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StudentReviewForm from "@/components/dashboard/StudentReviewForm";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  User, 
  Filter,
  TrendingUp,
  Award,
  BookOpen,
  Calendar
} from "lucide-react";

export default function Reviews() {
  const [filter, setFilter] = useState("all");

  // Mock existing reviews data
  const existingReviews = [
    {
      id: 1,
      student: "Arjun P.",
      subject: "Mathematics",
      teacher: "Dr. Rajesh Kumar",
      overallRating: 5,
      teachingQuality: 5,
      courseContent: 4,
      supportiveness: 5,
      wouldRecommend: "definitely",
      reviewText: "Absolutely excellent teaching! Dr. Kumar explains complex calculus concepts in such a simple way. His problem-solving techniques have helped me improve tremendously. The doubt clearing sessions are very helpful.",
      date: "2024-01-10",
      anonymous: false,
      verified: true,
    },
    {
      id: 2,
      student: "Anonymous",
      subject: "Physics",
      teacher: "Prof. Sunita Sharma",
      overallRating: 4,
      teachingQuality: 5,
      courseContent: 4,
      supportiveness: 4,
      wouldRecommend: "definitely",
      reviewText: "Great physics teacher with excellent practical knowledge. The lab sessions are very well organized. Sometimes the pace is a bit fast, but overall a fantastic learning experience.",
      date: "2024-01-08",
      anonymous: true,
      verified: true,
    },
    {
      id: 3,
      student: "Priya S.",
      subject: "Chemistry",
      teacher: "Dr. Amit Verma",
      overallRating: 5,
      teachingQuality: 5,
      courseContent: 5,
      supportiveness: 4,
      wouldRecommend: "definitely",
      reviewText: "Dr. Verma makes organic chemistry so interesting! His systematic approach and mnemonics help a lot. The practice problems are challenging but very helpful for JEE preparation.",
      date: "2024-01-05",
      anonymous: false,
      verified: true,
    },
    {
      id: 4,
      student: "Rahul M.",
      subject: "Biology",
      teacher: "Dr. Priya Nair",
      overallRating: 4,
      teachingQuality: 4,
      courseContent: 5,
      supportiveness: 5,
      wouldRecommend: "probably",
      reviewText: "Very knowledgeable teacher with great depth in botany and zoology. The diagrams and visual aids are excellent. Would love more NEET-focused practice sessions.",
      date: "2024-01-03",
      anonymous: false,
      verified: true,
    },
  ];

  const stats = [
    { label: "Total Reviews", value: "247", icon: MessageSquare },
    { label: "Average Rating", value: "4.7", icon: Star },
    { label: "Recommend Rate", value: "94%", icon: ThumbsUp },
    { label: "Verified Reviews", value: "89%", icon: Award },
  ];

  const subjectFilters = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];

  const filteredReviews = filter === "all" 
    ? existingReviews 
    : existingReviews.filter(review => review.subject === filter);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "definitely":
        return "bg-green-100 text-green-800";
      case "probably":
        return "bg-blue-100 text-blue-800";
      case "not-sure":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Student Reviews
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Voice
            <span className="text-blue-600"> Matters</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your experience and read what other students have to say about 
            our courses and teachers. Your feedback helps us continuously improve.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit" className="text-lg">Submit Review</TabsTrigger>
            <TabsTrigger value="browse" className="text-lg">Browse Reviews</TabsTrigger>
          </TabsList>

          {/* Submit Review Tab */}
          <TabsContent value="submit">
            <StudentReviewForm />
          </TabsContent>

          {/* Browse Reviews Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filter Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {subjectFilters.map((subject) => (
                    <Button
                      key={subject}
                      variant={filter === subject ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(subject)}
                    >
                      {subject === "all" ? "All Subjects" : subject}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {review.student}
                              {review.verified && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{review.subject}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{review.teacher}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(review.overallRating)}
                          <span className="font-bold">{review.overallRating}/5</span>
                        </div>
                        <Badge className={getRecommendationColor(review.wouldRecommend)}>
                          {review.wouldRecommend === "definitely" ? "Highly Recommends" :
                           review.wouldRecommend === "probably" ? "Recommends" :
                           review.wouldRecommend === "not-sure" ? "Unsure" : "Not Recommended"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      "{review.reviewText}"
                    </p>
                    
                    {/* Detailed Ratings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Teaching Quality:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.teachingQuality)}
                          <span className="text-sm font-medium">{review.teachingQuality}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Course Content:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.courseContent)}
                          <span className="text-sm font-medium">{review.courseContent}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Supportiveness:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.supportiveness)}
                          <span className="text-sm font-medium">{review.supportiveness}/5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No reviews found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No reviews available for the selected filter. Try selecting a different subject.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
