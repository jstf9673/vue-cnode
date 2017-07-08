<template>
  <div>
    <div class="pop" v-show="menuShow" @click="closePop()"></div>
    <div id="cnodeapp">
      <div class="header" :class="{'show': menuShow}">
        <div class="pull-l" @click="openMenu">menu</div>
        <div class="pull-r" @click="openSearch">search</div>
        <h3><img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"></h3>
      </div>
    </div>
    <v-search ref=search :show="conShow"></v-search>
    <!-- <v-menu :show="menuShow"></v-menu> -->
    <slot>1111</slot>

  </div>
</template>
<script>
import vSearch from '@/components/search'
import { mapState } from 'vuex'
// import vMenu from '@/components/vMenu'
export default {
  name: 'proCnode',
  components: {
    'v-search': vSearch
  },
  data () {
    return {
      isShow: false,
      conShow: false
    }
  },
  created () {
  },
  computed: {
    ...mapState([
      'menuShow'
    ])
  },
  methods: {
    closePop () {
      this.$store.commit('updateMenuShow')
    },
    openMenu () {
      // this.isShow = !this.isShow
      this.$store.commit('updateMenuShow')
      this.$emit('testShow', this.isShow)
    },
    openSearch () {
      // 父组件调用子组件方法
      this.$refs.search.show()
    }
  }
}
</script>
<style lang="scss" scop>
  .pop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
  }
  #cnodeapp {
    width: 100%;
    height: 100%;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    z-index: 10;
    color: green;
    background-color: #444;
    transition: all 0.3s ease;
    h3 {
      width: 123px;
      margin: 0 auto;
      img {
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .pull-l {
      float: left;
      margin-left: 10px;
    }
    .pull-r {
      float: right;
      margin-right: 10px;
    }
  }
</style>
