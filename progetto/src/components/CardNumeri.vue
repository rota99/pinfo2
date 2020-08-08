<template>
  <md-card :id="cardId" class="md-layout-item md-medium-size-20 md-small-size-100">
    <md-ripple>
      <md-card-header class="header">
        <div class="md-title">{{ count }}</div>
        <div class="md-subhead">{{ title }}</div>
      </md-card-header>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  props: [
    'title',
    'count',
    'cardId'
  ]
}
</script>

<style>
.header {
  text-align: center;
}

#positivi {
  color: rgba(247, 92, 3, 1);
}

#guariti {
  color: rgba(25, 178, 144, 1);
}

#morti {
  color: rgba(19, 21, 21, 1);
}

#positivi .md-subhead, #guariti .md-subhead, #morti .md-subhead {
  font-weight: bold;
}

@media only screen and (max-device-width: 960px) {
  #positivi, #guariti, #morti {
    margin-left: 0px;
    margin-right: 0px;
  }

  #positivi, #guariti {
    margin-bottom: 8px;
  }
}

@media only screen and (min-device-width: 961px) {
  #positivi, #guariti {
    margin-right: 8px;
  }

  #guariti, #morti {
    margin-left: 8px;
  }

  #positivi, #guariti {
    margin-bottom: 0px;
  }
}
</style>
