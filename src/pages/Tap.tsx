
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Battery, Bolt } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ENERGY_COST_PER_TAP = 5;
const ENERGY_REGEN_RATE = 1; // Energy points per 3 seconds
const MAX_ENERGY = 100;

const Tap = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('cocoCoins');
    return saved ? parseInt(saved) : 0;
  });
  
  const [energy, setEnergy] = useState(() => {
    const saved = localStorage.getItem('energy');
    return saved ? parseInt(saved) : MAX_ENERGY;
  });
  
  const [multiplier, setMultiplier] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastRegenTime, setLastRegenTime] = useState(Date.now());

  // Save coins and energy to localStorage
  useEffect(() => {
    localStorage.setItem('cocoCoins', coins.toString());
    localStorage.setItem('energy', energy.toString());
  }, [coins, energy]);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timePassed = now - lastRegenTime;
      const energyToAdd = Math.floor(timePassed / 3000) * ENERGY_REGEN_RATE;
      
      if (energyToAdd > 0) {
        setEnergy(prev => Math.min(MAX_ENERGY, prev + energyToAdd));
        setLastRegenTime(now);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lastRegenTime]);

  const handleTap = () => {
    if (energy >= ENERGY_COST_PER_TAP) {
      setCoins(prev => prev + multiplier);
      setEnergy(prev => prev - ENERGY_COST_PER_TAP);
      setIsAnimating(true);
      
      // Show coin animation every 10 taps
      if (coins % 10 === 0) {
        toast({
          title: "Keep going!",
          description: `You've earned ${multiplier} $COCO!`,
        });
      }
    } else {
      toast({
        title: "Not enough energy!",
        description: "Wait for energy to regenerate",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="text-primary" />
              <span className="font-bold">{coins}</span>
            </div>
            <span className="text-sm text-muted-foreground">$COCO</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="text-primary" />
              <span className="font-bold">{energy}</span>
            </div>
            <span className="text-sm text-muted-foreground">Energy</span>
          </div>
        </Card>
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

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Energy</span>
            <span>{energy}/{MAX_ENERGY}</span>
          </div>
          <Progress value={(energy / MAX_ENERGY) * 100} />
          <p className="text-xs text-muted-foreground text-center">
            Regenerates {ENERGY_REGEN_RATE} energy every 3 seconds
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Multiplier</h3>
            <p className="text-2xl text-primary">{multiplier}x</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Cost per Tap</h3>
            <div className="flex items-center gap-1 text-2xl text-primary">
              <Bolt className="w-5 h-5" />
              <span>{ENERGY_COST_PER_TAP}</span>
            </div>
          </Card>
        </div>

        {multiplier === 1 && coins >= 100 && (
          <Button 
            className="w-full"
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
    </div>
  );
};

export default Tap;
