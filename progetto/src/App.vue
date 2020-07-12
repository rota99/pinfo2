<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary" md-theme="default">
        <div class="md-toolbar-section-start">
          <span class="md-title">LockedIn</span>
        </div>

        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-dashboard" md-label="Dashboard" :to="'/dashboard'"></md-tab>
            <md-tab id="tab-profilo" md-label="Profilo" :to="'/profilo/' + username"></md-tab>
            <md-tab id="tab-contagi" md-label="Contagi" :to="'/contagi/' + country"></md-tab>
          </md-tabs>
          <md-button class="md-icon-button" title="Logout" @click="logout()">
            <md-icon>exit_to_app</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import DataService from './dataservice';

export default {
  name: 'App',
  data: function() {
    return {
      username: localStorage.getItem('username'),
      country: localStorage.getItem('country')
    }
  },
  methods: {
    logout: function() {
      DataService.logout();
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style>
</style>
