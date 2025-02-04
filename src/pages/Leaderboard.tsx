import { Card } from "@/components/ui/card";
import { Crown } from "lucide-react";

const USERS = [
  { id: 1, name: "Alex", balance: 10000, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { id: 2, name: "Sarah", balance: 8500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 3, name: "Mike", balance: 7200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: 4, name: "Emma", balance: 6800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { id: 5, name: "John", balance: 5500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
];

const Leaderboard = () => {
  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      
      <div className="grid gap-4">
        {USERS.map((user, index) => (
          <Card key={user.id} className={`p-4 ${index < 3 ? "border-primary/50" : ""}`}>
            <div className="flex items-center gap-4">
              <div className="relative">
                {index === 0 && (
                  <Crown className="absolute -top-2 -right-2 w-4 h-4 text-yellow-500" />
                )}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full bg-secondary"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">#{index + 1}</span>
                  <h3 className="font-semibold">{user.name}</h3>
                </div>
                <p className="text-sm text-primary">{user.balance} $COCO</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;