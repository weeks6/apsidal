<template>
  <div class="insights--container">
    <span class="text-h6">Охват</span>
    <div class="q-gutter-md row">
      <q-input
        v-model="sinceRef"
        dense
        filled
        type="date"
        hint="От"
        :max="today"
        @change="updateReach"
      />
      <q-input
        v-model="untilRef"
        dense
        filled
        type="date"
        hint="До"
        :max="today"
        @change="updateReach"
      />
    </div>
    <q-banner
      v-if="showReachError"
      inline-actions
      class="text-white bg-red q-mt-md"
    >
      {{ reachErrorText }}
    </q-banner>
    <div class="scroll-container insights--overflow">
      <Chart
        :size="{ width: 1024, height: 400 }"
        :data="chartData"
        :margin="margin"
        direction="horizontal"
      >
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Line :dataKeys="['endTime', 'value']" />
        </template>

        <template #widgets>
          <Tooltip
            :config="{
              endTime: { hide: true },
              value: { label: 'Охват' }
            }"
            hideLine
          />
        </template>
      </Chart>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { Grid, Chart, Line, Tooltip } from 'vue3-charts';
import { getInstagram } from '../services/instagram';

const showReachError = ref(false);
const reachErrorText = ref('');

const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});
const today = new Date().toISOString().split('T')[0];

const sinceRef = ref(null);
const untilRef = ref(null);

const reachData = ref({});
const chartData = computed(() => {
  return reachData.value.values?.map((v) => {
    const endTime = new Date(v.end_time);
    const day = endTime.getDate();
    const month = endTime.getMonth() + 1;

    return {
      endTime: `${day}.${month}`,
      value: v.value
    };
  });
});

onMounted(async () => {
  reachData.value = await getUserInsights();
});

const getUserInsights = async (since, until) => {
  const instaData = getInstagram();
  let endpoint = `https://graph.facebook.com/v13.0/${instaData.bussinessId}/insights?metric=reach&period=days_28&access_token=${instaData.token}`;

  if (!since) {
    const defaultSince = Math.round(
      new Date().setDate(new Date().getDate() - 29) / 1000
    );
    sinceRef.value = new Date(defaultSince * 1000).toISOString().split('T')[0];
    endpoint += `&since=${defaultSince}`;
  }

  if (since) {
    endpoint += `&since=${since}`;
  }

  if (until) {
    endpoint += `&until=${until}`;
  }

  try {
    const res = await (await fetch(endpoint)).json();

    if (res.error) {
      throw res.error;
    }

    showReachError.value = false;
    return res.data[0];
  } catch (error) {
    if (error.code === 100) {
      reachErrorText.value =
        'Не правильный диапазон. До и после не должны отличаться более чем на 30 дней.';
      showReachError.value = true;
    }
  }
};

const updateReach = async () => {
  const sinceTmp = new Date(sinceRef.value).getTime() / 1000;
  const untilTmp = new Date(untilRef.value).getTime() / 1000;

  reachData.value = await getUserInsights(sinceTmp, untilTmp);
};
</script>
<style>
.insights--overflow {
  overflow-y: hidden;
}
</style>
