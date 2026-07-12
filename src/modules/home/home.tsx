import { Fragment } from 'react/jsx-runtime'

import { Post } from '@/types/post'

import { HomePost } from './post'

import styles from './home.module.scss'

interface HomeProps {
  posts: Post[]
}

export const Home = ({ posts }: HomeProps) => {
  return (
    <div className={styles.home}>
      {posts.map((post, index) => (
        <Fragment key={`home-${post.id}`}>
          <HomePost post={post} />
          {index + 1 < posts.length && <hr />}
        </Fragment>
      ))}
    </div>
  )
}
