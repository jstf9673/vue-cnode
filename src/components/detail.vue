<template>
  <div>
    <vue-loading v-if="loading" class="loads" type="spiningDubbles" color="#d9544e" :size="{ width: '5rem', height: '5rem' }"></vue-loading>
    <div class="topic-detail" v-show="!loading">
      <h3 class="title">{{ topicDetail.title }}</h3>
      <div class="article-info">{{ createdTime(topicDetail.create_at) }}</div>
      <div class="content" v-html="topicDetail.content"></div>
      <div class="article-reply">
        <h3>{{ topicDetail.reply_count }}条回复</h3>
        <ul>
          <li class="" v-for="(items, index) in topicDetail.replies">
            <div class="reply_usr_info flex">
              <div class="usr_avatar">
                <img :src="formtHttp(items.author.avatar_url)">
              </div>
              <div class="reply_usr_name">{{ items.author.loginname }}</div>
              <div class="reply_creattime">{{ index + 1 }}楼    {{ createdTime(items.create_at) }}</div>
              <div class="is_author" v-if="items.author.loginname === topicDetail.author.loginname">作者</div>
            </div>
            <div class="reply_content" v-html="items.content"></div>
            <div class="usr_action" v-if="items.ups.length > 0" @click="dianzan(items.reply_id)"> <i name='thumbs-up' scale='2'></i> {{ items.ups.length }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formateDate, addHTTP } from '../assets/globle'
import vueLoading from 'vue-loading-template'
export default {
  name: 'details',
  components: {
    'vue-loading': vueLoading
  },
  data () {
    return {
      topicDetail: {},
      showFlag: false,
      loading: true
    }
  },
  methods: {
    createdTime (str) {
      // return String(this.topicDetail.create_at).match(/.{10}/)[0]
      return formateDate(str)
    },
    formtHttp (str) {
      return addHTTP(str)
    },
    dianzan (id) {
      if (id === null) {
        alert('请先登录，登录才能点赞')
        return
      }
      this.$http.post(`https://cnodejs.org/api/v1//reply/${id}/ups`)
        .then(res => {
          console.log(res.data.success)
        })
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http.get(`https://cnodejs.org/api/v1${this.$route.path}`)
    // this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then((response) => {
        this.topicDetail = response.data.data
        document.title = this.topicDetail.title
        this.$nextTick(() => {
          this.loading = false
        })
      })
      .catch(function (response) {
        console.log(JSON.stringify(response), 1)
      })
  }
}
</script>
<style lang="scss" scope>
  .topic-detail {
    .title {
      font-size: 20px;
      padding: 10px;
    }
    .article-info {
      padding: 0 10px;
    }
    .content {
      padding: 10px;
      font-size: 14px;
      overflow-y: hidden;
      img {
        max-width: 100%;
      }
    }
    .article-reply {
      h3 {
        background-color: #f0f0f0;
        padding: 10px;
      }
      li {
        position: relative;
        padding: 10px;
        border-top: 1px solid #f0f0f0;
      }
      .usr_avatar {
        margin-right: 5px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
      .is_author {
        background-color: #6ba44e;
        color: #fff;
        height: 18px;
        padding: 0 2px;
        margin-left: 5px;
      }
      .reply_creattime {
        color: #08c;
        margin-left: 5px;
      }
      .reply_content {
        img {
          max-width: 100%;
        }
        a[href] {
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .usr_action {
        position: absolute;
        padding-left: 20px;
        right: 10px;
        top: 10px;
        background: url('../assets/thumbs-up.svg') no-repeat;
        background-position: left center;
        background-size: 16px 16px;
      }
    }
  }
</style>
