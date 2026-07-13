import { useRouter } from 'next/router'

import styles from './avatar.module.scss'

interface AvatarProps {
  layout: 'vertical' | 'horizontal'
  avatar: string
  name: string
  date?: string
}

export const Avatar = ({ layout, avatar, name, date }: AvatarProps) => {
  const router = useRouter()

  return (
    <div className={`${styles.user} ${styles[layout]}`}>
      <div className={styles.avatar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt="User Avatar"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // Prevents infinite loops if fallback fails
            currentTarget.src = `${router.basePath}/no-user.webp`
          }}
        />
      </div>
      {layout === 'horizontal' ? (
        <>
          <div className={styles.name}>{name}</div>
          {date && (
            <div className={styles.date}>
              <span>•</span>
              {date}
            </div>
          )}
        </>
      ) : (
        <div className="flex-vertical">
          <div className={styles.name}>{name}</div>
          {date && <div className={styles.date}>2023-10-10</div>}
        </div>
      )}
    </div>
  )
}
