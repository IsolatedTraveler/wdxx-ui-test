<template>
  <li class="wd-list-item wd-col">
    <div class="wd-row" :class="{'wd-selected': selected}" @click.stop="$emit('selected', it, selected),multi && (selected =!selected || data.$def)">
      <span class="wd-auto">
        {{data[showId]}}
      </span>
      <slot>
        <i class="wd-icon wd-icon-arrow"></i>
      </slot>
    </div>
  </li>
</template>
<script>
import { list, item } from '@m/list.js'
export default {
  name: 'wdListItem',
  mixins: [list, item],
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>
