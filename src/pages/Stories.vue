<template>
  <h4>Истории</h4>

  <q-banner v-if="showError" inline-actions class="text-white bg-red">
    {{ errorText }}
  </q-banner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getInstagram } from '../services/instagram';

const showError = ref(false);
const errorText = ref('');
const instaData = getInstagram();
const endpoint = `https://graph.facebook.com/${instaData.bussinessId}/stories?access_token=${instaData.token}`;

const getStories = async () => {
  try {
    const res = await (await fetch(endpoint)).json();
    if (res.error) {
      throw res.error;
    }
  } catch (error) {
    if (error.code === 10) {
      errorText.value =
        'Аккаунту не предоставлены необходимы права. Попробуйте войти заного.';
      showError.value = true;
    }
  }
};

onMounted(() => {
  getStories();
});
</script>
