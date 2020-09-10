<template>
  <md-card :id="cardId" class="md-layout-item md-medium-size-50 md-small-size-100">
    <md-ripple>
      <!--HEADER-->
      <md-card-header class="header">
        <div class="md-icon md-medium-size-50 md-small-size-70">{{ icon }}</div>
        <div class="md-subhead md-size-50">{{ title }}</div>
      </md-card-header>
    </md-ripple>
  </md-card>
</template>
<script>
export default {
  //dati passati dall'elemento genitore
  props: [
    'icon',
    'title',
    'cardId'
  ]
}
</script>

<style>
.header {
  text-align: center;
}

#distanza {
  color: rgba(19, 21, 21, 1);
}

#mascherina {
  color: rgba(19, 21, 21, 1);
}

#donuts {
  color: rgba(19, 21, 21, 1);
}

#igiene {
  color: rgba(19, 21, 21, 1);
}

#distanza .md-subhead, #mascherina .md-subhead, #donuts .md-subhead, #igiene .md-subhead {
  font-weight: bold;
}

@media only screen and (max-device-width: 960px) {
  #distanza, #mascherina, #donuts, #igiene {
    margin-left: 8px;
    margin-right: 8px;
  }

  #distanza, #igiene {
    margin-bottom: 0px;
  }
}

@media only screen and (min-device-width: 961px) {
  #distanza, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #mascherina, #donuts {
    margin-right: 8px;
    margin-left: 8px;
  }

  #donuts, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #distanza, #mascherina {
    margin-bottom: 0px;
  }
}
</style>
