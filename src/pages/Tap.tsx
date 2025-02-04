import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Coins } from "lucide-react";

const Tap = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('cocoCoins');
    return saved ? parseInt(saved) : 0;
  });
  const [multiplier, setMultiplier] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('cocoCoins', coins.toString());
  }, [coins]);

  const handleTap = () => {
    setCoins(prev => prev + multiplier);
    setIsAnimating(true);
    
    // Show coin animation every 10 taps
    if (coins % 10 === 0) {
      toast({
        title: "Keep going!",
        description: `You've earned ${multiplier} $COCO!`,
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">
          <Coins className="text-primary" />
          <span>{coins}</span>
          <span className="text-primary">$COCO</span>
        </div>
        <p className="text-muted-foreground">Tap to earn $COCO!</p>
      </div>

      <Card 
        className={`aspect-square max-w-sm mx-auto mb-8 flex items-center justify-center cursor-pointer transition-all duration-200 
          ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}
        onClick={() => {
          handleTap();
          setTimeout(() => setIsAnimating(false), 100);
        }}
      >
        <div className="relative w-32 h-32">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            alt="Tap Target"
            className={`w-full h-full object-cover rounded-full shadow-lg 
              ${isAnimating ? 'animate-bounce' : 'animate-pulse'}`}
          />
          <div className="absolute inset-0 bg-primary/10 rounded-full" />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Multiplier</h3>
          <p className="text-2xl text-primary">{multiplier}x</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Per Tap</h3>
          <p className="text-2xl text-primary">+{multiplier} $COCO</p>
        </Card>
      </div>

      {multiplier === 1 && coins >= 100 && (
        <Button 
          className="w-full mt-4"
          onClick={() => {
            setMultiplier(2);
            setCoins(prev => prev - 100);
            toast({
              title: "Multiplier Upgraded!",
              description: "You now earn 2x $COCO per tap!",
            });
          }}
        >
          Upgrade Multiplier (100 $COCO)
        </Button>
      )}
    </div>
  );
};

export default Tap;