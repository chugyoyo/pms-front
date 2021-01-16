import Layout from '@/layout'

const projectRouter = {
  // 进到 pms 目录下
  path: '/',
  redirect: 'noRedirect',
  name: 'project',
  component: Layout,
  alwaysShow: true,
  // 注意：和name配对的是params，和path配对的是query
  children: [
    {
      name: 'project_list',
      path: '/',
      component: () => import('@/views/pms/project/list'),
    },
    {
      name: 'project_edit',
      path: '/project/edit',
      component: () => import('@/views/pms/project/edit'),
    },
    {
      name: 'project_add',
      path: '/project/add',
      component: () => import('@/views/pms/project/add')
    },
    {
      name: 'project_into',
      path: '/project/into',
      component: () => import('@/views/pms/project/into')
    }
  ]
}

export default projectRouter
