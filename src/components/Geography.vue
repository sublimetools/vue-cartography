<template>
  <path :d="geography.path"></path>
</template>

<script setup lang="ts">
const props = defineProps({
  geography: { // Object with path
    type: Object,
    required: true
  }
});
</script>