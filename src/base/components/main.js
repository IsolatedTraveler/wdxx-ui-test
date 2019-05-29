// form 表单
import form from './form/form'
import input from './form/input'
import treeSelect from './form/treeSelect'
import select from './form/select'
import progress from './form/progress'
import wdSwitch from './form/switch'
import button from './form/button'
// 弹出层
import pop from './pop/pop'
import mask from './pop/mask'
import msg from './pop/main'
// 数据展示
import list from './data/list'
import tree from './data/tree'
// 布局
import top from './layout/top'
import grid from './layout/grid'
export default {
  components: [
    input,
    form,
    treeSelect,
    select,
    progress,
    wdSwitch,
    pop,
    mask,
    list,
    tree,
    top,
    grid,
    button
  ],
  props: [
    msg
  ]
}
