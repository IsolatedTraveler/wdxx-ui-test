<template>
  <div class="wd_flex wd_tabs" row>
    <slot>
      <div class="wd_flex wd_tab" :class="{wd_selected: index==value}" after v-for="(item,index) in data" :key="index" @click="$emit('input', index)">
        <span>{{item}}</span>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'WdTabs',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String | Number,
      default: '0'
    }
  }
}
</script>
