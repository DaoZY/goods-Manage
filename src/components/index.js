import SjTable from './sj-table/sj-table'
import SjTreeTable from './sj-tree-table/sj-tree-table'
import SjSelect from './sj-select/sj-select'
import SjDictSelect from './sj-dict-select/sj-dict-select'

const components = [
  SjTable,
  SjTreeTable,
  SjSelect,
  SjDictSelect
]

const install = function (Vue, axios, opts = {}) {
  //注入axios;
  Vue.prototype.$http = axios;
  const AVUE = {
    clientHeight: document.documentElement.clientHeight
  };
  components.map(component => {
    Vue.component(component.name, component);
  });

  AVUE.size = opts.size || '';
  Vue.prototype.$AVUE = AVUE;
}

if (typeof window !== 'undefined' && window.Vue && window.axios) {
  install(window.Vue, window.axios);
}

export default {
  version: '1.0.0',
  SjTable,
  SjTreeTable,
  SjSelect,
  SjDictSelect
}