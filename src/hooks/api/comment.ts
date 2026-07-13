import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { COMMENT_CACHE_KEY_NAMESPACE, HOST_ID } from '@/constants'
import { Comment, NestedComment, NewComment } from '@/types/comment'
import { buildCommentTree } from '@/utils/builder'
import { mostRecentFirst } from '@/utils/date'

// Fetchers

async function getPlainComments(postId: string): Promise<Comment[]> {
  if (!postId) {
    throw new Error('Post ID is required')
  }

  const { data } = await axios.get<Comment[]>(`https://${HOST_ID}.mockapi.io/post/${postId}/comment`)

  return data.sort(mostRecentFirst)
}

async function getComments(postId: string): Promise<NestedComment[]> {
  if (!postId) {
    throw new Error('Post ID is required')
  }

  const { data } = await axios.get<Comment[]>(`https://${HOST_ID}.mockapi.io/post/${postId}/comment`)

  if (data) {
    return buildCommentTree(data).sort(mostRecentFirst)
  }

  return data
}

async function createComment(postId: string, comment: NewComment): Promise<Comment> {
  if (!postId) {
    throw new Error('Post ID is required')
  }

  const { data } = await axios.post(`https://${HOST_ID}.mockapi.io/post/${postId}/comment`, comment)
  return data
}

async function deleteComment(postId: string, commentId: string): Promise<Comment> {
  if (!postId) {
    throw new Error('Post ID is required')
  }

  if (!commentId) {
    throw new Error('Comment ID is required')
  }

  const { data } = await axios.delete(`https://${HOST_ID}.mockapi.io/post/${postId}/comment/${commentId}`)
  return data
}

// Hooks

export const useGetPlainComments = (postId: string) => {
  return useQuery({
    queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetPlainComments', postId],
    queryFn: () => getPlainComments(postId),
  })
}

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetComments', postId],
    queryFn: () => getComments(postId),
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: NewComment }) => createComment(postId, comment),
    onSuccess: (_, { postId }) => {
      // TODO: Add the new post intead of invalidate the query to avoid refetching all posts
      queryClient.invalidateQueries({ queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetPlainComments', postId] })
      queryClient.invalidateQueries({ queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetComments', postId] })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, commentId }: { postId: string; commentId: string }) => deleteComment(postId, commentId),
    onSuccess: (_, { postId }) => {
      // TODO: Search and remove the comment from the cache instead of invalidate the query to avoid refetching all comments
      queryClient.invalidateQueries({ queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetPlainComments', postId] })
      queryClient.invalidateQueries({ queryKey: [COMMENT_CACHE_KEY_NAMESPACE, 'useGetComments', postId] })
    },
  })
}
