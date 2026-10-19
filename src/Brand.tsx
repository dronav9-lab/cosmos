type BrandProps = {
  href?: string
  ariaLabel?: string
  className?: string
}

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.7" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="12" ry="5.5" stroke="currentColor" strokeWidth="1.15" transform="rotate(-32 16 16)" />
      <circle cx="24.8" cy="9.8" r="1.35" fill="#9fc2df" />
    </svg>
  </span>
}

export function Brand({ href = '/', ariaLabel = 'cosmos home', className = 'wordmark' }: BrandProps) {
  return <a className={className} href={href} aria-label={ariaLabel}><BrandMark /><span>cosmos</span></a>
}
