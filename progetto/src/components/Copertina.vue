<template>
  <md-card id="copertina" class="md-small-size-100">
    <!--MEDIA-->
    <md-card-media-cover md-text-scrim>
      <md-card-media md-ratio="16:9">
        <img id="cover" :src="coverPic" />
      </md-card-media>

      <md-card-area>
        <div class="containerImgName">
          <md-avatar class="md-large" id="avatarCopertina">
            <img :src="propic" />
          </md-avatar>

          <!--HEADER-->
          <md-card-header>
            <span class="md-title-pers">{{ username }}</span>
            <span id='bio' class="md-subhead">{{ bio }}</span>
          </md-card-header>
        </div>

        <!--ACTIONS-->
        <md-card-actions>
          <md-menu md-size="big" md-direction="bottom-end">
            <md-button class="md-icon-button" md-menu-trigger :disabled="username != realUser">
              <md-icon id="iconMoreVert" v-if="username == realUser">more_vert</md-icon>
            </md-button>

            <!--MENU-->
            <md-menu-content>
              <md-menu-item @click="$emit('showDialogProPic')">
                <span>Modifica l'immagine<br />di profilo</span>
                <md-icon>insert_photo</md-icon>
              </md-menu-item>

              <md-menu-item @click="$emit('showDialogCoverPic')">
                <span>Modifica l'immagine<br />di copertina</span>
                <md-icon>wallpaper</md-icon>
              </md-menu-item>

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
  //dati passati dall'elemento genitore
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
    //funzione per salvare in una variabile locale l'indirizzo dell'immagine di copertina
    getCoverPic: function() {
      this.coverPic = null;

      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.coverPic = doc.data().coverPic;
        });
      });
    },
    //funzione per salvare in una variabile locale la bio dell'utente
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

<style>
@media only screen and (max-device-width: 399px) {
  #iconMoreVert {
    color: rgba(0,0,0,0.54) !important;
    fill: rgba(0,0,0,0.54);
  }

  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    margin-top: 16px;
    padding: 0px;
    border: none;
    width: 90%;
    height: 300px;
    background-color: white;
    box-shadow: none;
  }

  #cover {
    object-fit: cover;
    margin: 0px;
    padding: 0px;
    border: none;
    height: 150px;
    top: 30%;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    margin-top: -75px;
    flex-direction: column;
    width: 100%;
    text-align: center;
    color: rgba(0,0,0,0.87);
    position: absolute;
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }

  #bio {
    width: 75%;
  }
}

@media only screen and (min-device-width: 400px) and (max-device-width: 699px) {
  #iconMoreVert {
    color: rgba(0,0,0,0.54) !important;
    fill: rgba(0,0,0,0.54);
  }

  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    margin-top: 16px;
    padding: 0px;
    border: none;
    width: 90%;
    height: 315px;
    background-color: white;
    box-shadow: none;
  }

  #cover {
    object-fit: cover;
    margin: 0px;
    padding: 0px;
    border: none;
    height: 250px;
    top: 30%;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    margin-top: -30px;
    flex-direction: column;
    width: 100%;
    text-align: center;
    color: rgba(0,0,0,0.87);
    position: absolute;
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }

  #bio {
    width: 75%;
  }
}

@media only screen and (min-device-width: 700px) and (max-device-width: 1060px) {
  #iconMoreVert {
    color: rgba(0,0,0,0.54) !important;
    fill: rgba(0,0,0,0.54);
  }

  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    margin-top: 16px;
    padding: 0px;
    border: none;
    width: 90%;
    height: 350px;
    background-color: white;
    box-shadow: none;
  }

  #cover {
    object-fit: cover;
    margin: 0px;
    padding: 0px;
    border: none;
    height: 250px;
    top: 30%;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    margin-top: -75px;
    flex-direction: column;
    width: 100%;
    text-align: center;
    color: rgba(0,0,0,0.87);
    position: absolute;
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 128px;
    height: 128px;
    border-radius: 128px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }
}

@media only screen and (min-device-width: 1061px) {
  #iconMoreVert {
    color: #fff;
    fill: rgba(0,0,0,0.54);
  }

  .containerImgName {
    display: flex;
    align-items: flex-start;
    margin-top: -25px;
    position: absolute;
  }

  #copertina {
    margin: 0px;
    margin-top: 16px;
    padding: 0px;
    border: none;
    width: 90%;
    height: 300px;
    background-color: white;
    box-shadow: none;
  }

  #cover {
    object-fit: cover;
    margin: 0px;
    padding: 0px;
    border: none;
    height: 250px;
    border-radius: 2px;
    border: 0px solid transparent;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 128px;
    height: 128px;
    border-radius: 128px;
    border: 5px solid white;
  }

  .md-title-pers {
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
  }
}
</style>
