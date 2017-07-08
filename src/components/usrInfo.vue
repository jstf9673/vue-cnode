<template>
  <div>
    <div class="user-info">
      <div class="usr_avatar"><img :src="userInfo.avatar_url"></div>
      <div class="usr_loginname">{{ userInfo.loginname }}</div>
      <div class="usrscore">{{ userInfo.score }}积分</div>
      <div class="regist_time">注册时间：{{ createdTime(userInfo.create_at) }}</div>
    </div>
    <div class="panel">
      <h3 v-if="userInfo.recent_topics.length > 0">最近创建的话题</h3>
      <ul>
        <li v-for="(item, index) in userInfo.recent_topics" class="flex" v-if="item && index < 5">
          <div class="usr-img" >
           <img :src="item.author.avatar_url">
          </div>
          <router-link tag="div" class="topic-con" :to="{name: 'topics', params: {id: item.id}}">
            <p class="title">{{item.title}}</p>
          </router-link>
          <div class="topic-time">{{ createdTime (item.last_reply_at) }}</div>
        </li>
      </ul>
      <div class="loadmore" v-if="userInfo.recent_topics.length > 0">查看更多>></div>
    </div>
    <div class="panel">
      <h3 v-if="userInfo.recent_replies.length > 0">最近参与的话题</h3>
      <ul>
        <li v-for="(item, index) in userInfo.recent_replies" class="flex"  v-if="item && index < 5">
          <router-link tag="div" class="usr-img" :to="{name: 'usrinfo', params: {name: item.author.loginname}}">
           <img :src="item.author.avatar_url">
          </router-link>
          <router-link tag="div" class="topic-con" :to="{name: 'topics', params: {id: item.id}}">
            <p class="title">{{item.title}}</p>
          </router-link>
          <div class="topic-time">{{ createdTime (item.last_reply_at) }}</div>
        </li>
      </ul>
      <div class="loadmore" v-if="userInfo.recent_replies.length > 0">查看更多>></div>
    </div>
  </div>
</template>
<script>
import { formateDate } from '../assets/globle'
export default {
  name: 'usrinfo',
  components: {
  },
  data () {
    return {
      userInfo: {
        recent_replies: [],
        recent_topics: []
      }
    }
  },
  methods: {
    createdTime (str) {
      return formateDate(str)
    },
    fetchData () {
      this.$http.get(`https://cnodejs.org/api/v1${this.$route.path}`)
        .then((res) => {
          this.userInfo = res.data.data
          console.log(res.data)
          // this.$set(this.getData, 'getData', response.data)
        })
        .catch(function (response) {
          console.log(JSON.stringify(response), 1)
        })
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
    $route () {
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scope>
  .user-info {
    text-align: center;
    padding-bottom: 10px;
    .usr_avatar {
      margin: 10px auto;
      img {
        display: block;
        margin: 0 auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #80bd01;
      }
    }
  }
  .panel {
    h3 {
      padding: 10px;
      border-radius: 3px 3px 0 0 ;
      background-color: #f6f6f6;
    }
    li {
      border-top: 1px solid #f0f0f0;
      &:first-child {
        border-top: none;
      }
      position: relative;
      padding: 10px;
      font-size: 14px;
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
    .loadmore {
      padding: 10px;
      color: #666;
    }
  }
</style>
