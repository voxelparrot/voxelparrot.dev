import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import useImagePreloader from "@/hooks/useImagePreloader";

const imageAssets = [
  "/assets/wall_back_dark.png",
  "/assets/wall_back_light.png",
  "/assets/button_sq.png",
  "/assets/button_h_sq.png",
  "/assets/button_i_sq.png",
  "/assets/button_d_sq.png",
  "/assets/button_sq-l.png",
  "/assets/button_h_sq-l.png",
  "/assets/button_i_sq-l.png",
  "/assets/button_d_sq-l.png",
  "/assets/chain.png",
  "/assets/chain-l.png",
  "/assets/cognata_icon.png",
  "/assets/particle_icon.png",
  "/assets/scratch_icon.png",
  "/assets/leon.png",
  "/assets/parrotchair.png",
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {

  const imagesLoaded = useImagePreloader(imageAssets);

  if (!imagesLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
