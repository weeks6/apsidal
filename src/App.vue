<script setup>
import Page from './components/Page.vue';

import {
  FacebookAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential
} from 'firebase/auth';
import { inject, provide, ref } from 'vue';
import { setInstagram } from './services/instagram';
const auth = getAuth();

const user = ref(auth.currentUser);
const facebookToken = localStorage.getItem('facebook_token');

provide('user', user);
provide('facebook_token', facebookToken);

const authFacebook = async () => {
  const credential = FacebookAuthProvider.credential(facebookToken);
  try {
    const result = await signInWithCredential(auth, credential);
    const creds = FacebookAuthProvider.credentialFromResult(result);
    console.log({ creds });

    const token = creds.accessToken;

    const instaLoginUrl = `https://graph.facebook.com/v13.0/me/accounts?access_token=${token}`;

    const instaResult = await fetch(instaLoginUrl);

    const instaData = await instaResult.json();

    const acc = instaData.data[0];
    if (acc) {
      const token = acc.access_token;
      const id = acc.id;
      const instaBusinessAccLink = `https://graph.facebook.com/v13.0/${id}?fields=instagram_business_account&access_token=${token}`;

      const businessAcc = await (await fetch(instaBusinessAccLink)).json();
      const businessId = businessAcc.instagram_business_account.id;

      setInstagram(token, id, businessId);
    }
  } catch (error) {
    console.log(error);
  }
};

if (facebookToken) {
  authFacebook();
}

onAuthStateChanged(auth, (authed) => {
  console.log({ authed });
  if (authed) {
    user.value = authed;
  } else {
    user.value = null;
  }
});
</script>

<template>
  <Page />
</template>

<style>
::-webkit-scrollbar-thumb {
  background: gainsboro;
}

::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

.router-link {
  color: inherit;
  text-decoration: none;
}

.scroll-container {
  max-width: 100%;
  overflow: auto;
}
</style>
