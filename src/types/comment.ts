export interface Comment {
  createdAt: string
  name: string
  avatar: string
  id: string
  content: string
  parentId: null | string
}

export interface NestedComment extends Comment {
  children: NestedComment[]
}

export type NewComment = Omit<Comment, 'id' | 'createdAt'>
