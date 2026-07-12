import { Button } from '@/components/button'

import styles from './form.module.scss'

export const PostForm = () => {
  return (
    <div className={styles.form}>
      <input className={styles.input} placeholder="Write a title..." />
      <hr />
      <textarea className={styles.textarea} placeholder="Write a comment..." rows={5} />
      <div className={styles.actions}>
        <Button>Post</Button>
      </div>
    </div>
  )
}
