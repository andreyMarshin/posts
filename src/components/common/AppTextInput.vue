<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="font-medium text-sm px-3">{{ label }}</label>
    <Component
      :is="currentComponent"
      :value="modelValue"
      v-bind="$attrs"
      class="py-2 px-3 rounded-lg bg-white border border-slate-900"
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ModelValue = string | number | null | undefined

const props = defineProps<{
  modelValue?: ModelValue
  label?: string
  useTextarea?: boolean
}>()

const emit = defineEmits<{
  'update:model-value': [value: ModelValue]
}>()

const onInput = (value: ModelValue) => {
  emit('update:model-value', value)
}

const currentComponent = computed(() =>
  props.useTextarea ? 'textarea' : 'input',
)
</script>
