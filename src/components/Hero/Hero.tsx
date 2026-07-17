import type { CSSProperties } from 'react'
import type { SiteConfig } from '../../types/site'
import { formatEventDateRange } from '../../utils/date'
import { resolveAssetUrl } from '../../utils/assets'
import styles from './Hero.module.css'

interface HeroProps {
  config: SiteConfig
}

type HeroStyle = CSSProperties & {
  '--hero-background-image'?: string
}

function getBackgroundStyle(backgroundSrc?: string): HeroStyle | undefined {
  if (!backgroundSrc) {
    return undefined
  }

  const safeSource = resolveAssetUrl(backgroundSrc).replaceAll('"', '\\"')

  return {
    '--hero-background-image': `url("${safeSource}")`,
  }
}

export function Hero({ config }: HeroProps) {
  const dateLabel = formatEventDateRange(
    config.event.startDate,
    config.event.endDate,
  )

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      data-journey-stop
      data-journey-label="stArt"
      style={getBackgroundStyle(config.visualAssets.heroBackgroundSrc)}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.grid} />
      </div>

      <div className={styles.titleArea}>
        <h1 id="hero-title" className={styles.title}>
          {config.title}
        </h1>
      </div>

      <div className={styles.details}>
        <div className={styles.detailBlock}>
          <p className={styles.label}>会期</p>
          <p className={styles.date}>{dateLabel}</p>
        </div>

        <div className={styles.detailBlock}>
          <p className={styles.label}>会場</p>
          <p className={styles.venueName}>{config.event.venueName}</p>
          <ul className={styles.venues} aria-label="展示会場">
            {config.event.venues.map((venue) => (
              <li key={venue}>{venue}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
