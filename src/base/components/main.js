// form 表单
import WdForm from './form/form'
import WdInput from './form/input/input'
import WdSearch from './form/input/search'
import WdTreeSelect from './form/treeSelect'
import WdSelect from './form/select/select'
import WdSelectB from './form/select/select_b'
import WdAddress from './form/select/address'
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
import WdNav from './layout/nav'
import WdTabs from './layout/tabs'
let components = [
    WdInput,
    WdSearch,
    WdForm,
    WdTreeSelect,
    WdSelect,
    WdAddress,
    WdSelectB,
    WdProgress,
    WdSwitch,
    WdPop,
    WdMask,
    WdList,
    WdTree,
    WdSwipe,
    WdTop,
    WdGrid,
    WdNav,
    WdTabs,
    WdButton
  ], props = [
    WdMsg
  ]
export {
  components,
  props
}
