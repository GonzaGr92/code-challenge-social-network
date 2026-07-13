import { ArrowLeft, Ellipsis, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/router'

import { Avatar } from '@/components/avatar'
import { BackButton } from '@/components/back-button'
import { Button } from '@/components/button'
import { Post } from '@/types/post'

import styles from './post.module.scss'

interface PostThreadProps {
  post: Post
  comments_counter: number | null
}

export const ThreadPost = ({ post, comments_counter }: PostThreadProps) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <BackButton className={styles.backButton} />
        <Avatar layout="vertical" name={post.name} avatar={post.avatar} date={post.createdAt} />
        <div className={styles.actions}>
          <Ellipsis />
        </div>
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
