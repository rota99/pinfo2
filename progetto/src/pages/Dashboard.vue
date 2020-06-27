<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-large-size-66">
      <md-card>
        <md-card-header>
          <md-avatar>
            <!--struttura dell'immagine <img :src="url" />.
            l'url va preso dal db, quindi va fatta una funzione getUserInfo() in dataservice che recupera le informazioni
            dell'utente sapendo il suo username-->
            <img>
          </md-avatar>
          <span class="md-title">{{ username }}</span>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Scrivi qualcosa...</label>
            <md-textarea v-model="postContent" md-autogrow></md-textarea>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button">
            <md-icon>send</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>

      <md-empty-state
        md-rounded
        md-icon="access_time"
        md-label="Nothing in Snoozed"
        md-description="Anything you snooze will go here until it's time for it to return to the inbox.">
      </md-empty-state>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      postContent: null
    }
  }
}
</script>

<style>
</style>
