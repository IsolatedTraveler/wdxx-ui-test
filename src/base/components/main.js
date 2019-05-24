import input from './form/input'
import form from './form/form'
import treeSelect from './form/treeSelect'
import select from './form/select'
import progress from './form/progress'
import wdSwitch from './form/switch'
import pop from './pop/pop'
import mask from './pop/mask'
import msg from './pop/main'
import list from './data/list'
import tree from './data/tree'
import top from './layout/top'
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
    top
  ],
  props: [
    msg
  ]
}
