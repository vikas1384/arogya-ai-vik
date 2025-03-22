
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCard2Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
}

const FeatureCard2 = ({ 
  icon, 
  title, 
  description, 
  bgColor = "bg-blue-100 dark:bg-blue-900/30", 
  iconColor = "text-health-600" 
}: FeatureCard2Props) => {
  return (
    <Card className="hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-2`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard2;
