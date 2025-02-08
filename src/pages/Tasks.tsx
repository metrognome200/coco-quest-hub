
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  lastCompletedAt?: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Daily Check-in",
    description: "Check in to earn 10 $COCO",
    reward: 10,
    completed: false,
  },
  {
    id: 2,
    title: "Share on Twitter",
    description: "Share your progress on Twitter",
    reward: 50,
    completed: false,
  },
  {
    id: 3,
    title: "Invite Friends",
    description: "Invite 3 friends to join",
    reward: 100,
    completed: false,
  },
];

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return INITIAL_TASKS;
  });
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Check for daily task reset
  useEffect(() => {
    const checkDailyReset = () => {
      const updatedTasks = tasks.map(task => {
        if (task.id === 1 && task.completed && task.lastCompletedAt) {
          const hoursSinceCompletion = (Date.now() - task.lastCompletedAt) / (1000 * 60 * 60);
          if (hoursSinceCompletion >= 24) {
            return { ...task, completed: false, lastCompletedAt: undefined };
          }
        }
        return task;
      });
      setTasks(updatedTasks);
    };

    checkDailyReset();
    const interval = setInterval(checkDailyReset, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  const completeTask = async (taskId: number) => {
    // Get current coins
    const currentCoins = parseInt(localStorage.getItem('cocoCoins') || '0');
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Return early if task is already completed
          if (task.completed) return task;
          
          // Update task completion status
          return {
            ...task,
            completed: true,
            lastCompletedAt: Date.now()
          };
        }
        return task;
      })
    );

    // Find the task to get its reward
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Add reward to user's coins
    const newCoins = currentCoins + task.reward;
    localStorage.setItem('cocoCoins', newCoins.toString());

    // Show completion toast
    toast({
      title: "Task Completed!",
      description: `You earned ${task.reward} $COCO`,
    });
  };

  const handleTaskAction = async (taskId: number) => {
    // Simulate loading state
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, loading: true } : task
      )
    );

    // Simulate task completion delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    await completeTask(taskId);

    // Remove loading state
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, loading: false } : task
      )
    );
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold mb-6">Daily Tasks</h1>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <p className="text-sm text-primary mt-1">Reward: {task.reward} $COCO</p>
              </div>
              
              {task.completed ? (
                <CheckCircle className="w-6 h-6 text-primary" />
              ) : (
                <Button 
                  size="sm" 
                  className="shrink-0"
                  onClick={() => handleTaskAction(task.id)}
                  disabled={task.loading}
                >
                  {task.loading ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Clock className="w-4 h-4 mr-2" />
                  )}
                  Go
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
