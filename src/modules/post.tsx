import { Button } from '@/components/button'

import styles from './post.module.scss'

export const Post = () => {
  return (
    <div className={styles.post}>
      <input className={styles.input} placeholder="Write a title..." />
      <hr />
      <textarea className={styles.textarea} placeholder="Write a comment..." rows={5} />
      <div className={styles.actions}>
        <Button>Post</Button>
      </div>
    </div>
  )
}
