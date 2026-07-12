import { useRouter } from 'next/router'

import { useGetPost } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { PostThread } from '@/modules/post/thread/thread'

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, error } = useGetPost(id as string)

  if (isLoading) {
    return <Loading />
  }

  if (error || !data) {
    return 'Not able to show content at this time, please retry later'
  }

  return <PostThread post={data} />
}
