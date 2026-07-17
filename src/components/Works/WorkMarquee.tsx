import type { Work } from '../../types/work'
import { WorkItem } from './WorkItem'
import styles from './Works.module.css'

interface WorkMarqueeProps {
  works: readonly Work[]
}

interface WorkMarqueeRowProps {
  direction: 'forward' | 'reverse'
  rowIndex: number
  works: readonly Work[]
}

function WorkMarqueeRow({ direction, rowIndex, works }: WorkMarqueeRowProps) {
  return (
    <div
      className={styles.marqueeRow}
      data-direction={direction}
      data-marquee-row
    >
      <div className={styles.marqueeTrack}>
        <ol className={styles.marqueeGroup}>
          {works.map((work, index) => (
            <li className={styles.marqueeItem} key={work.id}>
              <WorkItem
                work={work}
                index={index * 2 + rowIndex}
                showCaption={false}
              />
            </li>
          ))}
        </ol>
        <div className={styles.marqueeGroup} aria-hidden="true" inert>
          {works.map((work, index) => (
            <div className={styles.marqueeItem} key={`${work.id}-duplicate`}>
              <WorkItem
                work={work}
                index={index * 2 + rowIndex}
                showCaption={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WorkMarquee({ works }: WorkMarqueeProps) {
  const rows = [
    works.filter((_, index) => index % 2 === 0),
    works.filter((_, index) => index % 2 === 1),
  ].filter((row) => row.length > 0)

  return (
    <div
      className={styles.marquee}
      data-work-marquee
      aria-label="作品プレビュー"
    >
      <div className={styles.marqueeRows}>
        {rows.map((row, index) => (
          <WorkMarqueeRow
            direction={index % 2 === 0 ? 'forward' : 'reverse'}
            key={index}
            rowIndex={index}
            works={row}
          />
        ))}
      </div>
    </div>
  )
}
