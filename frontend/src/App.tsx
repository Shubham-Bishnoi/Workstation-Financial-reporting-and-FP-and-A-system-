
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Sources from "./pages/Sources";
import Import from "./pages/Import";
import Analytics from "./pages/Analytics";
import Forecasting from "./pages/Forecasting";
import PnlAnalysis from "./pages/PnlAnalysis";
import BalanceSheet from "./pages/BalanceSheet";
import CashFlow from "./pages/CashFlow";
import Help from "./pages/Help";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/import" element={<Import />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/pnl" element={<PnlAnalysis />} />
          <Route path="/balance" element={<BalanceSheet />} />
          <Route path="/cashflow" element={<CashFlow />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
