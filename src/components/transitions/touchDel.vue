<template>
  <div class="app">
    <button @click="add" class="add-btn">+</button>
    <transition-group name="slide" tag="ul" class="list-wrapper">
      <v-touch class="list" tag="li" v-for="(item, index) in lists" :key="item" v-on:swipeleft="showBtn($event, index)" v-on:swiperight="hideBtn(index)">
        <span class="text">{{item.text}} </span>
        <button class="add-carts-btn" @click="addItem($event)">+</button>
        <transition name="move">
          <button class="del-btn" @click="delList(index)" v-show="item.show">删除{{index}}</button>
        </transition>
      </v-touch>
    </transition-group>
    <div class="carts-con">
      <div class="ball-container">
        <transition name="drop" v-for="ball in balls" key="ball" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <div class="carts">{{count}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'test',
    components: {
    },
    data () {
      return {
        lists: [
          {text: 'todo list 1', show: false},
          {text: 'todo list 2', show: false},
          {text: 'todo list 3', show: false},
          {text: 'todo list 4', show: false},
          {text: 'todo list 5', show: false}
        ],
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        count: 0
      }
    },
    computed: {
      handleParams () {
        return (this.$route.path).replace(/\//, '') === 'transitions/touchDel' ? '动画测试' : 'transition'
      }
    },
    created () {
      document.title = this.handleParams
    },
    methods: {
      delList (index) {
        this.lists.splice([index], 1)
      },
      addItem (e) {
        this.drop(e.target)
        this.count ++
      },
      add () {
        this.lists.unshift({
          text: 'add new todo list' + Math.floor(Math.random() * 10), show: false
        })
      },
      showBtn (e, index) {
        this.lists.forEach(item => {
          item.show = false
        })
        this.lists[index].show = true
      },
      hideBtn (index) {
        this.lists[index].show = false
      },
      drop (el) {
        // console.log(this.dropBalls, 'drop')
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter: function (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            console.log(ball, rect)
            let x = window.innerWidth - rect.left - 10
            let y = -(window.innerHeight - rect.top - 18)
            el.style.display = ''
            el.style.webkitTransform = `translate3D(0,${y}px,0)`
            el.style.transform = `translate3D(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3D(${x}px,0,0)`
            inner.style.transform = `translate3D(${x}px,0,0)`
          }
        }
        // console.log('this is beforeEnter action')
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        /* eslint-disable no-unused-vars */
        el.offsetHeight
        this.$nextTick(() => {
          el.style.display = ''
          el.style.webkitTransform = 'translate3D(0,0,0)'
          el.style.transform = 'translate3D(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3D(0,0,0)'
          inner.style.transform = 'translate3D(0,0,0)'
        })
        // console.log('this is Enter action')
        done()
      },
      afterEnter: function (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
        // console.log('this is afterEnter action')
      }
    }
  }
</script>
<style lang="scss" scope>
  .list {
    display: flex;
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    overflow: hidden;
    margin-bottom: 10px;
    color: #666;
    font-size: 14px;
    background: #eee;
    transition: all .4s;
    &.slide-move {
      transition: transform 1s;
    }
    &.slide-enter {
      transform: translate3d(-100%, 0, 0);
    }
    &.slide-leave-active {
      position: absolute;
      transform: translate3d(-100%, 0, 0);
    }
    &:last-child {
      margin-bottom: 0;
    }
    .del-btn {
      flex: 0 0 60px;
      border: none;
      outline: none;
      color: #fff;
      background: red;
      transition: all .4s;
      &.move-enter, &.move-leave-active {
        transform: translate3d(70px, 0, 0);
      }
    }
    .add-carts-btn {
      position: absolute;
      left: 10px;
      top: 10px;
      text-align: center;
      color: #fff;
      background-color: rgb(0,160,220);
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: 1px solid #999;
    }
    .text {
      flex: 1;
      padding-left: 20px;
    }
  }
  .carts-con {
    height: 45px;
    background-color: #222;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .carts {
      position: absolute;
      right: 10px;
      top: 7px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      background-color: #fe5e5e;
      border-radius: 100%;
    }
  }
  .ball {
    position: fixed;
    right: 10px;
    bottom: 18px;
    z-index: 200;
    &.drop-enter, &.drop-enter-active {
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*貝塞爾曲線*/
    }
  }
  .inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(0,160,220);
    transition: all 0.4s linear;
  }
</style>
