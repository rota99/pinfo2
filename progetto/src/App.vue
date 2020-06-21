<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Lo progetto</span>
      </md-app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
