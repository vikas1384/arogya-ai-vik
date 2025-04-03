
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

interface AdvancedStatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  footer: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  darkGradientFrom?: string;
  darkGradientTo?: string;
}

const AdvancedStatCard = ({ 
  icon, 
  title, 
  description, 
  footer,
  gradientFrom,
  gradientTo,
  darkGradientFrom,
  darkGradientTo
}: AdvancedStatCardProps) => {
  const gradientClass = `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} dark:from-${darkGradientFrom || gradientFrom} dark:to-${darkGradientTo || gradientTo}`;
  
  return (
    <Card className="hover:scale-105 transition-all duration-300 border-health-200 dark:border-health-800">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${gradientClass} flex items-center justify-center`}>
            <div className="text-white">{icon}</div>
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mt-2">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        {footer}
      </CardFooter>
    </Card>
  );
};

export default AdvancedStatCard;
