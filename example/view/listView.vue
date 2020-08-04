<template>
  <div class='list'>
    <wd-list :data='list' showId="xm"></wd-list>
  </div>
</template>
<script>
export default {
  name: 'listView',
  data() {
    return {
      list: [{ xm: '请选择随访医生', id: '' }, { id: '1012', pym: 'YMH', xm: '余明河', dm: '0002' }, { id: '1071', pym: 'ZKZJJL', xm: '只看自己记录', dm: '0003' }, { id: '1091', pym: 'HB', xm: '何波', dm: '0004' }, { id: '1092', pym: 'DY', xm: '代业', dm: '0005' }, { id: '1093', pym: 'YHM', xm: '杨宏明', dm: '0006' }, { id: '1111', pym: 'JGBB', xm: '机构报表', dm: '0007' }, { id: '1112', pym: 'GXBB', xm: '共享报表', dm: '0008' }, { id: '1113', pym: 'XTBB', xm: '系统报表', dm: '0009' }, { id: '1131', pym: 'YRQ', xm: '袁瑞卿', dm: '0010' }, { id: '1211', pym: 'FYY', xm: '范艳艳', dm: '0102' }, { id: '1212', pym: 'KZH', xm: '康正华', dm: '0103' }, { id: '1271', pym: 'CSRY', xm: '测试人员', dm: '0104' }, { id: '1291', pym: 'CSRY1', xm: '测试人员1', dm: '0105' }, { id: '1351', pym: 'ALBB', xm: '阿里巴巴', dm: '0106' }, { id: '1371', pym: 'LP', xm: '廖鹏', dm: '0107' }, { id: '1431', pym: 'WJW', xm: '王俊巍', dm: '0108' }, { id: '1451', pym: 'DSKF', xm: '丁松(开发)', dm: '0109' }, { id: '1471', pym: 'ADA', xm: '阿道啊', dm: '0110' }, { id: '1472', pym: 'ADFDF', xm: '啊打发打发', dm: '0111' }, { id: '1473', pym: 'ADFSDF', xm: '啊打发士大夫', dm: '041' }, { id: '1474', pym: 'DF', xm: '地方', dm: '042' }, { id: '1475', pym: 'D1F', xm: '地1方', dm: '043' }, { id: '1476', pym: 'EE', xm: '呃呃', dm: '044' }, { id: '1477', pym: 'ADSFDF', xm: '阿迪斯发到付', dm: '045' }, { id: '1478', pym: 'LY', xm: '廖燕', dm: '046' }, { id: '1511', pym: 'CSQX', xm: '测试权限', dm: '047' }, { id: '1531', pym: 'CSYX', xm: '测试邮箱', dm: '048' }, { id: '1532', pym: 'TUPIANCESHI', xm: 'tupianceshi', dm: '049' }, { id: '1552', pym: 'LSW', xm: '李三娃', dm: '9902' }, { id: '1553', pym: 'LSW', xm: '李四娃', dm: '9903' }, { id: '1554', pym: 'LWW', xm: '李五娃', dm: '9904' }, { id: '177', pym: 'SXP', xm: '宋献平', dm: '1119' }, { id: '178', pym: 'ZY', xm: '周勇', dm: '0113' }, { id: '179', pym: 'YC', xm: '杨超', dm: '0114' }, { id: '180', pym: 'ZJJ', xm: '郑家钧', dm: '0115' }, { id: '181', pym: 'WZK', xm: '吴周康', dm: '0116' }, { id: '182', pym: 'LSY', xm: '吕世云', dm: '0117' }, { id: '183', pym: 'LFJ', xm: '罗方均', dm: '0118' }, { id: '197', pym: 'YK', xm: '杨柯', dm: '0119' }, { id: '217', pym: 'WL', xm: '王罗', dm: '0120' }, { id: '237', pym: 'JHR', xm: '敬和荣', dm: '0011' }, { id: '238', pym: 'LSY', xm: '李述英', dm: '0012' }, { id: '239', pym: 'LEE', xm: 'Lee', dm: '0013' }, { id: '302213', pym: 'HMJK', xm: '惠民接口', dm: '9901' }, { id: '731', pym: 'XT', xm: '辛甜', dm: '0014' }, { id: '742', pym: 'TCJ', xm: '陶传军', dm: '0015' }, { id: '743', pym: 'BBJ', xm: '贝博嘉', dm: '0016' }, { id: '931', pym: 'CX', xm: '程鑫', dm: '0017' }, { id: '951', pym: 'ZXS', xm: '张兴圣', dm: '0018' }, { id: '971', pym: 'GY', xm: '龚艺', dm: '0019' }, { id: '991', pym: 'CX', xm: '程霞', dm: '0101' }, { id: '992', pym: 'GX', xm: '葛熹', dm: '0112' }, { id: '993', pym: 'CDX', xm: '陈大学', dm: '0001' }]
    }
  }
}
</script>
<style lang='scss'>
.list{
}
</style>
