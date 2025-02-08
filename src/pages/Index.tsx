
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Coins, Trophy, Battery, Bolt } from "lucide-react";
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = tonConnectUI.wallet;

  // Get stored values
  const coins = parseInt(localStorage.getItem('cocoCoins') || '0');
  const energy = parseInt(localStorage.getItem('energy') || '100');
  const maxEnergy = 100;

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
      <div className="mb-6 flex justify-center">
        <TonConnectButton />
      </div>
      
      {wallet && (
        <div className="mb-4 text-sm text-muted-foreground text-center">
          Connected: {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-semibold">{coins}</span>
          </div>
          <span className="text-sm text-muted-foreground">$COCO</span>
        </Card>
        
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-primary" />
            <span className="font-semibold">{energy}</span>
          </div>
          <span className="text-sm text-muted-foreground">Energy</span>
        </Card>
      </div>
      
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
                <h2 className="text-lg sm:text-xl font-semibold">Games</h2>
                <p className="text-sm text-muted-foreground">Play games and win big</p>
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
