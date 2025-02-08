
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Target, Coins, Hand } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 sm:p-4">
      <div className="container max-w-lg mx-auto grid grid-cols-5 gap-1">
        <Link to="/" className={`nav-link flex flex-col items-center justify-center p-2 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
          <Home size={18} className="mb-1" />
          <span className="text-[10px] sm:text-xs">Home</span>
        </Link>
        <Link to="/tasks" className={`nav-link flex flex-col items-center justify-center p-2 ${isActive("/tasks") ? "text-primary" : "text-muted-foreground"}`}>
          <Target size={18} className="mb-1" />
          <span className="text-[10px] sm:text-xs">Tasks</span>
        </Link>
        <Link to="/tap" className={`nav-link flex flex-col items-center justify-center p-2 ${isActive("/tap") ? "text-primary" : "text-muted-foreground"}`}>
          <Hand size={18} className="mb-1" />
          <span className="text-[10px] sm:text-xs">Tap</span>
        </Link>
        <Link to="/betting" className={`nav-link flex flex-col items-center justify-center p-2 ${isActive("/betting") ? "text-primary" : "text-muted-foreground"}`}>
          <Coins size={18} className="mb-1" />
          <span className="text-[10px] sm:text-xs">Games</span>
        </Link>
        <Link to="/leaderboard" className={`nav-link flex flex-col items-center justify-center p-2 ${isActive("/leaderboard") ? "text-primary" : "text-muted-foreground"}`}>
          <Trophy size={18} className="mb-1" />
          <span className="text-[10px] sm:text-xs">Leaderboard</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
