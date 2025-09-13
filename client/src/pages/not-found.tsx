import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 pixel-frame-9slice">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <h1 className="text-2xl font-bold text-white-900">
              404 Page Not Found
            </h1>
          </div>
          <button
            className="pixel-button-9slice"
            data-testid={`button-return-notfound`}
            onClick={() => setLocation("/")}
          >
            Return Home
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
