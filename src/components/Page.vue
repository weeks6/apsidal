<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <Header></Header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import Header from './Header.vue';
</script>
