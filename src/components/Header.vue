<template>
  <q-header elevated>
    <q-toolbar>
      <div class="q-gutter-sm">
        <q-btn flat>
          <router-link class="router-link" to="/">Apsidal</router-link>
        </q-btn>
        <q-btn flat v-if="!user">
          <router-link class="router-link" to="/login">Войти</router-link>
        </q-btn>
        <q-btn flat v-if="!user">
          <router-link class="router-link" to="/register">
            Регистрация
          </router-link>
        </q-btn>

        <template v-if="user">
          <q-btn flat>
            <router-link class="router-link" to="/profile">
              Профиль
            </router-link>
          </q-btn>
          <!-- 
          <q-btn flat>
            <router-link class="router-link" to="/stories">
              Истории
            </router-link>
          </q-btn> -->
          <q-btn flat>
            <router-link class="router-link" to="/gallery">
              Галерея
            </router-link>
          </q-btn>

          <q-btn label="Выйти" color="secondary" @click="signOutOnClick">
          </q-btn>
        </template>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = inject('user');
console.log(user);

const signOutOnClick = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    localStorage.clear();
    router.push({ name: 'login' });
  } catch (error) {
    console.log(error);
  }
};
</script>
