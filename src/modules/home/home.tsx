import { HomePost } from './post'

import styles from './home.module.scss'

export const Home = () => {
  return (
    <div className={styles.home}>
      <HomePost />
      <hr />
      <HomePost />
    </div>
  )
}
