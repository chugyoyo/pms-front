import Layout from '@/layout'

const projectRouter = {
  // 进到 pms 目录下
  path: '/task',
  redirect: 'noRedirect',
  name: 'task',
  component: Layout,
  alwaysShow: true,
  // 注意：和name配对的是params，和path配对的是query
  children: [
    {
      name: 'task_list',
      path: '/task/list',
      component: () => import('@/views/pms/task/list'),
    },
    {
      name: 'task_edit',
      path: '/task/edit',
      component: () => import('@/views/pms/task/edit'),
    },
    {
      name: 'task_add',
      path: '/task/add',
      component: () => import('@/views/pms/task/add')
    },
  ]
}

export default projectRouter
