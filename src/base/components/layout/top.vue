<template>
  <div class="wd_flex wd_top" row>
    <div class="left" @click.stop="$router.go(-1)">
      <span class="wd_icon"></span>
    </div>
    <span class="wd_auto">{{title}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdTop',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
