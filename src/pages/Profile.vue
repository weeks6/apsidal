<template>
  <h4>Профиль</h4>

  <div class="q-gutter-y-md">
    <div>{{ user?.email }}</div>
    <q-btn
      color="secondary"
      label="Войти в Instagram"
      @click="addInsta"
    ></q-btn>
  </div>

  <h5>Метрики</h5>
  <insights />
</template>
<script setup>
import { inject, ref } from 'vue';
import { FacebookAuthProvider, linkWithPopup, getAuth } from 'firebase/auth';

import Insights from '../components/Insights.vue';

const auth = getAuth();
auth.languageCode = 'ru';
const provider = new FacebookAuthProvider();
provider.addScope('pages_read_engagement');
provider.addScope('instagram_basic');
provider.addScope('pages_show_list');
provider.addScope('instagram_manage_insights');
provider.addScope('pages_read_engagement');
provider.setCustomParameters({
  display: 'popup'
});

const user = inject('user');

const addInsta = async () => {
  try {
    const result = await linkWithPopup(auth.currentUser, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(accessToken);
    localStorage.setItem('facebook_token', accessToken);
  } catch (error) {
    const credential = FacebookAuthProvider.credentialFromError(error);
    const accessToken = credential.accessToken;
    console.log(accessToken);
    localStorage.setItem('facebook_token', accessToken);
  }
};
</script>
