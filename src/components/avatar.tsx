import styles from './avatar.module.scss'

export const Avatar = () => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" alt="User Avatar" />
      </div>
      <div className={styles.name}>Carlos</div>
    </div>
  )
}
