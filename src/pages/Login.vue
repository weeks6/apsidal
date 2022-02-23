<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-6 col-md-4">
      <h4>Вход</h4>
      <q-form @submit="signIn">
        <div class="q-gutter-y-md column">
          <q-input v-model="email" label="Email" dense type="email" />
          <q-input v-model="password" label="Пароль" dense type="password" />
          <q-btn color="primary" type="submit">Войти</q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const auth = getAuth();

const signIn = async () => {
  try {
    const authed = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = authed.user;

    router.push({ name: 'profile' });
  } catch (error) {
    console.log(error);
  }
};
</script>
