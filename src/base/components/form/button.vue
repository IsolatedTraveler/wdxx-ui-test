<template>
  <button class="wd_button wd_flex" row @click.stop="$emit('click')">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'WdButton'
}
</script>
