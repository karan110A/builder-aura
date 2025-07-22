import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Download,
  Upload,
  CreditCard,
  Zap,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Join Live Class",
      description: "Join your current ongoing class",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Join class"),
    },
    {
      title: "Submit Assignment",
      description: "Upload your completed assignments",
      icon: Upload,
      color: "bg-green-500 hover:bg-green-600",
      action: () => console.log("Submit assignment"),
    },
    {
      title: "Download Materials",
      description: "Access study materials and notes",
      icon: Download,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => console.log("Download materials"),
    },
    {
      title: "Schedule Doubt Session",
      description: "Book a one-on-one doubt clearing session",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => console.log("Schedule session"),
    },
    {
      title: "Ask Question",
      description: "Get help from teachers and peers",
      icon: MessageSquare,
      color: "bg-indigo-500 hover:bg-indigo-600",
      action: () => console.log("Ask question"),
    },
    {
      title: "View Fee Status",
      description: "Check payment status and dues",
      icon: CreditCard,
      color: "bg-red-500 hover:bg-red-600",
      action: () => console.log("View fees"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex flex-col items-start text-left hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <div className="flex items-center w-full mb-2">
                <div
                  className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center mr-3`}
                >
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-sm">{action.title}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
