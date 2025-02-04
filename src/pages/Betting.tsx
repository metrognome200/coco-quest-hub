import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const BETS = [
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
  
  return (
    <div className="container max-w-lg mx-auto px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold mb-6">Active Bets</h1>
      
      <div className="grid gap-4">
        {BETS.map((bet) => (
          <Card key={bet.id} className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{bet.title}</h3>
                <p className="text-sm text-muted-foreground">{bet.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Pool: {bet.pool} $COCO</span>
                <span>Ends in: {bet.endTime}</span>
              </div>
              
              {selectedBet === bet.id ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder={`Enter amount (${bet.minBet}-${bet.maxBet})`}
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button className="w-full" variant="outline" onClick={() => setSelectedBet(null)}>
                      Cancel
                    </Button>
                    <Button className="w-full">Place Bet</Button>
                  </div>
                </div>
              ) : (
                <Button className="w-full" onClick={() => setSelectedBet(bet.id)}>
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