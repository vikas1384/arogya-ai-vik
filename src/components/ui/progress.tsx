
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    isIndeterminate?: boolean;
  }
>(({ className, value, isIndeterminate = false, ...props }, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  
  React.useEffect(() => {
    // If it's indeterminate, create a pulsing animation effect
    if (isIndeterminate) {
      const interval = setInterval(() => {
        setAnimatedValue((prev) => {
          if (prev >= 95) return 65;
          return prev + 1;
        });
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      // For determinate progress, set to actual value
      setAnimatedValue(value || 0);
    }
  }, [value, isIndeterminate]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-transform duration-300",
          isIndeterminate && "animate-pulse"
        )}
        style={{ 
          transform: `translateX(-${100 - animatedValue}%)`,
          transition: isIndeterminate ? "transform 0.3s ease-in-out" : "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
        }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
