<template>
  <div class="wd_tree">
    <div class="wd_auto" scroll >
      <component :is="multi?'wd-multi':'wd-single'" :left="left" @selected="selected" :right="right" :only="only" ref="tree" :data="data" :parent="parent" :showId="showId" :id="id">
        <template slot-scope="item">
          <slot :data="item.data">
            <span>{{item.data[showId]}}</span>
          </slot>
        </template>
      </component>
    </div>
    <div v-if="multi||button" class="wd_flex" row>
      <button class="wd_button" @click.stop="cancel" default>取消</button>
      <button class="wd_button" @click.stop="submit" >确定</button>
    </div>
  </div>
</template>
<script>
import wdSingle from './single'
import wdMulti from './multi'
export default {
  name: 'WdTree',
  components: {
    wdSingle,
    wdMulti
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showId: {
      type: String,
      default: 'mc'
    },
    id: {
      type: String,
      default: 'id'
    },
    value: {
      type: String | Array,
      default: ''
    },
    multi: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    only: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      val: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(val) {
      val = val || this.value
      if (this.data.length && val && (!this.multi || val.length)) {
        this.$refs.tree.init(val)
      }
    },
    cancel() {

    },
    submit() {
      if (this.multi) {
        this.$refs.tree.getValue().then(res => {
          this.$emit('selected', res)
        })
      } else {
        this.$emit('selected', this.val)
      }
    },
    selected(data) {
      if (!this.multi && this.button) {
        this.val = data
      } else {
        this.$emit('selected', this.val)
      }
    }
  }
}
</script>
