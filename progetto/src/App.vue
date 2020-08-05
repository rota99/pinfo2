<template>
  <div id="app">
    <div class="page-container md-layout-column">
      <toolbar slot="md-app-toolbar"></toolbar>

      <md-content>
        <router-view></router-view>
      </md-content>
    </div>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";

export default {
  name: 'App',
  components: {
    toolbar: Toolbar
  }
}
</script>

<style>
</style>
