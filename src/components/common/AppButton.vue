<template>
  <button v-bind="$attrs" :class="buttonClasses" @click="onClick($event)">
    <template v-if="isLoading">Loading...</template>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AppButtonView = 'primary' | 'secondary' | 'danger'

const props = withDefaults(
  defineProps<{ view?: AppButtonView; isLoading?: boolean }>(),
  { view: 'primary', isLoading: false },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const buttonClasses = computed(() => {
  const colorsMap: Record<AppButtonView, string> = {
    primary: 'bg-lime-300',
    secondary: 'bg-violet-300',
    danger: 'bg-red-300',
  }

  return ['h-fit py-2 px-3 rounded-lg hover:opacity-80', colorsMap[props.view]]
})

const onClick = (event: Event) => {
  if (props.isLoading) {
    event.stopPropagation()
    event.preventDefault()

    return
  }

  emit('click', event)
}
</script>
