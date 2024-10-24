<template>
  <TransitionGroup name="list" tag="ul" class="flex flex-col gap-6">
    <li
      v-for="post in posts"
      :key="post.id"
      class="flex flex-col gap-2 p-6 rounded-2xl bg-gray-300"
    >
      <div class="flex justify-between gap-2">
        <div class="text-lg font-bold">{{ post.title }}</div>
        <div class="flex gap-2">
          <AppButton @click="editPost(post)">Edit</AppButton>
          <AppButton
            view="danger"
            :is-loading="deletedPostId === post.id"
            @click="deletePost(post.id)"
          >
            Delete
          </AppButton>
        </div>
      </div>
      <div>{{ post.body }}</div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { usePostsStore } from '@/stores/posts'

import type { Post } from '@/models/Post'

import AppButton from './common/AppButton.vue'

defineProps<{ posts: Post[] }>()

const emit = defineEmits<{
  'edit-post': [post: Post]
}>()

const postsStore = usePostsStore()

const deletedPostId = ref<number>()

const editPost = (post: Post) => {
  emit('edit-post', post)
}

const deletePost = async (id: number) => {
  deletedPostId.value = id

  try {
    await postsStore.deletePost(id)
  } catch (error) {
    console.error(error)
  } finally {
    deletedPostId.value = undefined
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
