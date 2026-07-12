import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { ToggleButton } from '@/components/toggle-button'
import { NestedComment } from '@/types/comment'

import styles from './comment.module.scss'

interface ThreadCommentProps {
  comment: NestedComment
  isParent?: boolean
  isHidden?: boolean
}

export const ThreadComment = ({ comment, isParent, isHidden }: ThreadCommentProps) => {
  const [hideChildren, setHideChildren] = useState(true)

  return (
    <div className={`${styles.comment} ${isParent ? styles.parent : ''}`} hidden={isHidden}>
      <div className={styles.header}>
        <Avatar layout="horizontal" name={comment.name} avatar={comment.avatar} date={comment.createdAt} />
      </div>
      <div className={styles.content}>{comment.content}</div>
      <div className={styles.footer}>
        {comment.children.length > 0 && (
          <ToggleButton
            status={hideChildren ? 'collapsed' : 'expanded'}
            onClick={() => setHideChildren(!hideChildren)}
          />
        )}
        <Button size="small" icon={<MessageCircle />} variant="text" style={{ position: 'relative', zIndex: 9 }}>
          Reply
        </Button>
      </div>
      {comment.children.length > 0
        ? comment.children.map(children_comment => (
            <ThreadComment key={comment.id} comment={children_comment} isHidden={hideChildren} />
          ))
        : null}
    </div>
  )
}
