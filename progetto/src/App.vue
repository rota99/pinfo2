<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary" md-theme="default">
        <div class="md-toolbar-section-start">
          <span class="md-title">Lol progetto</span>
        </div>

        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary">
            <md-tab id="tab-dashboard" md-label="Dashboard" to="/dashboard"></md-tab>
            <md-tab id="tab-profilo" md-label="Profilo" to="/profilo"></md-tab>
            <md-tab id="tab-contagi" md-label="Contagi" to="/contagi"></md-tab>
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
