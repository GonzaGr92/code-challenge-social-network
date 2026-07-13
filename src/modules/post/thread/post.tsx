import { toast } from 'react-toastify'
import { Ellipsis, MessageCircle, Trash } from 'lucide-react'
import { useRouter } from 'next/router'

import { Avatar } from '@/components/avatar'
import { BackButton } from '@/components/back-button'
import { Button } from '@/components/button'
import { Dropdown } from '@/components/dropdown'
import { useDeletePost } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { Post } from '@/types/post'

import styles from './post.module.scss'

interface PostThreadProps {
  post: Post
  comments_counter: number | null
}

const Actions = ({ postId }: { postId: string }) => {
  const router = useRouter()
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()

  const onDelete = async (postId: string) => {
    if (confirm('Do you want to delete this post?')) {
      try {
        await deletePost(postId)
        toast('Post has been deleted', { type: 'success' })
        router.push('/')
      } catch (error) {
        toast('There was problem deleting the post. Please try again later', { type: 'error' })
      }
    }
  }

  return (
    <div className={styles.actions}>
      {isDeleting ? (
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
                <Button variant="text" icon={<Trash />} fullWidth onClick={() => onDelete(postId)}>
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

export const ThreadPost = ({ post, comments_counter }: PostThreadProps) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <BackButton className={styles.backButton} />
        <Avatar layout="vertical" name={post.name} avatar={post.avatar} date={post.createdAt} />
        <Actions postId={post.id} />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.content}>{post.content}</div>
      </div>
      <div className={styles.footer}>
        {comments_counter && (
          <Button size="small" variant="secondary" className={styles.comments} icon={<MessageCircle />}>
            {comments_counter}
          </Button>
        )}
      </div>
    </div>
  )
}
