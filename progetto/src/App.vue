<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <span class="md-title">Lol progetto</span>
        </div>

        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary">
            <md-tab id="tab-dashboard" md-label="Dashboard" :to="'/dashboard'"></md-tab>
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
.md-elevation-4 {
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
}
</style>
