<template>
  <div id="app">
    <proCnode @testShow="menushow">
      <v-menu :show="menuShow"></v-menu>
    </proCnode>
    <!-- <router-view name="search"></router-view> -->
    <router-view class="main-wrap" ></router-view>
  </div>
</template>

<script>
import proCnode from './components/proCnode'
import vMenu from './components/vMenu'
// import vSearch from './components/search'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState([
      'menuShow'
    ])
  },
  methods: {
    menushow (data) {
      // console.log(data, 111)
      // this is components data test
      // this.isShow = data
      // this.$store.commit('updateMenuShow')
    }
  },
  components: {
    proCnode, vMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .show {
    transform: translateX(250px);
  }
  .main-wrap {
    position: absolute;
    top: 45px;
    width: 100%;
    left: 0;
    padding-bottom: 10px;
  }
  .test {
    color: green;
  }

  .links {
    font-size: 2.4rem;
    color: red;
  }
  .flex {
    display: flex;
  }
  .flex-y {
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
