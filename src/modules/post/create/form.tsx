import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { BackButton } from '@/components/back-button'
import { Button } from '@/components/button'
import { UserPicker } from '@/components/user-picker'
import { useCreatePost, useGetPosts } from '@/hooks/api/post'
import { Loading } from '@/icons/loading'
import { useUserSettingsStore } from '@/store/user'

import styles from './form.module.scss'

export const PostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost()
  const { selectedUser } = useUserSettingsStore()
  const router = useRouter()

  const { data } = useGetPosts()

  const onCreatePost = async () => {
    if (!selectedUser) {
      toast('You have to select a user first', { type: 'warning' })
      return
    }

    try {
      const post = await createPost({ name: selectedUser.name, avatar: selectedUser.avatar, title, content })
      toast('Post created', { type: 'success' })
      router.push(`/post/${post.id}`)
    } catch (error) {
      toast('There was an error trying to create the post. Please retry later.', { type: 'error' })
    }
  }

  return (
    <div className={styles.form}>
      <BackButton className={styles.backButton} />
      <input
        className={styles.input}
        placeholder="Write a title..."
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <hr />
      <textarea
        className={styles.textarea}
        placeholder="Write a comment..."
        rows={5}
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <div className={styles.actions}>
        <div className={styles.writter}>
          <span>Writting as</span>
          <UserPicker posts={data} />
        </div>
        {isCreating ? (
          <Loading size="medium" />
        ) : (
          <Button disabled={!title || !content || !selectedUser} onClick={onCreatePost}>
            Post
          </Button>
        )}
      </div>
    </div>
  )
}
