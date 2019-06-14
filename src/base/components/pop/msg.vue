<template>
  <div v-show="showJudge" class="wd_msg wd_pop wd_flex" @click.stop="shadeClose && $emit('close')">
    <div class="wd_flex" :class="'wd_'+type" v-if="content">
      <div v-show="title" class="wd_title wd_flex" row>
        <span>{{title}}</span>
      </div>
      <div class="wd_content">
        {{message}}
      </div>
      <div v-show="button" row class="wd_bottom wd_flex">
        <button class="wd_button" v-for="(item,index) in button" @click="submit(index)" :key="index">{{button[index]}}</button>
      </div>
    </div>
  </div>
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
    submit(i) {
      this.showJudge = false
      i ? this.reject(true) : this.resolve()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
