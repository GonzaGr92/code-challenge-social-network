import styles from './avatar.module.scss'

interface AvatarProps {
  layout: 'vertical' | 'horizontal'
}

export const Avatar = ({ layout }: AvatarProps) => {
  return (
    <div className={`${styles.user} ${styles[layout]}`}>
      <div className={styles.avatar}>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" alt="User Avatar" />
      </div>
      {layout === 'horizontal' ? (
        <>
          <div className={styles.name}>Carlos</div>
          <div className={styles.date}>
            <span>•</span>
            2023-10-10
          </div>
        </>
      ) : (
        <div className="flex-vertical">
          <div className={styles.name}>Carlos</div>
          <div className={styles.date}>2023-10-10</div>
        </div>
      )}
    </div>
  )
}
