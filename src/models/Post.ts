export interface Post {
  userId: number
  title: string
  body: string
  id: number
}

export type PostCreatePayload = Omit<Post, 'id'>
