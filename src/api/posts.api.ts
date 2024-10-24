import { httpClient } from '@/plugins/httpClient'

import type { Post, PostCreatePayload } from '@/models/Post'

export default {
  async fetchPosts() {
    const response = await httpClient.get<Post[]>('/posts')

    return response.data
  },

  async createPost(payload: PostCreatePayload) {
    const response = await httpClient.post<Post>('/posts', payload)

    return response.data
  },

  async editPost(payload: Post) {
    const response = await httpClient.put<Post>(`/posts/${payload.id}`, payload)

    return response.data
  },

  async deletePost(id: number) {
    const response = await httpClient.delete(`/posts/${id}`)

    return response.data
  },
}
