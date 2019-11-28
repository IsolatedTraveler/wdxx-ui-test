<template>
  <ul class="wd_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex wd_list_item" row @click.stop="selected(item)" after :disabled="item.disabled" :selected="val.indexOf(item[valId])!==-1">
      <slot :data="item">
        <span class="wd_auto wd_text">
          {{item[showId]}}
        </span>
      </slot>
      <span class="wd_icon" :class="icon"></span>
    </li>
    <li class="wd_gray" v-if="!data.length">{{placeholder}}</li>
  </ul>
</template>
<script>
export default {
  name: 'WdList',
  methods: {
    selected(item) {
      if (!item.disabled) {
        this.$emit('selected', item)
      }
    }
  }
}
</script>
