
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
  value: string;
  description: string;
}

const StatisticsCard = ({ value, description }: StatisticsCardProps) => {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card className="text-center h-full">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-health-600 dark:text-health-400">{value}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsCard;
