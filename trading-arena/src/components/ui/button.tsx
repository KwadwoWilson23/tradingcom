import * as React from "react"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'default'
  size?: 'sm' | 'default' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] active:bg-[#1E3A8A]",
      default: "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] active:bg-[#1E3A8A]",
      secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
      outline: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
      ghost: "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      link: "bg-transparent text-[#1D4ED8] hover:text-[#1E40AF] underline-offset-4 hover:underline",
    }
    
    const sizes = {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-9 w-9 p-0",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
