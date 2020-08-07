<template>
  <md-card id="copertina" class="md-small-size-100">
    <md-card-media-cover md-text-scrim>
      <md-card-media md-ratio="16:9">
        <img id="cover" :src="coverPic" />
      </md-card-media>

      <md-card-area>
        <div class="containerImgName">
          <md-avatar class="md-large" id="avatarCopertina">
            <img :src="propic" />
          </md-avatar>

          <md-card-header>
            <span class="md-title-pers">{{ username }}</span>
            <span id='bio' class="md-subhead">{{ bio }}</span>
          </md-card-header>
        </div>

        <md-card-actions>
          <md-menu md-size="big" md-direction="bottom-end">
            <md-button class="md-icon-button" md-menu-trigger :disabled="username != realUser">
              <md-icon id="iconMoreVert" v-if="username == realUser">more_vert</md-icon>
            </md-button>

            <!--Dialog per Modifica immagine di profilo-->
            <md-menu-content>
              <md-menu-item @click="$emit('showDialogProPic')">
                <span>Modifica l'immagine<br />di profilo</span>
                <md-icon>insert_photo</md-icon>
              </md-menu-item>

              <!--Dialog per Modifica immagine di profilo-->
              <md-menu-item @click="$emit('showDialogCoverPic')">
                <span>Modifica l'immagine<br />di copertina</span>
                <md-icon>wallpaper</md-icon>
              </md-menu-item>

              <!--Dialog per Modifica immagine di profilo-->
              <md-menu-item @click="$emit('showDialogBio')">
                <span>Modifica la bio</span>
                <md-icon>edit</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-actions>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
import DataService from '../dataservice';

export default {
  props: [
    'propic'
  ],
  data: function() {
    return {
      username: this.$route.params.username,
      realUser: localStorage.getItem('username'),
      coverPic: null,
      bio: null
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.getCoverPic();
      this.getBio();
    },
    getCoverPic: function() {
      this.coverPic = null;

      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.coverPic = doc.data().coverPic;
        });
      });
    },
    //funzione per salvare la bio dell'utente
    getBio: function() {
      this.bio = null;

      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.bio = doc.data().bio;
        });
      });
    }
  }
}
</script>
