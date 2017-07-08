import Vue from 'vue'
import Router from 'vue-router'

// import Hello from '@/components/Hello'
// import proCnode from '@/views/cnodeIndex'
// import detail from '@/components/detail'
// import dataList from '@/components/dataList'
// import usrInfo from '@/components/usrInfo'
import search from '@/components/search'
// import proList from '@/views/proList'

Vue.use(Router)

export default new Router({
  'linkActiveClass': 'active',
  routes: [
    {
      path: '/',
      redirect: '/all'
    },
    {
      path: '/all',
      name: '全部',
      meta: {
        pageTitle: '全部'
      },
      component: resolve => require(['@/components/dataList.vue'], resolve)
      // 通过懒加载就不会一次性把所有组件都加载进来，而是当你访问到那个组件的时候才会加载那一个。对于组件比较多的应用会提高首次加载速度。
    },
    {
      path: '/good',
      name: '精华',
      component: resolve => require(['@/components/dataList.vue'], resolve)
    },
    {
      path: '/share',
      name: '分享',
      component: resolve => require(['@/components/dataList.vue'], resolve)
    },
    {
      path: '/ask',
      name: '问答',
      component: resolve => require(['@/components/dataList.vue'], resolve)
    },
    {
      path: '/job',
      name: '招聘',
      component: resolve => require(['@/components/dataList.vue'], resolve)
    },
    {
      path: '/dev',
      name: '客户端测试',
      component: resolve => require(['@/components/dataList.vue'], resolve)
    },
    {
      path: '/search',
      name: '搜索',
      component: search
    },
    {
      path: '/topic/:id',
      name: 'topics',
      component: resolve => require(['@/components/detail.vue'], resolve)
    },
    {
      path: '/user/:name',
      name: 'usrinfo',
      component: resolve => require(['@/components/usrInfo.vue'], resolve)
    },
    {
      path: '/transitions/touchDel',
      name: 'vue transitions demo',
      component: resolve => require(['@/components/transitions/touchDel'], resolve)
    }
  ]
})

// Router.afterEach((to, from, next) => {
//   document.title = to.name
// })
