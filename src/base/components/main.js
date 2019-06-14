// form 表单
import WdForm from './form/form'
import WdInput from './form/input'
import WdTreeSelect from './form/treeSelect'
import WdSelect from './form/select'
import WdProgress from './form/progress'
import WdSwitch from './form/switch'
import WdButton from './form/button'
// 弹出层
import WdPop from './pop/pop'
import WdMask from './pop/mask'
import WdMsg from './pop/main'
// 数据展示
import WdList from './data/list'
import WdTree from './data/tree'
import WdSwipe from './data/swipe'
// 布局
import WdTop from './layout/top'
import WdGrid from './layout/grid'
let components = [
    WdInput,
    WdForm,
    WdTreeSelect,
    WdSelect,
    WdProgress,
    WdSwitch,
    WdPop,
    WdMask,
    WdList,
    WdTree,
    WdSwipe,
    WdTop,
    WdGrid,
    WdButton
  ], props = [
    WdMsg
  ]
export {
  components,
  props
}
