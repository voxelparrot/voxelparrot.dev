import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

interface NotFoundProps {
  setActiveTab: (tabId: string) => void;
}

export default function NotFound({ setActiveTab }: NotFoundProps) {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 pixel-frame-9slice">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center mb-4 gap-2 text-center">
            <h1 className="text-2xl font-bold text-white-900">
              Page Not Found
            </h1>
            <button
              className="pixel-button-9slice mt-4"
              data-testid={`button-return-notfound`}
              onClick={() => setActiveTab("home")}
            >
            Return Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
