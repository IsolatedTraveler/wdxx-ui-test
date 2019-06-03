<template>
  <wd-tree :data="data" @selected="getVal">
  </wd-tree>
</template>
<script>
export default {
  name: 'Tree',
  data() {
    return {
      data: [
        {
          id: 1,
          mc: '列表1',
          child: [
            {
              id: 11,
              mc: '列表11',
              child: [
                {
                  id: 111,
                  mc: '列表111'
                }
              ]
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
  },
  methods: {
    getVal(data) {
      console.log(data)
    }
  }
}
</script>
