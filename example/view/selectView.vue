<template>
  <div class="select">
    <wd-select class="wd-border-ciclre" label="测试" showId="xm" :data="list" v-model="val" multi split=","></wd-select>
    <wd-select class="wd-border-ciclre" :data="list" v-model="val1" showId="xm"></wd-select>
    <wd-input type="password" class=" wd-border-ciclre" label="密码：" v-model="pwd"></wd-input>
    <wd-input label="账号：" class=" wd-border-ciclre" v-model="zh"></wd-input>
    <wd-icon name="svg1"></wd-icon>
    <wd-form></wd-form>
  </div>
</template>
<script>
export default {
  name: 'selectView',
  data() {
    return {
      list: [{ id: '742', pym: 'TCJ', xm: '陶传军', dm: '0015', $def: true }, { id: '743', pym: 'BBJ', xm: '贝博嘉', dm: '0016' }, { id: '931', pym: 'CX', xm: '程鑫', dm: '0017' }, { id: '951', pym: 'ZXS', xm: '张兴圣', dm: '0018' }, { id: '971', pym: 'GY', xm: '龚艺', dm: '0019' }, { id: '991', pym: 'CX', xm: '程霞', dm: '0101' }, { id: '992', pym: 'GX', xm: '葛熹', dm: '0112' }, { id: '993', pym: 'CDX', xm: '陈大学', dm: '0001' }],
      val: '742,991',
      val1: '742',
      pwd: '',
      zh: ''
    }
  }
}
</script>
