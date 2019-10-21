<template>
  <div class="list">
    <p class="fg">列表展示，css组件，定义列表样式，通过数据驱动</p>
    <p class="sl">示例一(组件使用方法)：</p>
    <wd-list class="list" :data="listData" @selected="selected" valId="id" showId="mc" icon="wd_arrow">
    </wd-list>
    <p class="sl">示例二（纯css）：</p>
    <ul class="wd_list">
      <li class="wd_list_item">1.良好的支持移动端返回事件，再弹出层打开的时候，返回按钮关闭弹出层，避免出现页面后退，弹出层还存在的问题。</li>
      <li class="wd_list_item">2.兼容大多数浏览器，支持弹性布局，使布局变得更流畅简单</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'list',
  data() {
    return {
      lz: '<pre>  <wd-list :data="listData"/></pre>',
      listData: [
        {
          mc: '列表一',
          id: '1'
        }, {
          mc: '列表二',
          id: '2'
        }, {
          mc: '列表三',
          id: '3'
        }, {
          mc: '列表四',
          id: '4'
        }, {
          mc: '列表五',
          id: '5'
        }
      ],
      sl1: `<pre>&lttemplate&gt
  &ltwd-list class="list" :data="listData" @selected="selected" valId="id" showId="mc" icon="wd_arrow"&gt
  &lt/wd-list&gt
&lt/template&gt
&ltscript&gt
export default {
  name: 'list',
  data() {
    return {
      listData: [
        {
          mc: '列表一',
          id: '1'
        }, {
          mc: '列表二',
          id: '2'
        }, {
          mc: '列表三',
          id: '3'
        }, {
          mc: '列表四',
          id: '4'
        }, {
          mc: '列表五',
          id: '5'
        }
      ]
    }
  },
  methods: {
    selected(item) {
      // 点击列表选项事件
      alert(JSON.stringify(item))
    }
  }
}
&lt/script&gt
</pre>`,
      sl2: `<pre>&ltul class="wd_list"&gt
  &ltli class="wd_list_item"&gt1.良好的支持移动端返回事件，再弹出层打开的时候，返回按钮关闭弹出层，避免出现页面后退，弹出层还存在的问题。&lt/li&gt
  &ltli class="wd_list_item"&gt2.兼容大多数浏览器，支持弹性布局，使布局变得更流畅简单&lt/li&gt
&lt/ul&gt</pre>`
    }
  },
  methods: {
    selected(item) {
      // 点击列表选项事件
      alert(JSON.stringify(item))
    }
  }
}
</script>
