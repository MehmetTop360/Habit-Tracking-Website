<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/base.css');

body {
  background-color: var(--background-color);
  color: var(--main-text-color);
}
</style>
