import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Coins, Trophy } from "lucide-react";
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = tonConnectUI.wallet;

  useEffect(() => {
    if (wallet) {
      toast({
        title: "Wallet Connected",
        description: `Connected to ${wallet.device.appName}`,
      });
    }
  }, [wallet, toast]);

  return (
    <div className="container max-w-lg mx-auto px-4 py-4 sm:py-8">
      <div className="mb-8 flex justify-center">
        <TonConnectButton />
      </div>
      
      {wallet && (
        <div className="mb-8 text-sm text-muted-foreground text-center">
          Connected: {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
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