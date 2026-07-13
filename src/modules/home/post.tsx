import Link from 'next/link'

import { Avatar } from '@/components/avatar'
import { Post } from '@/types/post'

import { HomeActions } from './actions'

import styles from './post.module.scss'

interface HomePostProps {
  post: Post
}

export const HomePost = ({ post }: HomePostProps) => {
  return (
    <div className={styles.post}>
      <Link href={`/post/${post.id}`} className={styles.mainCardLink} />
      <div className={styles.header}>
        <Avatar layout="horizontal" avatar={post.avatar} name={post.name} date={post.createdAt} />
        <HomeActions post={post} />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.content}>{post.content}</div>
      </div>
      {/* Button/Tag to show how much comment the post have, currently there's no counter for post, get the number from comments is expensive */}
      {/* <div className={styles.footer}>
        <Button size="small" variant="secondary" className={styles.comments} icon={<MessageCircle />}>
          100
        </Button>
      </div> */}
    </div>
  )
}
