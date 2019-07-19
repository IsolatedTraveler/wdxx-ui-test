<template>
  <div class="TestAddress">
    <wd-address title="家庭地址" placeholder="请选择家庭地址" v-model="id" :getData="getData" :getParents="getParents">
      <label>家庭地址</label>
    </wd-address>
  </div>
</template>
<script>
export default {
  name: 'TestAddress',
  data() {
    return {
      id: '510682120206'
    }
  },
  methods: {
    getData(id) {
      return this.query.address({sjid: id || '0'}).then(res => {
        return res.data || []
      }).catch(e => {
        return []
      })
    },
    getParents(id) {
      return this.query.getAddressParent({dqxzqh: id}).then(res => {
        return res.data || []
      }).catch(e => {
        return []
      })
    }
  }
}
</script>
<style lang="scss">
.wd_address{
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dcdcdc;
  padding: 0 8px;
  font-size: 14px;
}
</style>
