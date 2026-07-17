import type { MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { SiteConfig } from '../../types/site'
import { resolveAssetUrl } from '../../utils/assets'
import styles from './SiteHeader.module.css'

interface SiteLogoProps {
  logo: SiteConfig['logo']
  onNavigate?: () => void
}

export function SiteLogo({ logo, onNavigate }: SiteLogoProps) {
  const location = useLocation()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()

    if (location.pathname === '/' && location.search === '') {
      event.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      })
    }
  }

  return (
    <Link className={styles.logo} to="/" onClick={handleClick}>
      {logo.imageSrc ? (
        <img
          className={styles.logoImage}
          src={resolveAssetUrl(logo.imageSrc)}
          alt={logo.imageAlt ?? logo.text}
        />
      ) : (
        <span>{logo.text}</span>
      )}
    </Link>
  )
}
