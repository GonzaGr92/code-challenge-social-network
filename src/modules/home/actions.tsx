import { useState } from 'react'
import { toast } from 'react-toastify'
import { Ellipsis, Trash } from 'lucide-react'

import { Button } from '@/components/button'
import { Dropdown } from '@/components/dropdown'
import { useDeletePost } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { useUserSettingsStore } from '@/store/user'
import { Post } from '@/types/post'

import styles from './actions.module.scss'

interface HomeActionsProps {
  post: Post
}

export const HomeActions = ({ post }: HomeActionsProps) => {
  const { selectedUser } = useUserSettingsStore()
  const [deletingPostId, setDeletingPostId] = useState<string | undefined>()

  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()

  const onDelete = async (postId: string) => {
    if (confirm('Do you want to delete this post?')) {
      try {
        setDeletingPostId(postId)
        await deletePost(postId)
        toast('Post has been deleted', { type: 'success' })
      } catch (error) {
        toast('There was problem deleting the post. Please try again later', { type: 'error' })
      } finally {
        setDeletingPostId(undefined)
      }
    }
  }

  if (!(selectedUser?.name === post.name)) {
    return null
  }

  return (
    <div className={styles.actions}>
      {deletingPostId === post.id && isDeleting ? (
        <Loading size="small" />
      ) : (
        <Dropdown
          className={styles.dropdown}
          buttonProps={{ variant: 'outline' }}
          icon={<Ellipsis />}
          options={[
            {
              value: '0',
              label: (
                <Button variant="text" fullWidth href={`/post/${post.id}`}>
                  Show
                </Button>
              ),
            },
            {
              value: '2',
              label: (
                <Button variant="text" icon={<Trash />} fullWidth onClick={() => onDelete(post.id)}>
                  Delete
                </Button>
              ),
            },
          ]}
        />
      )}
    </div>
  )
}
