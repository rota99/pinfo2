<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-30 md-medium-size-50 md-xsmall-size-100">
      <md-card-header>
        <span class="md-title">Login</span>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary md-raised" :disabled="!username" @click="signIn()">Sign in</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: ''
    }
  },
  methods: {
    signIn: function() {
      DataService.login(this.username);
      this.$router.push({path: '/'});
    }
  }
}
</script>

<style>
</style>
