import { ThreadComment } from './comment'
import { ThreadCommentForm } from './form'
import { ThreadPost } from './post'

import styles from './thread.module.scss'

export const PostThread = () => {
  return (
    <div className={styles.thread}>
      <div className={styles.post}>
        <ThreadPost />
      </div>
      <div className={styles.form}>
        <ThreadCommentForm />
      </div>
      <div className={styles.comments}>
        <ThreadComment />
        <ThreadComment />
      </div>
    </div>
  )
}
