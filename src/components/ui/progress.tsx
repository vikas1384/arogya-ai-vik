
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  /** Enables an animated indeterminate state */
  isIndeterminate?: boolean;
  /** Custom color for the progress indicator */
  color?: string;
  /** Custom size preset (xs, sm, md, lg, xl) or pass a custom className */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show percentage label */
  showValue?: boolean;
  /** Format the displayed value */
  formatValue?: (value: number) => string;
  /** Show a shadow under the progress bar for elevation */
  elevated?: boolean;
  /** Add a pulsing animation to draw attention */
  pulse?: boolean;
  /** Show stripes animation (like macOS copy progress) */
  striped?: boolean;
  /** Optional label to display above the progress bar */
  label?: string;
  /** Customize track color (background) */
  trackColor?: string;
};

/**
 * Enhanced Progress Component
 * Provides a highly customizable progress indicator with animations
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  isIndeterminate = false, 
  color,
  trackColor,
  size = 'md',
  showValue = false,
  formatValue,
  elevated = false,
  pulse = false,
  striped = false,
  label,
  ...props 
}, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  
  // Determine height based on size
  const sizeStyles = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
    xl: "h-6"
  };
  
  // Calculate values for indeterminate state
  React.useEffect(() => {
    if (isIndeterminate) {
      // Enhanced fluid motion algorithm for indeterminate state
      let currentDirection = 1;
      let currentValue = 15; // Start at 15%
      let speed = 0.8; // Base speed
      
      const interval = setInterval(() => {
        setAnimatedValue((prev) => {
          currentValue = prev;
          
          // Dynamic speed based on position to create a more natural motion
          if (currentValue > 85) {
            // Slow down as we approach the end
            speed = 0.4;
            currentDirection = -1;
          } else if (currentValue < 15) {
            // Speed up from the beginning
            speed = 0.8;
            currentDirection = 1;
          } else {
            // Normal speed in the middle
            speed = 0.6;
          }
          
          // Apply some randomness for a more natural feel
          const randomFactor = Math.random() * 0.3 + 0.85;
          // Calculate next value with easing
          const nextValue = currentValue + (currentDirection * speed * randomFactor);
          
          // Ensure we stay within bounds
          if (nextValue >= 98) return 98;
          if (nextValue <= 10) return 10;
          
          return nextValue;
        });
      }, 30); // Smoother with more frequent updates
      
      return () => clearInterval(interval);
    } else {
      // For determinate progress, animate smoothly to the actual value
      const targetValue = value || 0;
      
      // Use spring physics for smoother animation
      const animateToTarget = () => {
        const difference = targetValue - animatedValue;
        const springFactor = 0.12; // Spring stiffness
        
        if (Math.abs(difference) > 0.1) {
          // Spring physics: velocity is proportional to distance
          setAnimatedValue(prev => prev + difference * springFactor);
          requestAnimationFrame(animateToTarget);
        } else {
          // Snap to exact value when we're close enough
          setAnimatedValue(targetValue);
        }
      };
      
      // Start animation
      requestAnimationFrame(animateToTarget);
    }
  }, [value, isIndeterminate]);

  // Format the display value
  const displayValue = React.useMemo(() => {
    const valueToFormat = isIndeterminate ? animatedValue : (value || 0);
    if (formatValue) {
      return formatValue(valueToFormat);
    }
    return `${Math.round(valueToFormat)}%`;
  }, [isIndeterminate, animatedValue, value, formatValue]);

  // Generate classes for the progress indicator
  const indicatorClasses = cn(
    "h-full w-full flex-1",
    isIndeterminate && "transition-transform ease-out duration-300",
    pulse && "animate-pulse",
    striped && "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%] animate-[progress-stripe_1s_linear_infinite]",
  );

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showValue && <span className="text-xs text-muted-foreground">{displayValue}</span>}
        </div>
      )}
      
      <div className="relative">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full",
            sizeStyles[size],
            elevated && "shadow-sm",
            trackColor ? "" : "bg-secondary",
            className
          )}
          style={{ backgroundColor: trackColor }}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={indicatorClasses}
            style={{ 
              transform: `translateX(-${100 - (isIndeterminate ? animatedValue : (value || 0))}%)`,
              transition: isIndeterminate 
                ? "transform 0.3s ease-out" 
                : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: color || "var(--primary)"
            }}
          />
        </ProgressPrimitive.Root>
        
        {showValue && !label && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-foreground px-1 rounded">
            {displayValue}
          </div>
        )}
      </div>
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
