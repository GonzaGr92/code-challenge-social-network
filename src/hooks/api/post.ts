import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { HOST_ID, POST_CACHE_KEY_NAMESPACE } from '@/constants'
import { NewPost, Post } from '@/types/post'

// Fetchers

async function getPosts() {
  const { data } = await axios.get(`https://${HOST_ID}.mockapi.io/post`)
  return data
}

async function getPost(id: string) {
  if (!id) {
    throw new Error('Post ID is required')
  }

  const { data } = await axios.get(`https://${HOST_ID}.mockapi.io/post/${id}`)
  return data
}

async function createPost(post: NewPost): Promise<Post> {
  const { data } = await axios.post(`https://${HOST_ID}.mockapi.io/post`, post)
  return data
}

async function deletePost(id: string): Promise<void> {
  const { data } = await axios.delete(`https://${HOST_ID}.mockapi.io/post/${id}`)
  return data
}

// Hooks

export const useGetPosts = () => {
  return useQuery({
    queryKey: [POST_CACHE_KEY_NAMESPACE, 'useGetPosts'],
    queryFn: getPosts,
  })
}

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: [POST_CACHE_KEY_NAMESPACE, 'useGetPost', id],
    queryFn: () => getPost(id),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // TODO: Add the new post intead of invalidate the query to avoid refetching all posts
      queryClient.invalidateQueries({ queryKey: [POST_CACHE_KEY_NAMESPACE, 'useGetPosts'] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // TODO: Remove the deleted post intead of invalidate the query to avoid refetching all posts
      queryClient.invalidateQueries({ queryKey: [POST_CACHE_KEY_NAMESPACE, 'useGetPosts'] })
    },
  })
}
