
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  /** Enables an animated indeterminate state */
  isIndeterminate?: boolean;
  /** Custom color for the progress indicator */
  color?: string;
  /** Custom size preset (sm, md, lg) or pass a custom className */
  size?: 'sm' | 'md' | 'lg';
  /** Show percentage label */
  showValue?: boolean;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value, 
  isIndeterminate = false, 
  color,
  size = 'md',
  showValue = false,
  ...props 
}, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  
  // Determine the height based on size
  const sizeStyles = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6"
  };
  
  React.useEffect(() => {
    // Create a more sophisticated indeterminate animation
    if (isIndeterminate) {
      // More complex animation for indeterminate state
      let direction = 1;
      let currentValue = 30;
      
      const interval = setInterval(() => {
        setAnimatedValue((prev) => {
          currentValue = prev;
          
          // Change direction when reaching thresholds
          if (currentValue >= 95) direction = -1;
          if (currentValue <= 30) direction = 1;
          
          // Move in the current direction at variable speed
          return currentValue + direction * (Math.random() * 1.5 + 0.5);
        });
      }, 40);
      
      return () => clearInterval(interval);
    } else {
      // For determinate progress, animate to the actual value
      const targetValue = value || 0;
      let currentValue = animatedValue;
      
      // Create a smooth animation to the target value
      if (Math.abs(targetValue - currentValue) > 0.5) {
        const interval = setInterval(() => {
          setAnimatedValue((prev) => {
            if (Math.abs(targetValue - prev) < 0.5) {
              clearInterval(interval);
              return targetValue;
            }
            return prev + (targetValue - prev) * 0.1;
          });
        }, 16);
        
        return () => clearInterval(interval);
      }
    }
  }, [value, isIndeterminate, animatedValue]);

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-secondary",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-transform duration-300",
            isIndeterminate && "animate-pulse"
          )}
          style={{ 
            transform: `translateX(-${100 - animatedValue}%)`,
            transition: isIndeterminate 
              ? "transform 0.4s ease-in-out" 
              : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: color || "var(--primary)"
          }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium">
          {Math.round(isIndeterminate ? animatedValue : (value || 0))}%
        </div>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
