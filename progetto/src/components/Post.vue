<template>
  <md-card class="md-layout md-alignment-top-right addMargin">
    <!--HEADER-->
    <md-card-header class="md-layout-item md-size-100">
      <md-avatar>
        <img :src="propic"/>
      </md-avatar>
      <md-card-header-text>
        <div id="titlePers" class="md-title">{{ username }}</div>
        <div id="subheadPers" class="md-subhead">{{ date }}</div>
      </md-card-header-text>
    </md-card-header>

    <!--CONTENT-->
    <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
      <span>{{ content }}</span>
    </md-card-content>

    <!--ACTIONS-->
    <md-card-actions class="md-layout-item md-size-100">
      <md-button class="md-icon-button" @click="deletePost(postID)" v-if="this.$route.name == 'Profilo'">
        <md-icon>delete</md-icon>
      </md-button>

      <md-button class="md-icon-button" @click="addLike(postID)" v-if="!likedList.includes(postID)">
        <md-icon>favorite</md-icon>
      </md-button>

      <md-button class="md-icon-button" @click="removeLike(postID)" v-if="likedList.includes(postID)">
        <md-icon style="color: var(--md-theme-default-accent); fill: var(--md-theme-default-accent)">favorite</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import DataService from '../dataservice';

export default {
  //dati passati dall'elemento genitore
  props: [
    'username',
    'date',
    'content',
    'propic',
    'postID'
  ],
  data: function() {
    return {
      likedList: []
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.getLikes();
    },
    //funzione per recuperare la lista dei mi piace messi dall'utente
    getLikes() {
      DataService.getLiked().then(data => {
        this.likedList = data.slice();
      });
    },
    //funzione per aggiungere un like
    addLike(postID) {
      DataService.addLike(postID);
      this.getLikes();
    },
    //funzione per rimuovere un like
    removeLike(postID) {
      DataService.removeLike(postID);
      this.getLikes();
    },
    //funzione per eliminare un post
    deletePost: function(docID) {
      DataService.deletePost(docID).then(() => {
        this.$emit('postDeleted');
      });
    }
  }
}
</script>

<style>
#titlePers, #subheadPers {
  font-size: 14px;
}

#titlePers {
  font-weight: 500;
}
</style>
