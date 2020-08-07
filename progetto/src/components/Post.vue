<template>
  <md-card class="md-layout md-alignment-top-right addMargin">
    <!--in questa prima parte ci vanno immagine del profilo e username-->
    <router-link :to="'/profilo/' + username" style="cursor: pointer; width: 100%; text-decoration: none; color: rgba(0,0,0,0.87);">
      <md-card-header class="md-layout-item md-size-100">
        <md-avatar>
          <img :src="propic"/>
        </md-avatar>
        <md-card-header-text>
          <div id="titlePers" class="md-title">{{ username }}</div>
          <div id="subheadPers" class="md-subhead">{{ date }}</div>
        </md-card-header-text>
      </md-card-header>
    </router-link>

    <!--Contenuto del post-->
    <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
      <span>{{ content }}</span>
    </md-card-content>

    <!--Icona per il like-->
    <md-card-actions class="md-layout-item md-size-100">
      <md-button class="md-icon-button" v-if="this.$route.name == 'Profilo' && username == realUser" @click="deletePost(postID)">
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
  props: [
    'username',
    'date',
    'content',
    'propic',
    'postID'
  ],
  data: function() {
    return {
      likedList: [],
      realUser: localStorage.getItem('username')
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.getLikes();
    },
    getLikes() {
      DataService.getLiked().then(data => {
        this.likedList = data.slice();
      });
    },
    addLike(postID) {
      DataService.addLike(postID);
      this.getLikes();
    },
    removeLike(postID) {
      DataService.removeLike(postID);
      this.getLikes();
    },
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
