import { useGetComments } from '@/hooks/api/comment'
import { Loading } from '@/icons/loading'
import { Post } from '@/types/post'

import { ThreadComment } from './comment'
import { ThreadCommentForm } from './form'
import { ThreadPost } from './post'

import styles from './thread.module.scss'

interface PostThreadProps {
  post: Post
}

export const PostThread = ({ post }: PostThreadProps) => {
  const { data, isLoading, error } = useGetComments(post.id)

  return (
    <div className={styles.thread}>
      <div className={styles.post}>
        <ThreadPost post={post} comments_counter={data?.length || null} />
      </div>
      <div className={styles.form}>
        <ThreadCommentForm parentId={null} postId={post.id} />
      </div>
      <div className={styles.comments}>
        {isLoading ? (
          <Loading size="medium" />
        ) : error || !data ? (
          'Not able to get comments please retry later'
        ) : data.length <= 0 ? (
          'Not comments yet, be the first'
        ) : (
          data.map(comment => <ThreadComment key={comment.id} comment={comment} isParent={true} postId={post.id} />)
        )}
      </div>
    </div>
  )
}
