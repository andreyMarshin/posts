<template>
  <Teleport to="#modals">
    <div
      v-if="isShown"
      class="fixed inset-0 flex items-center justify-center bg-gray-900/40"
    >
      <div
        class="flex flex-col gap-4 rounded-2xl bg-gray-200 w-full max-w-screen-sm p-6 mx-2"
      >
        <div class="flex flex-col gap-1">
          <div class="text-lg font-bold">{{ title }}</div>
          <div v-if="errorText" class="text-sm text-red-600">
            {{ errorText }}
          </div>
        </div>
        <form class="flex flex-col gap-4" @submit.prevent>
          <AppTextInput v-model="form.userId" label="User ID" type="number" />
          <AppTextInput v-model="form.title" label="Title" />
          <AppTextInput
            v-model="form.body"
            use-textarea
            rows="5"
            label="Body"
          />
          <div class="flex gap-2">
            <AppButton :is-loading="isLoading" @click="onSubmit">
              {{ submitButtonText }}
            </AppButton>
            <AppButton view="danger" @click="hideModal"> Cancel </AppButton>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AxiosError } from 'axios'

import type { Post, PostCreatePayload } from '@/models/Post'

import { usePostsStore } from '@/stores/posts'

import AppButton from './common/AppButton.vue'
import AppTextInput from './common/AppTextInput.vue'

const props = withDefaults(
  defineProps<{
    isShown: boolean
    post?: Post | null
  }>(),
  { post: null },
)

const emit = defineEmits(['hide'])

const postsStore = usePostsStore()

const form = ref<Partial<PostCreatePayload>>({})
const isLoading = ref(false)
const errorMessage = ref<string>()

const isEdit = computed(() => !!props.post)
const title = computed(() => (isEdit.value ? 'Edit post' : 'New post'))
const submitButtonText = computed(() => (isEdit.value ? 'Edit' : 'Create'))

const isValid = computed(() =>
  Object.values(form.value).every(value => !!value),
)

const errorText = computed(() =>
  !isValid.value ? 'All fields is required' : errorMessage.value,
)

const hideModal = () => {
  emit('hide')
}

const initForm = () => {
  form.value = {
    userId: props.post?.userId,
    title: props.post?.title,
    body: props.post?.body,
  }
}

const onSubmit = async () => {
  // validation
  if (!isValid.value) return

  isLoading.value = true

  try {
    if (props.post?.id) {
      await postsStore.editPost({
        id: props.post.id,
        ...(form.value as PostCreatePayload),
      })
    } else {
      await postsStore.createPost(form.value as PostCreatePayload)
    }

    hideModal()
  } catch (error) {
    if (error instanceof AxiosError) {
      errorMessage.value = error.message
    }

    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.isShown,
  () => {
    initForm()
  },
  { immediate: true },
)
</script>
