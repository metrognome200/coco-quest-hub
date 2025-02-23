import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Bet {
  id: number;
  title: string;
  description: string;
  pool: number;
  minBet: number;
  maxBet: number;
  endTime: string;
}

const BETS: Bet[] = [
  {
    id: 1,
    title: "Price Above 100",
    description: "Will $COCO price be above 100 by end of day?",
    pool: 1000,
    minBet: 10,
    maxBet: 100,
    endTime: "2h 30m",
  },
  {
    id: 2,
    title: "New ATH",
    description: "Will $COCO reach new ATH this week?",
    pool: 5000,
    minBet: 50,
    maxBet: 500,
    endTime: "5d",
  },
];

const Betting = () => {
  const [selectedBet, setSelectedBet] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePlaceBet = () => {
    if (selectedBet !== null) {
      const bet = BETS.find((bet) => bet.id === selectedBet);
      if (bet && (Number(betAmount) < bet.minBet || Number(betAmount) > bet.maxBet)) {
        setError(`Bet amount must be between ${bet.minBet} and ${bet.maxBet}`);
        return;
      }
      setError(null);
      setSuccess(`Bet of ${betAmount} $COCO placed successfully on "${bet?.title}"`);
      setSelectedBet(null);
      setBetAmount("");
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold mb-6">Games</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <div className="grid gap-4">
        {BETS.map((bet) => (
          <Card 
            key={bet.id} 
            className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-200"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{bet.title}</h3>
                <p className="text-sm text-muted-foreground">{bet.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm border-t border-primary/10 pt-4">
                <span className="text-primary">Pool: {bet.pool} $COCO</span>
                <span className="text-muted-foreground">Ends in: {bet.endTime}</span>
              </div>
              
              {selectedBet === bet.id ? (
                <div className="space-y-2 border-t border-primary/10 pt-4">
                  <Input
                    type="number"
                    placeholder={`Enter amount (${bet.minBet}-${bet.maxBet})`}
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                    aria-label={`Enter bet amount for ${bet.title}`}
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      onClick={() => setSelectedBet(null)}
                    >
                      Cancel
                    </Button>
                    <Button className="w-full" onClick={handlePlaceBet}>Place Bet</Button>
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full mt-2" 
                  onClick={() => setSelectedBet(bet.id)}
                  aria-label={`Bet now on ${bet.title}`}
                >
                  Bet Now
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Betting;