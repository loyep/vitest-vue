<template>
  <div>
    <button @click="increment">{{ props.value }}</button>
    <span v-if="props.showText" data-testid="隐藏文案">隐藏文案</span>
    <p class="count">{{ count }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      value: string;
      showText?: boolean;
    }>(),
    { showText: false }
  );
  const count = ref(0);
  const increment = () => {
    count.value += 1;
    console.log('count', count.value);
  };
</script>
