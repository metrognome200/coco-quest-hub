import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Betting from "./pages/Betting";
import Leaderboard from "./pages/Leaderboard";
import Tap from "./pages/Tap";
import NotFound from "./pages/NotFound";

// This is your app's manifest URL
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-wallet/test/public/tonconnect-manifest.json';

const queryClient = new QueryClient();

const App = () => (
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="pb-20 sm:pb-24">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/betting" element={<Betting />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/tap" element={<Tap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navigation />
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </TonConnectUIProvider>
);

export default App;