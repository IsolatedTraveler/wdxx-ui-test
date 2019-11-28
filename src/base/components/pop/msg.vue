<template>
  <div v-show="showJudge" class="wd_msg wd_pop wd_flex" @click.stop="shadeClose && $emit('close')">
    <div class="wd_flex" :class="'wd_'+type">
      <div v-show="title" class="wd_title">
        {{title}}
      </div>
      <input type="text" v-if="content" class="wd_content" v-model="value"/>
      <div class="wd_content" v-else>
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
      default: false
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
      showJudge: false,
      value: ''
    }
  },
  methods: {
    hide() {
      this.showJudge = false
      this.value = ''
      this.reject && this.reject()
    },
    show() {
      this.showJudge = true
      if (this.delary) {
        setTimeout(() => {
          this.submit()
        }, this.delary)
      }
    },
    submit(index) {
      this.showJudge = false
      index ? this.reject(true) : this.resolve(this.value)
      this.value = ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
