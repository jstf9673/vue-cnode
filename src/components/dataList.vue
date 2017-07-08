<template>
  <div class="wrap">
    <vue-loading v-if="loading" class="loads" type="spiningDubbles" color="#d9544e" :size="{ width: '5rem', height: '5rem' }"></vue-loading>
    <ul id="list" v-show="!loading">
      <li v-for="item in getData">
        <a class="flex">
          <router-link tag="div" class="usr-img" :to="{name: 'usrinfo', params: {name: item.author.loginname}}">
           <img :src="item.author.avatar_url">
          </router-link>
          <div class="tops" v-if="item.top">置顶</div>
          <router-link tag="div" class="topic-con" :to="{name: 'topics', params: {id: item.id}}">
            <p class="title">{{item.title}}</p>
            <p class="hots"><span class="count_of_replies">{{item.reply_count}}</span>/<span class="count_of_visits"></span>{{item.visit_count}}</p>
          </router-link>
          <div class="topic-time">{{ createdTime (item.create_at) }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import { formateDate } from '../assets/globle'
  import vueLoading from 'vue-loading-template'
  export default {
    name: 'dataList',
    components: {
      'vue-loading': vueLoading
    },
    data () {
      return {
        getData: [],
        linksTo: false,
        title: '',
        page: 1,
        loading: true
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      handleParams () {
        return (this.$route.path).replace(/\//, '')
      }
    },
    methods: {
      routeChange () {
        this.page = 1
        this.getCustomers()
        document.title = this.handleParams
      },
      createdTime (str) {
        return formateDate(str)
      },
      handleScroll () {
        const sumH = document.body.scrollHeight
        const viewH = document.documentElement.clientHeight
        const scrollH = document.body.scrollTop
        if (viewH + scrollH === sumH) {
          this.page += 1
          this.getCustomers()
        }
      },
      getCustomers () {
        console.log(this.$route.path, this.page)
        this.$http.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.handleParams}&limit=20`)
        .then((response) => {
          if (this.page === 1) {
            this.getData = response.data.data
          } else {
            response.data.data.map((item) => {
              this.getData.push(item)
            })
          }document.title = this.handleParams
          setTimeout(() => {
            this.$nextTick(() => {
              this.loading = false
            })
          }, 1500)
          // this.$set(this.getData, 'getData', response.data)
        })
        .catch(function (response) {
          console.log(JSON.stringify(response), 1)
        })
      }
    },
    created () {
      this.getCustomers()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style lang="scss" scope>
  #list {
    text-align: left;
    li {
      border-top: 1px solid #f0f0f0;
      &:first-child {
        border-top: none;
      }
      position: relative;
      padding: 10px;
      font-size: 14px;
      a {
        display: block;
        width: 100%;
        height: 100%;
        .usr-img img {
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
        .tops {
          background-color: #80bd01;
          height: 18px;
          line-height: 1.5;
          font-size: 12px;
          color: #fff;
          margin: 0 3px;
          padding: 0 3px;
          border-radius: 3px;
        }
        .topic-con {
          width: 70%;
          margin-left: 3px;
          .title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            vertical-align: middle;
          }
          .count_of_replies {
            color: #9e78c0;
            font-size: 10px;
          }
          .count_of_visits {
            color: #b4b4b4;
            font-size: 10px;
          }
        }
        .topic-time {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
        }
      }
    }
  }
</style>
