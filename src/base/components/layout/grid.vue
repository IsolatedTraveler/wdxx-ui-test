<template>
  <div class="wd_flex" @click.stop="$emit('click')">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdGrid'
}
</script>
