export interface Post {
  createdAt: string
  name: string
  avatar: string
  id: string
  content: string
  title: string
}

export type NewPost = Omit<Post, 'id' | 'createdAt'>
