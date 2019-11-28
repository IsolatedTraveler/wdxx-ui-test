// 公共参数
import {formBase, formInput, formSelectBase, formSelect} from './common/form'
import list from './common/list'
// form 表单
import WdForm from './form/form'
import WdInput from './form/input/input'
import WdPwd from './form/input/pwd'
import WdProgress from './form/progress'
import WdSwitch from './form/switch'
import WdSearch from './form/input/search'
import WdSelect from './form/select/select'
import WdSelectM from './form/select/select_m'
import WdAddress from './form/select/address'
// 弹出层
import WdPop from './pop/pop'
import WdMask from './pop/mask'
import WdMsg from './pop/main'
// 数据展示
import WdList from './data/list/list.vue'
import WdTree from './data/list/tree'
import WdSwipe from './data/swipe'
import WdSignature from './data/signature'
// 布局
import WdTop from './layout/top'
import WdNav from './layout/nav'
import WdTabs from './layout/tabs'
WdInput.mixins = [formBase, formInput]
WdPwd.mixins = [formBase, formInput]
WdAddress.mixins = [formBase, formSelectBase]
WdSelect.mixins = [formBase, formSelectBase, formSelect]
WdSelectM.mixins = [formBase, formSelectBase, formSelect]
WdList.mixins = [list]
WdTree.mixins = [list]
let components = [
    WdInput,
    WdPwd,
    WdSearch,
    WdForm,
    WdSelect,
    WdAddress,
    WdSelectM,
    WdProgress,
    WdSwitch,
    WdPop,
    WdMask,
    WdList,
    WdTree,
    WdSwipe,
    WdSignature,
    WdTop,
    WdNav,
    WdTabs
  ], props = [
    WdMsg
  ]
export {
  components,
  props
}
