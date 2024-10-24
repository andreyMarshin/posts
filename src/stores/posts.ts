import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post, PostCreatePayload } from '@/models/Post'
import postsApi from '@/api/posts.api'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])

  const fetchPosts = async () => {
    posts.value = await postsApi.fetchPosts()
  }

  const createPost = async (payload: PostCreatePayload) => {
    const createdPost = await postsApi.createPost(payload)

    posts.value.unshift(createdPost)
  }

  const editPost = async (payload: Post) => {
    const editedPostIdx = posts.value.findIndex(({ id }) => id === payload.id)

    if (editedPostIdx === -1) return

    await postsApi.editPost(payload)

    posts.value[editedPostIdx] = payload
  }

  const deletePost = async (postId: number) => {
    const deletedPostIdx = posts.value.findIndex(({ id }) => id === postId)

    if (deletedPostIdx === -1) return

    await postsApi.deletePost(postId)

    posts.value.splice(deletedPostIdx, 1)
  }

  return {
    posts,
    fetchPosts,
    createPost,
    editPost,
    deletePost,
  }
})
