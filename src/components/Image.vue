<template>
  <div class="image">
    <img loading="lazy" :src="image" alt="" class="img" />
  </div>
</template>
<script setup>
const props = defineProps({
  image: {
    type: String
  }
});
</script>
<style>
.img {
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
}
</style>
