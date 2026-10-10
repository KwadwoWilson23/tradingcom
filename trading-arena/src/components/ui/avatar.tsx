import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, alt, initials, size = 'md', className = '', ...props }: AvatarProps) {
  const sizes = {
    sm: "w-[32px] h-[32px] text-xs",
    md: "w-[40px] h-[40px] text-sm",
    lg: "w-[56px] h-[56px] text-lg",
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-[#1D4ED8] text-white shrink-0 ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt || "Avatar"} 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold uppercase">{initials?.slice(0, 2) || "U"}</span>
      )}
    </div>
  )
}
