import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/button'
import { UserPicker } from '@/components/user-picker'
import { useCreateComment, useGetPlainComments } from '@/hooks/api/comment'
import { useGetPost } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { useUserSettingsStore } from '@/store/user'

import styles from './form.module.scss'

interface ThreadCommentFormProps {
  postId: string
  parentId: string | null
  placeholder?: string
  className?: string
  onCancel?: () => void
}

export const ThreadCommentForm = ({ postId, parentId, placeholder, className, onCancel }: ThreadCommentFormProps) => {
  const { selectedUser } = useUserSettingsStore()
  const [isFocused, setIsFocused] = useState(false)
  const [content, setContent] = useState('')

  const { data: post } = useGetPost(postId)
  const { data: comments, isLoading: isLoadingComments } = useGetPlainComments(postId)
  const { mutateAsync: createComment, isPending: isCreating } = useCreateComment()

  const onCreateComment = async () => {
    if (!selectedUser) {
      toast('You have to select a user first', { type: 'warning' })
      return
    }

    try {
      await createComment({
        postId,
        comment: { name: selectedUser.name, avatar: selectedUser.avatar, content, parentId },
      })
      toast('Comment created', { type: 'success' })
    } catch (error) {
      toast('There was an error trying to create the comment. Please retry later.', { type: 'error' })
    }
  }

  return (
    <div className={`${styles.threadForm} ${className ? className : ''}`}>
      <input
        type="text"
        placeholder={placeholder ?? 'Join the conversation'}
        onFocus={() => setIsFocused(true)}
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      {isFocused && (
        <div className={styles.actions}>
          <div className={styles.writter}>
            <span>Commenting as</span>
            {isLoadingComments ? (
              <Loading size="small" />
            ) : (
              <UserPicker size="small" comments={comments} posts={[post]} />
            )}
          </div>
          <div className={styles.buttons}>
            {isCreating ? (
              <Loading size="small" />
            ) : (
              <>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    setIsFocused(false)
                    onCancel?.()
                  }}
                >
                  Cancel
                </Button>
                <Button size="small" disabled={!content || !selectedUser} onClick={onCreateComment}>
                  Comment
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
