import React, { useState, useCallback } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Flag,
  BookOpen,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  GripVertical,
  Trash2,
  Edit,
  CheckCircle2,
  Circle,
  AlertCircle,
  Star,
} from "lucide-react";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  category:
    | "math"
    | "science"
    | "english"
    | "history"
    | "art"
    | "music"
    | "general";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  tags: string[];
  estimatedTime?: number; // in minutes
}

interface TodoListProps {
  className?: string;
}

const categoryIcons = {
  math: Calculator,
  science: Beaker,
  english: BookOpen,
  history: Globe,
  art: Palette,
  music: Music,
  general: Circle,
};

const categoryColors = {
  math: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  science: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  english:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  history: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  art: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  music:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  general: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
};

const priorityIcons = {
  low: Circle,
  medium: Clock,
  high: AlertCircle,
  urgent: Flag,
};

export default function TodoList({ className }: TodoListProps) {
  const { toast } = useToast();
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "1",
      title: "Complete Calculus Assignment",
      description: "Solve problems 1-15 from Chapter 7",
      category: "math",
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(),
      tags: ["homework", "calculus"],
      estimatedTime: 120,
    },
    {
      id: "2",
      title: "Physics Lab Report",
      description: "Write lab report on pendulum experiment",
      category: "science",
      priority: "medium",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(),
      tags: ["lab", "report"],
      estimatedTime: 90,
    },
    {
      id: "3",
      title: "Read Shakespeare",
      description: "Read Act 3 of Hamlet",
      category: "english",
      priority: "low",
      completed: true,
      createdAt: new Date(),
      tags: ["reading", "literature"],
      estimatedTime: 60,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "created">(
    "dueDate",
  );
  const [draggedItem, setDraggedItem] = useState<TodoItem | null>(null);

  const [newTodo, setNewTodo] = useState<Partial<TodoItem>>({
    title: "",
    description: "",
    category: "general",
    priority: "medium",
    tags: [],
    estimatedTime: 60,
  });

  const [selectedDate, setSelectedDate] = useState<Date>();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    if (sortBy === "priority") {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const addTodo = useCallback(() => {
    if (!newTodo.title?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }

    const todo: TodoItem = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description || "",
      category: newTodo.category as TodoItem["category"],
      priority: newTodo.priority as TodoItem["priority"],
      dueDate: selectedDate,
      completed: false,
      createdAt: new Date(),
      tags: newTodo.tags || [],
      estimatedTime: newTodo.estimatedTime || 60,
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo({
      title: "",
      description: "",
      category: "general",
      priority: "medium",
      tags: [],
      estimatedTime: 60,
    });
    setSelectedDate(undefined);
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Task added successfully!",
    });
  }, [newTodo, selectedDate, toast]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast({
        title: "Task Deleted",
        description: "Task has been removed from your list",
      });
    },
    [toast],
  );

  const handleDragStart = (e: React.DragEvent, todo: TodoItem) => {
    setDraggedItem(todo);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetTodo: TodoItem) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetTodo.id) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = todos.findIndex((todo) => todo.id === draggedItem.id);
    const targetIndex = todos.findIndex((todo) => todo.id === targetTodo.id);

    const newTodos = [...todos];
    const [removed] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(targetIndex, 0, removed);

    setTodos(newTodos);
    setDraggedItem(null);
  };

  const getDaysUntilDue = (dueDate?: Date) => {
    if (!dueDate) return null;
    const days = Math.ceil(
      (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return days;
  };

  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              Smart To-Do List
            </CardTitle>
            <CardDescription>
              {pendingCount} pending • {completedCount} completed
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task with details and organization
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title..."
                    value={newTodo.title || ""}
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details..."
                    value={newTodo.description || ""}
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newTodo.category}
                      onValueChange={(value) =>
                        setNewTodo({
                          ...newTodo,
                          category: value as TodoItem["category"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value) =>
                        setNewTodo({
                          ...newTodo,
                          priority: value as TodoItem["priority"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedTime">Time (minutes)</Label>
                    <Input
                      id="estimatedTime"
                      type="number"
                      min="5"
                      max="480"
                      value={newTodo.estimatedTime || 60}
                      onChange={(e) =>
                        setNewTodo({
                          ...newTodo,
                          estimatedTime: parseInt(e.target.value) || 60,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addTodo}>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Select
            value={filter}
            onValueChange={(value: any) => setFilter(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tasks found. Add your first task to get started!</p>
            </div>
          ) : (
            sortedTodos.map((todo) => {
              const CategoryIcon = categoryIcons[todo.category];
              const PriorityIcon = priorityIcons[todo.priority];
              const daysUntilDue = getDaysUntilDue(todo.dueDate);

              return (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, todo)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, todo)}
                  className={`group border rounded-lg p-4 transition-all hover:shadow-md cursor-move ${
                    todo.completed
                      ? "bg-gray-50 dark:bg-gray-800 opacity-75"
                      : "bg-white dark:bg-gray-900"
                  } ${draggedItem?.id === todo.id ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4
                          className={`font-medium ${todo.completed ? "line-through text-gray-500" : ""}`}
                        >
                          {todo.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${categoryColors[todo.category]}`}
                          >
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {todo.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${priorityColors[todo.priority]}`}
                          >
                            <PriorityIcon className="h-3 w-3 mr-1" />
                            {todo.priority}
                          </Badge>
                        </div>
                      </div>

                      {todo.description && (
                        <p
                          className={`text-sm text-gray-600 dark:text-gray-400 mb-2 ${
                            todo.completed ? "line-through" : ""
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          {todo.dueDate && (
                            <div
                              className={`flex items-center space-x-1 ${
                                daysUntilDue !== null && daysUntilDue < 0
                                  ? "text-red-500"
                                  : daysUntilDue !== null && daysUntilDue <= 1
                                    ? "text-orange-500"
                                    : ""
                              }`}
                            >
                              <CalendarIcon className="h-3 w-3" />
                              <span>
                                {daysUntilDue !== null && daysUntilDue < 0
                                  ? `${Math.abs(daysUntilDue)} days overdue`
                                  : daysUntilDue === 0
                                    ? "Due today"
                                    : daysUntilDue === 1
                                      ? "Due tomorrow"
                                      : format(todo.dueDate, "MMM d")}
                              </span>
                            </div>
                          )}
                          {todo.estimatedTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{todo.estimatedTime}m</span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      {todo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {todo.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
