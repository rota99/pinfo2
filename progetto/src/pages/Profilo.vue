<template>
  <div class="md-layout md-alignment-top-center">
    <!--Progress Bar-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <!--Copertina-->
    <copertina
      :propic="img"
      @showDialogProPic="showDialogProPic = true;"
      @showDialogCoverPic="showDialogCoverPic = true;"
      @showDialogBio="showDialogBio = true;" >
    </copertina>

    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-large-size-66 md-small-size-95 addMargin" v-if="username == realUser">
        <!--Card per "Scrivi un post"-->
        <scrivi-post @newPost="newPost();"></scrivi-post>
      </div>

      <div class="md-layout-item md-large-size-66 md-small-size-95">
        <!--Card per i post-->
        <div class="addMargin" v-for="post in postList" :key="post.docID">
          <post
            :username="username"
            :date="post.postDate"
            :propic="img"
            :content="post.postContent"
            :postID="post.docID"
            @postDeleted="postDeleted();" >
          </post>
        </div>
      </div>

      <!--Snackbar-->
      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
        <span>Il tuo post è stato pubblicato!}</span>
        <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
      </md-snackbar>

      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbarDelete" md-persistent>
        <span>Post eliminato correttamente.</span>
        <md-button class="md-accent" @click="showSnackbarDelete = false">OK</md-button>
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
    </div>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: this.$route.params.username,
      realUser: localStorage.getItem('username'),
      img: null,
      postList: [],
      showSnackbar: false,
      showSnackbarDeleted: false,
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
      this.getPost();
      this.getProPic();
    },
    getProPic: function() {
      DataService.getUserInfo(this.username).then((data) => {
        data.forEach(doc => {
          this.img = doc.data().proPic;
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
    //funzione per modificare l'immagine di profilo
    editProPic: function() {
      DataService.setProPic(this.username, this.newProPic).then(() => {
        this.showDialogProPic = false;

        this.getPropic();
      });
    },
    //funzione per modificare l'immagine di copertina
    editCoverPic: function() {
      DataService.setCoverPic(this.username, this.newCoverPic).then(() => {
        this.showDialogCoverPic = false;

        this.getCoverPic();
      });
    },
    //funzione per modificare la bio dell'utente
    editBio: function() {
      DataService.setBio(this.username, this.newBio).then(() => {
        this.showDialogBio = false;

        this.getBio();
      });
    },
    newPost: function() {
      this.showSnackbar = true;
      this.getPost();
    },
    postDeleted: function() {
      this.showSnackbarDeleted = true;
      this.getPost();
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
</style>
