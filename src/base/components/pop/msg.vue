<template>
  <wd-pop v-show="showJudge" class="wd_msg" :title="title" @close="shadeClose && hide()" :shape="shape" :mask="true" :top="false">
    <div class="msg flex" :class="type" v-if="content">
      <div v-show="title" class="title flex row">
        <span class="auto">{{title}}</span>
      </div>
      <div class="content">
        {{message}}
      </div>
      <div v-show="button" class="bottom flex row">
        <button class="wd_button" v-for="(item,index) in button" @click="submit(index)" :key="index">{{button[index]}}</button>
      </div>
    </div>
  </wd-pop>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    delary: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'modal'
    },
    shadeClose: {
      type: Boolean,
      default: false
    },
    content: {
      type: Boolean,
      default: true
    },
    resolve: {
      type: Function,
      default() {
        return null
      }
    },
    shape: {
      type: String,
      default: ''
    },
    reject: {
      type: Function,
      default() {
        return null
      }
    },
    button: {
      type: Array,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      showJudge: false
    }
  },
  methods: {
    hide() {
      this.showJudge = false
      this.reject && this.reject()
    },
    show() {
      this.showJudge = true
      if (this.delary) {
        setTimeout(() => {
          this.hide()
        }, this.delary)
      }
    },
    submit(index) {
      this.showJudge = false
      this.resolve && this.resolve(!index)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
