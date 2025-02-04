import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Coins, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // This is a placeholder for actual TON wallet connection
      // You would need to implement the actual TON wallet connection logic here
      const address = "Sample TON Address"; // Replace with actual wallet connection
      setWalletAddress(address);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to TON wallet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to TON wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-4 sm:py-8">
      {!walletAddress ? (
        <div className="mb-8">
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="w-full sm:w-auto"
          >
            {isConnecting ? "Connecting..." : "Connect TON Wallet"}
          </Button>
        </div>
      ) : (
        <div className="mb-8 text-sm text-muted-foreground">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
      )}
      
      <div className="grid gap-4 sm:gap-6">
        <Link to="/tasks">
          <Card className="p-4 sm:p-6 card-hover">
            <div className="flex items-center gap-4">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold">Daily Tasks</h2>
                <p className="text-sm text-muted-foreground">Complete tasks to earn $COCO</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/betting">
          <Card className="p-4 sm:p-6 card-hover">
            <div className="flex items-center gap-4">
              <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold">Betting</h2>
                <p className="text-sm text-muted-foreground">Place bets and win big</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/leaderboard">
          <Card className="p-4 sm:p-6 card-hover">
            <div className="flex items-center gap-4">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold">Leaderboard</h2>
                <p className="text-sm text-muted-foreground">See top $COCO holders</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Index;