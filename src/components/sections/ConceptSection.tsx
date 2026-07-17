import type { SiteConfig } from '../../types/site'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './Sections.module.css'

interface ConceptSectionProps {
  statement: SiteConfig['statement']
}

export function ConceptSection({ statement }: ConceptSectionProps) {
  return (
    <section
      className={styles.section}
      id="concept"
      aria-labelledby="concept-title"
      tabIndex={-1}
      data-journey-stop
      data-journey-label="コンセプト"
    >
      <SectionHeading id="concept-title" index="01" title="コンセプト" />
      <div className={styles.contentGrid}>
        <p className={styles.statement}>{statement.full}</p>
      </div>
    </section>
  )
}
