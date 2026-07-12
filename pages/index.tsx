import { useGetPosts } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { Home } from '@/modules/home/home'

export default function HomePage() {
  const { isLoading, error, data } = useGetPosts()

  if (isLoading) {
    return <Loading />
  }

  if (error || !data || data.length === 0) {
    return 'Not able to show content at this time, please retry later'
  }

  return <Home posts={data} />
}
