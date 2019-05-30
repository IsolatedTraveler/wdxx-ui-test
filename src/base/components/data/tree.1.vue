<template>
  <ul class="wd_tree auto">
    <li v-for="(item,i) in data" :key="i" class="flex" :class="{child: !item.child, parent: item.child,'selected': i === selectedIndex}">
      <div class="flex row" :class="{first:tier===0}" @click.stop="selected(i,item)">
        <img v-if="item[img]" :src="item[img]"/>
        <span class="auto">{{item[showId] || item}}</span>
        <span v-if="right" :class="type"></span>
      </div>
      <wd-tree v-if="item.child" :img="img" :site="site" :tier="tier + 1" v-show="selectedIndex === i" :data="item.child" :judge="selectedIndex === i" :type="type" :showId="showId" :value="value" :id="id" @selected="treeSelected(i, $event)"/>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdTree',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    img: {
      type: String,
      default: 'img'
    },
    type: {
      type: String,
      default: 'triangle'
    },
    tier: {
      type: Number,
      default: 0
    },
    site: {
      type: String,
      default: 'right'
    },
    showId: {
      type: String,
      default: 'xtmc'
    },
    right: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'id'
    },
    judge: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedIndex: ''
    }
  },
  watch: {
    data() {
      this.init()
    },
    judge(val) {
      if (!val) {
        this.selectedIndex = ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.value) {
        let data = this.data, value = this.value, id = this.id
        data.forEach((item, index) => {
          if (item[id] === value) {
            this.selectedIndex = index
            this.$emit('selected')
          }
        })
      }
    },
    selected(index, item) {
      if (this.selectedIndex === index) {
        this.selectedIndex = ''
      } else {
        this.selectedIndex = index
      }
      item.child || this.$emit('selected', item)
    },
    treeSelected(index, item) {
      this.selectedIndex = index
      this.$emit('selected', item)
    }
  }
}
</script>
