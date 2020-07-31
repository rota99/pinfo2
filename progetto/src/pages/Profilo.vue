<template>
  <div class="md-layout md-alignment-top-center">
    <!--Progress Bar-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <!--Copertina-->
    <md-card id="copertina" class="md-small-size-100">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img id="cover" :src="coverPic" />
        </md-card-media>

        <md-card-area>
          <div class="containerImgName">
            <md-avatar class="md-large" id="avatarCopertina">
              <img :src="img" />
            </md-avatar>

            <md-card-header>
              <span class="md-title-pers">{{ username }}</span>
              <span id='bio' class="md-subhead">{{ bio }}</span>
            </md-card-header>
          </div>

          <md-card-actions>
            <md-menu md-size="big" md-direction="bottom-end">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon id="iconMoreVert">more_vert</md-icon>
              </md-button>

              <!--Dialog per Modifica immagine di profilo-->
              <md-menu-content>
                <md-menu-item @click="showDialogProPic = true">
                  <span>Modifica l'immagine<br />di profilo</span>
                  <md-icon>insert_photo</md-icon>
                </md-menu-item>

                <!--Dialog per Modifica immagine di profilo-->
                <md-menu-item @click="showDialogCoverPic = true">
                  <span>Modifica l'immagine<br />di copertina</span>
                  <md-icon>wallpaper</md-icon>
                </md-menu-item>

                <!--Dialog per Modifica immagine di profilo-->
                <md-menu-item @click="showDialogBio = true">
                  <span>Modifica la bio</span>
                  <md-icon>edit</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-large-size-66 md-small-size-95 addMargin" v-if="username == realUser">
        <!--Card per "Scrivi un post"-->
        <md-card class="firstCard md-layout md-alignment-top-right">
          <md-card-header class="md-layout-item md-size-100">
            <md-avatar>
              <img :src="img" />
            </md-avatar>
            <span class="md-title">{{ username }}</span>
          </md-card-header>
          <!--Contenuto della card "Scrivi un post"-->
          <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
            <md-field>
              <label>Scrivi qualcosa...</label>
              <md-textarea v-model="postContent" md-autogrow></md-textarea>
            </md-field>
          </md-card-content>
          <!--Icona per l'invio dei post-->
          <md-card-actions class="md-layout-item md-size-100">
            <md-button class="md-icon-button" @click="sendPost()" :disabled="!postContent">
              <md-icon id="focus">send</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
      </div>

      <div class="md-layout-item md-large-size-66 md-small-size-95">
        <!--Card per i post-->
        <div class="addMargin" v-for="post in postList" :key="post.id">
          <md-card class="md-layout md-alignment-top-right">
            <!--Immagine del profilo e username-->
            <md-card-header class="md-layout-item md-size-100">
              <md-avatar>
                <img :src="img" />
              </md-avatar>
              <md-card-header-text>
                <div id="titlePers" class="md-title">{{ username }}</div>
                <div id="subheadPers" class="md-subhead">{{ post.postDate }}</div>
              </md-card-header-text>
            </md-card-header>

            <!--Contenuto del post-->
            <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
              <span>{{ post.postContent }}</span>
            </md-card-content>

            <!--Pulsante like-->
            <md-card-actions class="md-layout-item md-size-100">
              <md-button class="md-icon-button" v-if="username == realUser" @click="deletePost(post.docID)">
                <md-icon>delete</md-icon>
              </md-button>
              <md-button class="md-icon-button" @click="addLike(post.docID)" v-if="!likedList.includes(post.docID)">
                <md-icon>favorite</md-icon>
              </md-button>

              <md-button class="md-icon-button" @click="removeLike(post.docID)" v-if="likedList.includes(post.docID)">
                <md-icon style="color: var(--md-theme-default-accent); fill: var(--md-theme-default-accent)">favorite</md-icon>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!--Snackbar-->
      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
        <span>Il tuo post è stato pubblicato!</span>
        <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
      </md-snackbar>

      <!--Dialog ProPic-->
      <md-dialog :md-active.sync="showDialogProPic">
        <md-dialog-title>Modfica immagine profilo</md-dialog-title>
        <md-dialog-content>
          <md-field>
            <label>Inserisci il nuovo link</label>
            <md-input v-model="newProPic"></md-input>
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogProPic = false">Chiudi</md-button>
          <md-button class="md-primary" @click="editProPic()">Salva</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!--Dialog CoverPic-->
      <md-dialog :md-active.sync="showDialogCoverPic">
        <md-dialog-title>Modfica immagine di copertina</md-dialog-title>
        <md-dialog-content>
          <md-field>
            <label>Inserisci il nuovo link</label>
            <md-input v-model="newCoverPic"></md-input>
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogCoverPic = false">Chiudi</md-button>
          <md-button class="md-primary" @click="editCoverPic()">Salva</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!--Dialog Bio-->
      <md-dialog :md-active.sync="showDialogBio">
        <md-dialog-title>Modifica la bio</md-dialog-title>
        <md-dialog-content>
          <md-field>
            <label>Inserisci la nuova bio</label>
            <md-textarea v-model="newBio" md-autogrow maxlength="125"></md-textarea>
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogBio = false">Chiudi</md-button>
          <md-button class="md-primary" @click="editBio()">Salva</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!--Dialog Sei sicuro?-->
      <!--<md-dialog-confirm
        :md-active.sync="showDialogConfirm"
        md-title="Sei sicuro di voler eliminare questo post?"
        md-content="Questa azione non potrà essere annullata."
        md-confirm-text="Elimina"
        md-cancel-text="Annulla"
        @md-cancel="onCancel"
        @md-confirm="onConfirm" />-->
    </div>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      coverPic: null,
      username: this.$route.params.username,
      realUser: localStorage.getItem('username'),
      img: null,
      bio: null,
      postContent: null,
      postList: [],
      likedList: [],
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      //Progress Bar
      showProgress: false,
      //Dialog
      showDialogProPic: false,
      showDialogCoverPic: false,
      showDialogBio: false,
      newProPic: null,
      newCoverPic: null,
      newBio: null
    }
  },
  watch: {
    $route: function() {
      this.load();
    }
  },
  created:function() {
    this.load();
  },
  methods: {
    load: function() {
      this.showProgress = true;

      /*con queste funzioni vengono salvate in variabili locali
      l'immagine di profilo e copertina, la bio e la lista dei post*/
      this.getPropic();
      this.getCoverPic();
      this.getBio();
      this.getPost();
      this.getLikes();
    },
    //funzione per salvare l'immagine di profilo
    getPropic: function() {
      this.img = null;

      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.img = doc.data().proPic;
        });
      });
    },
    //funzione per salvare l'immagine di copertina
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
    },
    //funzione per stampare tutti i post scritti dall'utente
    getPost: function() {
      this.postList.splice(0, this.postList.length);

      DataService.getUserPost(this.username).then(data => {
        this.postList = data.slice();
        this.orderPost();
        this.showProgress = false;
      });
    },
    orderPost: function() {
      //bubble sort per ordinare i post in ordine decrescente per data di pubblicazione

      var n = this.postList.length - 1;
      var ultimoScambiato = n;
      var i = 0;

      while(ultimoScambiato > 0) {
        ultimoScambiato = 0;

        for(i = 0; i < n; i++) {
          if(this.postList[i].id < this.postList[i+1].id) {
            var tmp = this.postList[i];
            this.postList[i] = this.postList[i+1];
            this.postList[i+1] = tmp;

            ultimoScambiato = i;
          }
        }

        n = ultimoScambiato;
      }
    },
    //funzione per salvare il post nel database
    sendPost: function() {
      var id = Date.now() + this.username.toLowerCase();
      DataService.sendPost(this.postContent, id);
      this.postContent = null;
      this.showSnackbar = true;
      this.load();
    },
    deletePost: function(docID) {
      DataService.deletePost(docID).then(() => {
        this.load();
      });
    },
    //funzione per modificare l'immagine di profilo
    editProPic: function() {
      DataService.setProPic(this.username, this.newProPic).then(() => {
        this.showDialogProPic = false;

        this.load();
      });
    },
    //funzione per modificare l'immagine di copertina
    editCoverPic: function() {
      DataService.setCoverPic(this.username, this.newCoverPic).then(() => {
        this.showDialogCoverPic = false;

        this.load();
      });
    },
    //funzione per modificare la bio dell'utente
    editBio: function() {
      DataService.setBio(this.username, this.newBio).then(() => {
        this.showDialogBio = false;

        this.load();
      });
    },
    getLikes() {
      DataService.getLiked().then(data => {
        this.likedList = data.slice();
      });
    },
    addLike(postID) {
      DataService.addLike(postID);
      this.load();
    },
    removeLike(postID) {
      DataService.removeLike(postID);
      this.load();
    }
  }
}
</script>

<style>
.md-content {
  margin-top: 0px !important;
  padding-top: 0px !important;
  border: none !important;
}

.progressBar {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.md-card-media {
  height: 250px;
}

.md-card-content {
  padding-bottom: 0px;
  padding-left: 30px;
}

.firstCard {
  margin-top: 20px;
  margin-bottom: 32px;
}

.addMargin {
  margin-bottom: 16px;
}

#focus:focus, #focus:active {
  color: var(--md-theme-default-accent) !important;
  fill: var(--md-theme-default-accent) !important;
}

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
