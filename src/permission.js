import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // test
  console.log(to.path)
  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      console.log('目标目录是/login')
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.clientInfo
      if (hasGetUserInfo !== '') {
        console.log('有用户信息')
        next()
      } else {
        try {
          // get user info
          console.log('获取用户数据')
          await store.dispatch('client/getClientInfo')
          next()
        } catch (error) {
          console.log('获取用户数据出错')
          // remove token and go to login page to re-login
          await store.dispatch('client/resetToken')
          Message.error(error || 'Verification failed, please login again')
          next()
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('白名单')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log('非白名单')
      next(`/login?redirect=${to.path}`)
      // 参数有什么用？
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
