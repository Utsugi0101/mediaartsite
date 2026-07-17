import type { MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { siteConfig } from '../../config/site'
import { BackToTopButton } from '../BackToTopButton/BackToTopButton'
import { InteractiveStarfield } from '../InteractiveStarfield/InteractiveStarfield'
import { SiteHeader } from '../SiteHeader/SiteHeader'
import { SiteFooter } from '../SiteFooter/SiteFooter'
import { StarJourney } from '../StarJourney/StarJourney'
import styles from './SiteLayout.module.css'

function getRouteDirection(pathname: string) {
  return pathname === '/works' ? 'forward' : 'backward'
}

export function SiteLayout() {
  const location = useLocation()
  const routeDirection = getRouteDirection(location.pathname)

  const moveToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const main = document.querySelector<HTMLElement>('main')
    main?.focus({ preventScroll: true })
    main?.scrollIntoView({ block: 'start' })
  }

  return (
    <div className={styles.site}>
      <InteractiveStarfield />
      {location.pathname === '/' ? <StarJourney /> : null}
      <a className={styles.skipLink} href="#main-content" onClick={moveToMain}>
        本文へ移動
      </a>
      <SiteHeader config={siteConfig} />
      <div
        className={styles.routeScene}
        data-route-direction={routeDirection}
        data-route-scene
        key={location.pathname}
      >
        <Outlet />
      </div>
      <SiteFooter config={siteConfig} />
      <BackToTopButton />
    </div>
  )
}
