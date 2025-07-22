import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Clock } from 'lucide-react';

export default function StudyTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsPaused(false);
            // Switch mode when timer completes
            const newMode = mode === 'study' ? 'break' : 'study';
            setMode(newMode);
            setTime(newMode === 'study' ? 25 * 60 : 5 * 60);
            return newMode === 'study' ? 25 * 60 : 5 * 60;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, time, mode]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maxTime = mode === 'study' ? 25 * 60 : 5 * 60;
  const progress = ((maxTime - time) / maxTime) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div>
          <div className={`text-4xl font-bold mb-2 ${mode === 'study' ? 'text-blue-600' : 'text-green-600'}`}>
            {formatTime(time)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'study' ? 'Study Time' : 'Break Time'}
          </p>
        </div>

        <Progress value={progress} className="w-full" />

        <div className="flex justify-center space-x-2">
          {!isActive ? (
            <Button onClick={handleStart} className="flex items-center">
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline" className="flex items-center">
              <Pause className="h-4 w-4 mr-1" />
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>{mode === 'study' ? '25 min study session' : '5 min break'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
