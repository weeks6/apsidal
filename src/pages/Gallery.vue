<template>
  <h4>Галерея</h4>
  <div class="container">
    <Image
      :image="image.media_url"
      v-for="(image, index) of sortedImages"
      :key="index"
    />
  </div>
   
</template>
<script setup>
import { getAuth } from 'firebase/auth';
import { computed, ref } from 'vue';
import { getInstagram } from '../services/instagram';
import Image from '../components/Image.vue';

const auth = getAuth();
const images = ref([]);

const sortedImages = computed(() => {
  return images.value.sort(
    (a, b) => new Date(a.timestamp) >= new Date(b.timestamp)
  );
});

const instaData = getInstagram();

const instaLink = `https://graph.facebook.com/v13.0/${instaData.bussinessId}/media?access_token=${instaData.token}`;

const getImages = async () => {
  try {
    const result = await (await fetch(instaLink)).json();

    const imageIds = result.data.map((obj) => obj.id);

    imageIds.forEach(async (id) => {
      const url = `https://graph.facebook.com/v13.0/${id}?fields=media_url, timestamp&access_token=${instaData.token}`;
      const res = await (await fetch(url)).json();
      images.value.push(res);
    });
  } catch (error) {
    console.log(error);
  }
};

getImages();
</script>
<style>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

@media screen and (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
}
</style>
