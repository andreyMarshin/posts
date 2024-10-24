<template>
  <main class="flex flex-col gap-6 w-full max-w-screen-md">
    <div
      class="sticky top-0 flex items-center justify-between px-6 py-4 bg-slate-700 rounded-b-2xl"
    >
      <div class="w-full text-xl font-bold text-white">Posts</div>
      <AppButton view="secondary" @click="createPost"> Create </AppButton>
    </div>
    <div v-if="fetchPostsIsLoading" class="text-xl px-6">
      Posts is loading...
    </div>
    <PostList v-else :posts="posts" @edit-post="editPost" />
    <PostFormModal
      :is-shown="postModalIsShown"
      :post="editedPost"
      @hide="hidePostModal"
    />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { usePostsStore } from '@/stores/posts'

import type { Post } from '@/models/Post'

import AppButton from '@/components/common/AppButton.vue'
import PostList from '@/components/PostList.vue'
import PostFormModal from '@/components/PostFormModal.vue'

const postsStore = usePostsStore()

const { posts } = storeToRefs(postsStore)

const postModalIsShown = ref(false)
const fetchPostsIsLoading = ref(false)
const editedPost = ref<Post | null>(null)

const showPostModal = () => {
  postModalIsShown.value = true
}

const hidePostModal = () => {
  postModalIsShown.value = false
}

const createPost = () => {
  editedPost.value = null

  showPostModal()
}

const editPost = (post: Post) => {
  editedPost.value = post

  showPostModal()
}

const fetchPosts = async () => {
  fetchPostsIsLoading.value = true

  try {
    await postsStore.fetchPosts()
  } catch (error) {
    console.error(error)
  } finally {
    fetchPostsIsLoading.value = false
  }
}

fetchPosts()
</script>
