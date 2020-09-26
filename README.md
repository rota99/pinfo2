# LockedIn
LockedIn è un'applicazione web, sotto forma di blog, che consente agli utenti di interagire fra di loro attraverso la pubblicazione di post, nei quali essi raccontano le loro esperienze, riflessioni ed emozioni vissute nel periodo di lockdown causato dall'emergenza Covid-19. Oltre alla sua funzione principale, il sito permette un constante aggiornamento della situazione generale in tutto il mondo grazie alla funzione di ricerca di un Paese e suggerisce alcune norme di comportamento da seguire per limitare l'andamento dei contagi.
> A Vue.js project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Istruzioni per l'uso

### Registrazione

Registrarsi nel sito con:
- Username a piacere;
- Country: Italy;
- Immagine di profilo a piacere.

### Bacheca

Nella pagina 'Bacheca':
- scrivere un post,
- visualizzare tutti i post scritti da tutti gli altri utenti del sito,
- mettere 'mi piace' ai post di altri utenti, attraverso l'icona del cuore.

### Profilo

Nella pagina 'Profilo':
- visualizzare tutti i post scritti dall'utente con cui si è effettutato il Login,
- eliminare un post scritto in precedenza.
  Sull'immagine di copertina è presente un Kebab menu. Cliccare sul menù per modificare i seguenti elementi:
  - immagine di profilo,
  - immagine di copertina,
  - biografia dell'utente.
  
### Contagi

Nella pagina 'Contagi':
- visualizzare le cards e i grafici riguardanti l'andamento del virus e i numeri riferiti al paese inserito nel SignIn/Login;
- cercare altri paesi attraverso la barra di ricerca e visualizzare i dati riferiti al paese scelto,
- inserire il paese cercato nella categoria 'Osservati', attraverso l'icona posta in corrispondenza del nome.

### Osservati

Nella pagina 'Osservati':
- visualizzare i Paesi che sono stati salvati in questa categoria,
- eliminare il Paese dalla categoria,
- ritornare ella pagina dei contagi del Paese attraverso l'icona.

### Prevenzione

Nella pagina 'Prevenzione': 
- visualizzare i corretti comportamenti da attuare nel periodo di emergenza Covid-19,
- consultare i link utili, quali WHO e Governo Italiano per maggiori informazioni.
