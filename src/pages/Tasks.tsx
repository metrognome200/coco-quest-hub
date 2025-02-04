import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

const TASKS = [
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
    completed: true,
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
  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold mb-6">Daily Tasks</h1>
      
      <div className="grid gap-4">
        {TASKS.map((task) => (
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
                <Button size="sm" className="shrink-0">
                  <Clock className="w-4 h-4 mr-2" />
                  Complete
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