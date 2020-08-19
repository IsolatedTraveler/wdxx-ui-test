<template>
  <div class='list wd-col'>
    <!-- <wd-list :data='list' showId="xm" ref="li" :value="val" multi split=","></wd-list>
    <wd-list :data='list | tree' showId="xm" ref="li" :value="val" multi split=","></wd-list> -->
    <wd-list :data='list | tree' showId="xm" ref="li" :value="val" notParent split=","></wd-list>
  </div>
</template>
<script>
export default {
  name: 'listView',
  data() {
    return {
      list: [{ xm: '请选择随访医生', id: '-1', $def: true }, { id: '0', pym: 'BBJ', xm: '贝博嘉' }, { id: '1', pym: 'CX', xm: '程鑫', pid: '0' }, { id: '2', pym: 'ZXS', xm: '张兴圣', pid: '0' }, { id: '3', pym: 'GY', xm: '龚艺' }, { id: '4', pym: 'CX', xm: '程霞' }, { id: '5', pym: 'GX', xm: '葛熹' }, { id: '6', pym: 'CDX', xm: '陈大学' }, { id: '7', pym: 'TCJ', xm: '陶传军' }, { id: '8', pym: 'BBJ', xm: '贝博' }, { id: '9', pym: 'CX', xm: '程一' }, { id: '10', pym: 'ZXS', xm: '张圣' }, { id: '11', pym: 'GY', xm: '龚二', pid: '6' }, { id: '12', pym: 'CX', xm: '程五', pid: '6' }, { id: '13', pym: 'GX', xm: '葛友', pid: '2' }, { id: '14', pym: 'CDX', xm: '陈学' }],
      val: '13'
    }
  },
  filters: {
    tree(data, pid = 'pid', id = 'id') {
      data = JSON.parse(JSON.stringify(data))
      var result = []
      if (Array.isArray(data)) {
        const map = {}
        data.forEach(it => {
          map[it[id]] = it
        })
        data.forEach(it => {
          var p = map[it[pid]]
          if (p) {
            (p.child || (p.child = [])).push(it)
          } else {
            result.push(it)
          }
        })
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.list{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .wd-list-box{
    margin-bottom: 40px;
    height: 50vh;
  }
}
</style>
