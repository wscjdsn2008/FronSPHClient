import home from '@/pages/Home'
import register from '@/pages/Register'
import login from '@/pages/Login'
import search from '@/pages/Search'
import detail from '@/pages/Detail'
const routes = [

    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: home,

    },
    {
        path: '/register',
        component: register,
        meta: { hidden: true },
    },
    {
        path: '/login',
        component: login,
        meta: { hidden: true },
    },
    {
        path: '/search/:keyword?',//占位是匹配params参数 ,?代表params参数可传可不传
        name: 'search',//命名路由
        component: search,
    },
    {
        path: '/detail/:goodsId',
        component: detail
    },

]
export default routes