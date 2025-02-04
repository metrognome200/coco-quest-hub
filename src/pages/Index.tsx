import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Coins, Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Coco Gnome</h1>
      
      <div className="grid gap-6">
        <Link to="/tasks">
          <Card className="p-6 card-hover">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Daily Tasks</h2>
                <p className="text-muted-foreground">Complete tasks to earn $COCO</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/betting">
          <Card className="p-6 card-hover">
            <div className="flex items-center gap-4">
              <Coins className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Betting</h2>
                <p className="text-muted-foreground">Place bets and win big</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/leaderboard">
          <Card className="p-6 card-hover">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Leaderboard</h2>
                <p className="text-muted-foreground">See top $COCO holders</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Index;