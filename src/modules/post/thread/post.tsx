import { ArrowLeft, Ellipsis, MessageCircle } from 'lucide-react'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'

import styles from './post.module.scss'

export const ThreadPost = () => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <Button size="medium" variant="secondary" icon={<ArrowLeft />} iconButton />
        <Avatar layout="vertical" />
        <div className={styles.actions}>
          <Ellipsis />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>What is Lorem Ipsum?</div>
        <div className={styles.content}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride
          Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset
          Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop
          publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
        </div>
      </div>
      <div className={styles.footer}>
        <Button size="small" variant="secondary" className={styles.comments} icon={<MessageCircle />}>
          100
        </Button>
      </div>
    </div>
  )
}
