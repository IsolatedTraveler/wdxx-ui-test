<template>
  <div class="wd_flex wd_top" row>
    <span class="wd_icon wd_icon_arrow" @click.stop="$router.go(-1)"></span>
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
