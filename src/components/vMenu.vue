<template>
  <div>
    <div class="menu-con" :class="{ 'show': show }">
      <div class="head-usr"></div>
      <ul>
        <li v-for="items in menuList" class="" @click="updateactions">
          <router-link  :to="{path: '/' + items.alias, params: {tabs: items.alias} }">
            {{ items.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-menu',
  components: {
  },
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      menuList: [
        {alias: 'all', name: '全部'},
        {alias: 'good', name: '精华'},
        {alias: 'share', name: '分享'},
        {alias: 'ask', name: '问答'},
        {alias: 'job', name: '招聘'},
        {alias: 'dev', name: '客户端测试'},
        {alias: 'transitions/touchDel', name: '动画测试'}
      ]

    }
  },
  methods: {
    updateactions () {
      this.$store.commit('updateMenuShow')
    }
  }
}
</script>
<style lang="scss" scope>
  .menu-con {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: -250px;
    z-index: 10;
    padding-top: 45px;
    background-color: #444;
    color: #fff;
    transition: all 0.3s ease;
    ul {
      text-align: center;
      li {
        a {
          padding: 10px 0;
          display: block;
          &.active {
            color: green;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
