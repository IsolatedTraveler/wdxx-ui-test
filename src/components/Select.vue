<template>
  <div>
    <wd-select label="测试：" :data="data"/>
  </div>
</template>
<script>
export default {
  name: 'Select',
  data() {
    return {
      data: [
        {
          id: 1,
          mc: '列表1',
          child: [
            {
              id: 11,
              mc: '列表11'
            }
          ]
        }, {
          id: 2,
          mc: '列表2',
          child: [
            {
              id: 21,
              mc: '列表21'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
