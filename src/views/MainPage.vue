<template>
  <header class="main-header">
    Habit Management
    <img src="/logo.png" alt="App Logo" class="header-logo" />
  </header>
  <div class="main-flexbox">
    <div class="day-navigation">
      <DayNavigation :date="currentDate" />
      <HabitList :date="currentDate" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import DayNavigation from '../components/DayNavigation.vue'
import HabitList from '../components/HabitList.vue'

const { date } = defineProps(['date'])
const currentDate = ref(date)
</script>

<style scoped>
.main-header {
  background-color: var(--highlight-color);
  color: var(--secondary-color);
  padding: 12px 0;
  text-align: center;
  font-size: 1.3em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
}

.main-flexbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  max-width: 100%;
}

.day-navigation {
  max-width: 100%;
  color: var(--third-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--secondary-color);
}

.header-logo {
  height: 80px;
  width: auto;
  margin-right: 10px;
  vertical-align: middle;
  background-color: var(--third-color);
}
</style>
