import { useState } from 'react'
import { toast } from 'react-toastify'
import { MessageCircle, Trash } from 'lucide-react'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { ToggleButton } from '@/components/toggle-button'
import { useDeleteComment } from '@/hooks/api/comment'
import { Loading } from '@/icons/loading'
import { useUserSettingsStore } from '@/store/user'
import { NestedComment } from '@/types/comment'

import { ThreadCommentForm } from './form'

import styles from './comment.module.scss'

interface ThreadCommentProps {
  comment: NestedComment
  postId: string
  isParent?: boolean
  isHidden?: boolean
}

export const ThreadComment = ({ comment, postId, isParent, isHidden }: ThreadCommentProps) => {
  const { selectedUser } = useUserSettingsStore()

  const [hideChildren, setHideChildren] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment()

  const onDelete = async (postId: string, commentId: string) => {
    if (confirm('Do you want to delete this post?')) {
      try {
        await deleteComment({ postId, commentId })
        toast('Comment has been deleted', { type: 'success' })
      } catch (error) {
        toast('There was problem deleting the comment. Please try again later', { type: 'error' })
      }
    }
  }

  return (
    <div className={`${styles.comment} ${isParent ? styles.parent : ''}`} hidden={isHidden}>
      <div className={styles.header}>
        <Avatar layout="horizontal" name={comment.name} avatar={comment.avatar} date={comment.createdAt} />
      </div>

      <div className={styles.content}>
        {comment.content}
        {showForm && (
          <ThreadCommentForm
            postId={postId}
            parentId={comment.id}
            placeholder="Write something"
            className={styles.form}
            onCancel={() => setShowForm(false)}
            onSuccess={() => setShowForm(false)}
          />
        )}
      </div>

      <div className={styles.footer}>
        {comment.children && comment.children.length > 0 ? (
          <ToggleButton
            status={hideChildren ? 'collapsed' : 'expanded'}
            onClick={() => setHideChildren(!hideChildren)}
          />
        ) : null}

        {!showForm && (
          <Button size="small" icon={<MessageCircle />} variant="text" onClick={() => setShowForm(true)}>
            Reply
          </Button>
        )}

        {isDeleting ? (
          <Loading size="small" />
        ) : selectedUser?.name === comment.name ? (
          <Button size="small" icon={<Trash />} variant="text" onClick={() => onDelete(postId, comment.id)}>
            Delete
          </Button>
        ) : null}
      </div>
      {comment.children && comment.children.length > 0
        ? comment.children.map(children_comment => (
            <ThreadComment key={comment.id} comment={children_comment} isHidden={hideChildren} postId={postId} />
          ))
        : null}
    </div>
  )
}
