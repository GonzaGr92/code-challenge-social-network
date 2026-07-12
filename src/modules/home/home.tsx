import { Fragment } from 'react/jsx-runtime'

import { useGetPosts } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'

import { HomePost } from './post'

import styles from './home.module.scss'

export const Home = () => {
  const { isLoading, error, data } = useGetPosts()

  if (isLoading) {
    return <Loading />
  }

  if (error || !data || data.length === 0) {
    return 'Not able to show content at this time, please retry later'
  }

  return (
    <div className={styles.home}>
      {data.map((post, index) => (
        <Fragment key={post.id}>
          <HomePost post={post} />
          {index + 1 < data.length && <hr />}
        </Fragment>
      ))}
    </div>
  )
}
