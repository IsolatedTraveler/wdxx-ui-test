<template>
  <ul class="wd_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex">
      <div class="wd_flex wd_list_item" row :class="{wd_selected:index[i]}" @click.stop="select(i,item)">
        <slot :data="item">
          <span v-if="left" class="wd_icon" left></span>
          <span class="wd_auto">
            {{item[showId]}}
          </span>
          <span v-if="right" class="wd_icon" right></span>
        </slot>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdList',
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
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: [],
      backups: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(val) {
      let id = this.id, index = []
      this.data.map((item, i) => {
        if (val.indexOf(item[id]) !== -1) {
          index[i] = true
        }
      })
      this.index = index
      this.backups = index
    },
    select(i, item) {
      let index = [].concat(this.index)
      index[i] = !index[i]
      this.index = index
      this.$emit('selected', index[i] ? this.data[i] : '')
    }
  }
}
</script>
