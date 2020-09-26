<template>
  <div class="md-layout md-alignment-top-center">
    <!--PROGRESS BAR-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <!--COPERTINA-->
    <copertina
      :key="coverKey"
      :propic="img"
      @showDialogProPic="showDialogProPic = true;"
      @showDialogCoverPic="showDialogCoverPic = true;"
      @showDialogBio="showDialogBio = true;" >
    </copertina>

    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-large-size-66 md-small-size-95 addMargin">
        <!--SCRIVI UN POST-->
        <scrivi-post :key="newPostKey" @newPost="newPost();"></scrivi-post>
      </div>

      <div class="md-layout-item md-large-size-66 md-small-size-95">
        <!--LISTA POST-->
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

      <!--SNACKBAR-->
      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
        <span>Il tuo post è stato pubblicato!</span>
        <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
      </md-snackbar>

      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbarDeleted" md-persistent>
        <span>Post eliminato correttamente.</span>
        <md-button class="md-accent" @click="showSnackbarDeleted = false">OK</md-button>
      </md-snackbar>

      <!--DIALOG MODIFICA PROPIC-->
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

      <!--DIALOG MODIFICA COVERPIC-->
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

      <!--DIALOG MODIFICA BIO-->
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
      username: localStorage.getItem('username'),
      img: null,
      postList: [],
      newProPic: null,
      newCoverPic: null,
      newBio: null,
      coverKey: 0,
      newPostKey: 0,
      //Snackbar
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
      showDialogBio: false
    }
  },
  created:function() {
    this.load();
  },
  methods: {
    load: function() {
      this.showProgress = true;
      this.getPost();
      this.getProPic();
    },
    //funzione utilizzata per salvare in una variabile locale l'indirizzo dell'immagine di profilo dell'utente
    getProPic: function() {
      this.img = null;

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
    //bubble sort per ordinare i post in ordine decrescente per data di pubblicazione
    orderPost: function() {
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
      DataService.setProPic(this.newProPic).then(() => {
        this.showDialogProPic = false;

        this.getProPic();
        this.getPost();
        this.coverKey += 1;
        this.newPostKey += 1;
        this.newProPic = null;
      });
    },
    //funzione per modificare l'immagine di copertina
    editCoverPic: function() {
      DataService.setCoverPic(this.newCoverPic).then(() => {
        this.showDialogCoverPic = false;

        this.coverKey += 1;
        this.newCoverPic = null;
      });
    },
    //funzione per modificare la bio dell'utente
    editBio: function() {
      DataService.setBio(this.newBio).then(() => {
        this.showDialogBio = false;

        this.coverKey += 1;
        this.newBio = null;
      });
    },
    //funzione che viene richiamata quando viene pubblicato un nuovo post
    newPost: function() {
      this.showSnackbar = true;
      this.getPost();
    },
    //funzione che viene richiamata quando viene eliminato un post
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
