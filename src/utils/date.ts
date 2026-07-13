import { Comment } from '@/types/comment'
import { Post } from '@/types/post'

export const mostRecentFirst = (a: Post | Comment, b: Post | Comment) => {
  const dateA = new Date(a.createdAt)
  const dateB = new Date(b.createdAt)

  if (dateB > dateA) {
    return 1
  } else if (dateA > dateB) {
    return -1
  } else {
    return 0
  }
}
