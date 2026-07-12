import { MessageCircle } from 'lucide-react'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'

import styles from './comment.module.scss'

export const ThreadComment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <Avatar layout="horizontal" />
      </div>
      <div className={styles.content}>cant remember which one that is what does it look like</div>
      <div className={styles.footer}>
        <Button size="small" icon={<MessageCircle />} variant="text">
          Reply
        </Button>
      </div>
    </div>
  )
}
