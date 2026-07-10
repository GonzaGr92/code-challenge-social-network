export interface Comment {
  createdAt: string
  name: string
  avatar: string
  id: string
  content: string
  parentId: null | string
}

export type NewComment = Omit<Comment, 'id' | 'createdAt'>
