import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

export interface StatCardProps {
  label?: string
  title?: string
  value: string | number
  subText?: string
  subtext?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral' | { value: string | number; isPositive?: boolean }
  trendValue?: string
  className?: string
}

export function StatCard({ label, title, value, subText, subtext, icon, trend, trendValue, className = '' }: StatCardProps) {
  const displayLabel = label ?? title ?? ''
  const displaySubText = subText ?? subtext
  const normalizedTrend = typeof trend === 'object' ? (trend.isPositive === false ? 'down' : 'up') : trend
  const displayTrendValue = typeof trend === 'object' ? String(trend.value) : trendValue

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-card ${className}`}>
      <div className="flex justify-between items-start">
        <h4 className="text-[11px] font-semibold leading-[16px] tracking-[0.05em] uppercase text-slate-400">
          {displayLabel}
        </h4>
        {icon && <div className="text-[#1D4ED8]">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-stat-display text-slate-900 tabular-nums">
          {value}
        </div>
        {normalizedTrend && (
          <div className={`flex items-center text-sm font-medium ${normalizedTrend === 'up' ? 'text-success' : normalizedTrend === 'down' ? 'text-destructive' : 'text-slate-500'}`}>
            {normalizedTrend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : normalizedTrend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> : null}
            {displayTrendValue}
          </div>
        )}
      </div>
      {displaySubText && (
        <div className="mt-1 text-body-sm text-slate-500">
          {displaySubText}
        </div>
      )}
    </div>
  )
}
