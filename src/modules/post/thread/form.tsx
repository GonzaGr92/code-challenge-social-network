import { useState } from 'react'

import { Button } from '@/components/button'

import styles from './form.module.scss'

export const ThreadCommentForm = () => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={styles.threadForm}>
      <input
        type="text"
        placeholder="Join the conversation"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <div className={styles.actions}>
          <Button size="small">Comment</Button>
        </div>
      )}
    </div>
  )
}
