<template>
  <button>{{ props.value }}</button>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    value: string;
  }>();
</script>
