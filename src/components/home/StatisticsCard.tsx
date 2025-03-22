
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
  value: string;
  description: string;
}

const StatisticsCard = ({ value, description }: StatisticsCardProps) => {
  return (
    <Card className="text-center hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-health-600">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
