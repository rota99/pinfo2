<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <span class="md-title">Lol progetto</span>
        </div>

        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary">
            <md-tab id="tab-dashboard" md-label="Dashboard" :to="'/'"></md-tab>
            <md-tab id="tab-profilo" md-label="Profilo" :to="'/profilo/' + this.username"></md-tab>
            <md-tab id="tab-contagi" md-label="Contagi" :to="'/contagi'"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      username: localStorage.getItem('username')
    }
  }
}
</script>

<style>
</style>
