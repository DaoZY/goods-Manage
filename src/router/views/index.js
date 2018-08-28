const _import = require('../_import');
import Layout from '@/page/index/'
export default [{
    path: '/component',
    component: Layout,
    redirect: '/component/index',
    children: [{
            path: 'index',
            name: '组件示例',
            component: _import('table/demo', 'views')
    }]
}]
