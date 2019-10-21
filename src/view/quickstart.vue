<template>
  <div class="quickstare" v-html="html">
  </div>
</template>
<script>
export default {
  name: 'quickstare',
  data() {
    return {
      html: `
    <p class="fg">本部分将引导您完成在Webpack vue项目中使用wdxx UI的过程。</p>
    <p>1.使用vue-cli建立项目</p>
    <pre>
      npm install -g vue-cli
      vue init webpack projectname
    </pre>
    <p>2.安装wdxx ui</p>
    <pre>npm install vuex vue-router wdxx-ui --save</pre>
    <p>3.在项目src目录下新建store/index.js文件，并复制以下代码</p>
    <pre>
    // ... 代表其余自定义的Vue全局状态管理变量（参考vuex官方文档）
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    let fun = []
    const state = {
      back: null,...
    }, getters = {
      back(state) {
        return state.back
      },...
    }, mutations = {
      back(state, val) {
        fun.push(state.back)
        state.back = () => {
          state.back = fun.pop() || null
          val && val()
        }
      },
      resetBack(state, val) {
        fun = []
        if (val) {
          state.back = () => {
            state.back = fun.pop() || null
            val && val()
          }
        } else {
          state.back = null
        }
      }, ...
    }
    export default new Vuex.Store({
      state,
      getters,
      mutations
    })</pre>
    <p class="fg">4.在项目src目录下新建router/index.js文件，并复制以下代码</p>
    <pre>// ... 代表路由详情（参考vue-router官方文档）
    import Vue from 'vue'
    import Router from 'vue-router'
    Vue.use(Router)
    const router = new Router({
      routes: [...]
    })
    router.beforeEach((to, from, next) => {
      let back = store.getters.back
      if (back && typeof back === 'function') {
        back()
        next(false)
      } else {
        next()
      }
    })</pre>
    <p>5.在项目src目录中main.js文件中引入vuex,vue-router，代码如下：</p>
    <pre>
    import Vue from 'vue'
    import store from '@/store'
    import router from '@/router'
    import wd from "wdxx-ui"
    import from 'wdxx-ui/src/index.scss'
    Vue.use(wd)
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })</pre>
    <p>以上代码实现了ui完整引入，从现在开始，尽情地拥抱 wdxx ui 吧！但愿她能成为你长远的开发伴侣，化作你方寸屏幕前的亿万字节！</p>`
    }
  }
}
</script>
