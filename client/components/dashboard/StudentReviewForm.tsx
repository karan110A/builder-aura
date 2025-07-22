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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Send,
  User,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  Award,
  TrendingUp,
} from "lucide-react";

interface ReviewFormData {
  subject: string;
  teacher: string;
  overallRating: number;
  teachingQuality: number;
  courseContent: number;
  supportiveness: number;
  wouldRecommend: string;
  improvements: string[];
  reviewText: string;
  anonymousReview: boolean;
}

export default function StudentReviewForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReviewFormData>({
    subject: "",
    teacher: "",
    overallRating: 0,
    teachingQuality: 0,
    courseContent: 0,
    supportiveness: 0,
    wouldRecommend: "",
    improvements: [],
    reviewText: "",
    anonymousReview: false,
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
    "Dr. Rajesh Kumar (Mathematics)",
    "Prof. Sunita Sharma (Physics)",
    "Dr. Amit Verma (Chemistry)",
    "Dr. Priya Nair (Biology)",
    "Prof. Vikram Singh (English)",
    "Mr. Arjun Khanna (Computer Science)",
  ];

  const improvementAreas = [
    "Teaching methodology",
    "Course materials",
    "Assignment quality",
    "Class interaction",
    "Doubt clearing sessions",
    "Practical sessions",
    "Test preparation",
    "Individual attention",
  ];

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {rating === 0 ? "Click to rate" : `${rating} out of 5 stars`}
        </p>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.subject || !formData.teacher || !formData.reviewText) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.overallRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide an overall rating.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review Submitted!",
      description:
        "Thank you for your feedback. Your review helps us improve our services.",
    });

    // Reset form
    setFormData({
      subject: "",
      teacher: "",
      overallRating: 0,
      teachingQuality: 0,
      courseContent: 0,
      supportiveness: 0,
      wouldRecommend: "",
      improvements: [],
      reviewText: "",
      anonymousReview: false,
    });
  };

  const handleImprovementChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      improvements: checked
        ? [...prev.improvements, area]
        : prev.improvements.filter((item) => item !== area),
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
          Student Review Form
        </CardTitle>
        <CardDescription>
          Share your experience and help us improve our teaching quality. Your
          feedback is valuable to us.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, subject: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
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
              <Label htmlFor="teacher">Teacher *</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, teacher: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your teacher" />
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
          </div>

          {/* Rating Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Award className="h-5 w-5 mr-2 text-orange-500" />
              Rate Your Experience
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StarRating
                rating={formData.overallRating}
                onRatingChange={(rating) =>
                  setFormData((prev) => ({ ...prev, overallRating: rating }))
                }
                label="Overall Experience *"
              />

              <StarRating
                rating={formData.teachingQuality}
                onRatingChange={(rating) =>
                  setFormData((prev) => ({ ...prev, teachingQuality: rating }))
                }
                label="Teaching Quality"
              />

              <StarRating
                rating={formData.courseContent}
                onRatingChange={(rating) =>
                  setFormData((prev) => ({ ...prev, courseContent: rating }))
                }
                label="Course Content"
              />

              <StarRating
                rating={formData.supportiveness}
                onRatingChange={(rating) =>
                  setFormData((prev) => ({ ...prev, supportiveness: rating }))
                }
                label="Teacher Supportiveness"
              />
            </div>
          </div>

          {/* Recommendation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
              Recommendation
            </h3>

            <div>
              <Label>Would you recommend this course to other students?</Label>
              <RadioGroup
                value={formData.wouldRecommend}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, wouldRecommend: value }))
                }
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="definitely" id="definitely" />
                  <Label htmlFor="definitely">Definitely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="probably" id="probably" />
                  <Label htmlFor="probably">Probably</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="not-sure" />
                  <Label htmlFor="not-sure">Not Sure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="probably-not" id="probably-not" />
                  <Label htmlFor="probably-not">Probably Not</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
              Areas for Improvement
            </h3>
            <p className="text-sm text-gray-600">
              Select areas where you think we can improve (optional):
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {improvementAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.improvements.includes(area)}
                    onCheckedChange={(checked) =>
                      handleImprovementChange(area, checked as boolean)
                    }
                  />
                  <Label htmlFor={area} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div className="space-y-4">
            <Label htmlFor="review">Your Review *</Label>
            <Textarea
              id="review"
              placeholder="Share your detailed experience, what you liked, what could be improved, and any suggestions you have..."
              value={formData.reviewText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, reviewText: e.target.value }))
              }
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Minimum 50 characters required. Be honest and constructive in your
              feedback.
            </p>
          </div>

          {/* Privacy Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.anonymousReview}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  anonymousReview: checked as boolean,
                }))
              }
            />
            <Label htmlFor="anonymous" className="text-sm">
              Submit this review anonymously
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  subject: "",
                  teacher: "",
                  overallRating: 0,
                  teachingQuality: 0,
                  courseContent: 0,
                  supportiveness: 0,
                  wouldRecommend: "",
                  improvements: [],
                  reviewText: "",
                  anonymousReview: false,
                })
              }
            >
              Clear Form
            </Button>
            <Button type="submit" className="flex items-center">
              <Send className="h-4 w-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
