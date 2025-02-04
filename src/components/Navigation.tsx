import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Target, Coins, Hand } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
      <div className="container max-w-lg mx-auto flex justify-around items-center">
        <Link to="/" className={`nav-link flex flex-col items-center gap-1 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/tasks" className={`nav-link flex flex-col items-center gap-1 ${isActive("/tasks") ? "text-primary" : "text-muted-foreground"}`}>
          <Target size={20} />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link to="/tap" className={`nav-link flex flex-col items-center gap-1 ${isActive("/tap") ? "text-primary" : "text-muted-foreground"}`}>
          <Hand size={20} />
          <span className="text-xs">Tap</span>
        </Link>
        <Link to="/betting" className={`nav-link flex flex-col items-center gap-1 ${isActive("/betting") ? "text-primary" : "text-muted-foreground"}`}>
          <Coins size={20} />
          <span className="text-xs">Betting</span>
        </Link>
        <Link to="/leaderboard" className={`nav-link flex flex-col items-center gap-1 ${isActive("/leaderboard") ? "text-primary" : "text-muted-foreground"}`}>
          <Trophy size={20} />
          <span className="text-xs">Leaderboard</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;