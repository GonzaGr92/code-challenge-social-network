import { Fragment } from 'react/jsx-runtime'
import { SquarePlus } from 'lucide-react'

import { Button } from '@/components/button'
import { UserPicker } from '@/components/user-picker'
import { Post } from '@/types/post'

import { HomePost } from './post'

import styles from './home.module.scss'

interface HomeProps {
  posts: Post[]
}

export const Home = ({ posts }: HomeProps) => {
  return (
    <div className={styles.home}>
      <div className={styles.nav}>
        <UserPicker posts={posts} placeholder="Watch as" />
        <Button size="medium" variant="outline" icon={<SquarePlus />} href="/post/create">
          Create post
        </Button>
      </div>
      <hr />
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <Fragment key={`home-${post.id}`}>
            <HomePost post={post} />
            {index + 1 < posts.length && <hr />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
