import Layout from '@/layout'

const clientRouter = {
  // 进到 pms 目录下
  path: '/',
  redirect: 'noRedirect',
  name: 'client',
  component: Layout,
  alwaysShow: true,
  // 注意：和name配对的是params，和path配对的是query
  children: [
    {
      name: 'info',
      path: '/info',
      component: () => import('@/views/pms/client/info')
    }]
}

export default clientRouter
