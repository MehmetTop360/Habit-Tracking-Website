<template>
  <div>
    <button class="special-button" @click="goToPreviousDay">Previous Day</button>
    <span>{{ currentDate }}</span>
    <button class="special-button" @click="goToNextDay" :disabled="isToday">Next Day</button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'

const { date } = defineProps(['date'])
const router = useRouter()
const currentDate = ref(date)

watch(
  () => router.currentRoute.value.params,
  (newParams) => {
    currentDate.value = newParams.date
  }
)

const goToPreviousDay = () => {
  const prevDate = new Date(currentDate.value)
  prevDate.setDate(prevDate.getDate() - 1)
  router.push(`/day/${prevDate.toISOString().slice(0, 10)}`)
}

const isToday = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return currentDate.value >= today
})

const goToNextDay = () => {
  const nextDate = new Date(currentDate.value)
  nextDate.setDate(nextDate.getDate() + 1)
  router.push(`/day/${nextDate.toISOString().slice(0, 10)}`)
}
</script>

<style scoped>
.special-button {
  background-color: var(--special-button-color);
  margin: 3px;
  width: auto;
  max-width: 100%;
}
</style>
