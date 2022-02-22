<template>
  <h4>Регистрация</h4>
  <q-form @submit="createUser">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input
        v-model="email"
        label="Email"
        dense
        type="email"
        :rules="[
          (val) => (val && val.length > 0) || 'Поле не может быть пустым'
        ]"
      />
      <q-input
        v-model="password"
        label="Пароль"
        dense
        type="password"
        :rules="[
          (val) => (val && val.length > 0) || 'Поле не может быть пустым'
        ]"
      />
      <q-btn color="primary" type="submit">Продолжить</q-btn>
    </div>
  </q-form>
</template>
<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');

const createUser = async () => {
  const auth = getAuth();

  try {
    const creds = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = creds.user;
    console.log({ user });
  } catch (error) {
    console.log(error);
  }
};
</script>
