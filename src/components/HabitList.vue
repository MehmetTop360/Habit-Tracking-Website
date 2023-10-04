<template>
  <div class="flexbox-z">
    <div class="add-habit-section">
      <input type="text" v-model="newHabit" placeholder="Add a new habit..." />
      <button class="special-button" @click="addHabit">Add Habit</button>
    </div>

    <div class="habits-section">
      <div v-for="habit in displayedHabits" :key="habit.id" class="habit-item">
        <input
          type="checkbox"
          :checked="isHabitCompleted(habit).value"
          @change="toggleCompleted(habit)"
          :disabled="habit.stopped"
        />
        <span v-if="!habit.editing" class="habit-text">{{ habit.name }}</span>
        <input
          v-if="habit.editing"
          v-model="habit.name"
          @keyup.enter="stopEditing(habit)"
          class="editable-input"
        />
        <button v-if="!habit.editing" @click="startEditing(habit)">Edit</button>
        <button v-if="habit.editing" @click="stopEditing(habit)">Save</button>
        <button @click="stopHabit(habit)">Stop</button>
        <button @click="deleteHabit(habit)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const { date } = defineProps(['date'])
const effectiveDate = date || new Date().toISOString().slice(0, 10)
const newHabit = ref('')
const globalHabits = ref(JSON.parse(localStorage.getItem('habits')) || [])
const maxId = globalHabits.value.reduce((max, habit) => Math.max(max, habit.id), 0)
const nextId = ref(maxId + 1)

const displayedHabits = computed(() =>
  globalHabits.value.filter(
    (habit) => !habit.stopped || (habit.stoppedDate && habit.stoppedDate >= effectiveDate)
  )
)

watch(
  globalHabits,
  (newHabits) => {
    localStorage.setItem('habits', JSON.stringify(newHabits))
  },
  { deep: true }
)

const isHabitCompleted = (habit) => {
  return computed(() => habit.completedDates[effectiveDate]?.done || false)
}

const addHabit = () => {
  if (newHabit.value.trim()) {
    const newHabitObj = {
      id: nextId.value++,
      name: newHabit.value.trim(),
      completedDates: {},
      stopped: false
    }
    globalHabits.value.push(newHabitObj)
    newHabit.value = ''
  }
}

const toggleCompleted = (habit) => {
  if (!habit.completedDates) habit.completedDates = {}
  if (!habit.completedDates[effectiveDate]) {
    habit.completedDates[effectiveDate] = { done: true }
  } else {
    habit.completedDates[effectiveDate].done = !habit.completedDates[effectiveDate].done
  }
}

const stopHabit = (habit) => {
  habit.stopped = true
  habit.stoppedDate = effectiveDate
}

const startEditing = (habit) => (habit.editing = true)

const stopEditing = (habit) => {
  habit.editing = false
  const index = globalHabits.value.findIndex((h) => h.id === habit.id)
  if (index !== -1) {
    globalHabits.value[index] = habit
  }
}

const deleteHabit = (habitToDelete) => {
  globalHabits.value = globalHabits.value.filter((habit) => habit.id !== habitToDelete.id)
}
</script>

<style scoped>
.flexbox-z {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add-habit-section,
.habits-section {
  max-width: 100%;
  color: var(--main-text-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
}

.habit-text {
  font-family: 'Roboto Mono', monospace;
  color: var(--main-text-color);
  display: inline-block;
  max-width: calc(100%);
  white-space: nowrap;
}

.editable-input {
  border: none;
  background: transparent;
  outline: none;
  cursor: text;
  font-family: 'Roboto Mono', monospace;
  color: var(--main-text-color);
  width: auto;
  max-width: 60px;
  white-space: nowrap;
}

input[type='text'],
.habit-item input[type='text'] {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2em;
  color: var(--main-text-color);
  background-color: transparent;
  border: none;
  border-bottom: 1px dashed var(--border-color);
  padding: 2px;
  transition: border-bottom-color 0.3s;
}

input[type='text']:focus,
.habit-item input[type='text']:focus {
  outline: none;
  border-bottom-color: var(--highlight-color);
}

input[type='text']::placeholder,
.habit-item input[type='text']::placeholder {
  color: var(--border-color);
  opacity: 0.8;
}

.habit-list {
  margin-top: 20px;
}

.habit-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.add-habit {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
