
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Add a loading indicator to the input */
  isLoading?: boolean;
  /** Show validation state */
  isValid?: boolean;
  /** Show error state */
  isError?: boolean;
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Add icon before the input */
  leftIcon?: React.ReactNode;
  /** Add icon after the input */
  rightIcon?: React.ReactNode;
  /** Format the input value (e.g., for currency, phone numbers) */
  formatValue?: (value: string) => string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    isLoading, 
    isValid, 
    isError, 
    size = 'md', 
    leftIcon, 
    rightIcon, 
    formatValue,
    onChange,
    ...props 
  }, ref) => {
    // For formatted values (like currency, phone numbers)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (formatValue && onChange) {
        // Create a new synthetic event with the formatted value
        const formattedValue = formatValue(e.target.value);
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue
          }
        };
        onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
      } else if (onChange) {
        onChange(e);
      }
    };

    // Determine input height based on size
    const sizeClasses = {
      sm: "h-8 text-xs px-2",
      md: "h-10 text-base px-3",
      lg: "h-12 text-lg px-4"
    };
    
    // Determine status styling
    const statusClasses = cn({
      "border-red-500 focus-visible:ring-red-500": isError,
      "border-green-500 focus-visible:ring-green-500": isValid && !isError,
      "opacity-70 cursor-wait": isLoading
    });

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 flex items-center justify-center text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
            sizeClasses[size],
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            statusClasses,
            className
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center justify-center text-gray-500">
            {rightIcon}
          </div>
        )}
        
        {isLoading && (
          <div className="absolute right-3 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
