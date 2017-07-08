<template>
  <transition name="searchFlow">
    <div class="search-content" v-show="showSearch">
      <div class="search-head">
        <div class="pull-l" @click="closeSearch">back</div>
        <div class="search-title">搜索</div>
      </div>
      <div class="search-con flex-y">
        <input type="text" name="" placeholder="搜索">
        <!-- <div class="cancel">取消</div> -->
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'search',
  components: {
  },
  data () {
    return {
      showSearch: false
    }
  },
  watch: {

  },
  created () {
  },
  methods: {
    show () {
      this.showSearch = !this.showSearch
    },
    closeSearch () {
      this.showSearch = !this.showSearch
    }
  }
}
</script>
<style lang="scss" scope>
  .search-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: #fff;
    // margin-top: -30px;
    transition: all .2s linear;
    transform: translate3d(0,0,0);
    &.searchFlow-enter, &.searchFlow-leave-active {
      transform: translate3d(100%,0,0);
    }
    .search-head {
      position: relative;
      overflow: hidden;
      background-color: #444;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: green;
      .search-title {
        // background-color: green;
      }
      .pull-l {
       position: absolute;
       left: 10px;
      }
    }
    .search-con {
      padding: 10px;
      input {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
  }
</style>
