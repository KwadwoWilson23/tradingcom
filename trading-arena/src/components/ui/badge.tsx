import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'destructive' | 'outline'
}

function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-md px-2.5 py-0.5 text-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "bg-slate-100 text-slate-600",
    primary: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]",
    success: "bg-emerald-50 text-emerald-700",
    destructive: "bg-red-50 text-red-700",
    outline: "bg-white text-slate-600 border border-slate-200",
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  )
}

export { Badge }
