
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onComplete?: () => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({ label, onComplete, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
    
    if (props.onChange) {
      props.onChange(e);
    }
    
    if (onComplete && value.length === props.maxLength) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        ref={ref}
        type="tel"
        className="w-full text-center bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-2xl font-bold p-3 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:ring-0 transition"
        {...props}
        onChange={handleChange}
        aria-label={label}
      />
    </div>
  );
});
