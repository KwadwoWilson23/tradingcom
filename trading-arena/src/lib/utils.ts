export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function generateCompetitionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const rand = (len: number) => Array.from({length: len})
    .map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TR-${rand(4)}-${rand(4)}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTimeRemaining(endDate: string) {
  const total = Date.parse(endDate) - Date.parse(new Date().toISOString());
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total,
    days,
    hours,
    minutes
  };
}

export function calculateGainPercent(currentEquity: number, startingEquity: number, depositAdjustment: number): number {
  if (startingEquity <= 0) return 0;
  return ((currentEquity - startingEquity - depositAdjustment) / startingEquity) * 100;
}

export function calculateDrawdownPercent(currentEquity: number, peakEquity: number): number {
  if (peakEquity <= 0) return 0;
  return ((peakEquity - currentEquity) / peakEquity) * 100;
}
