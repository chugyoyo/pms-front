proxy: {
  '^/api': {
    target: 'http://175.24.233.55/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  }
}
VUE_APP_BASE_API = '/api'
verificationCodeURL: "/api/verificationCode",
这样配置，可以使得验证码的获取和验证是一次会话，才能有session的attribute功能（有状态http）


yum install -y nodejs


安装：yum -y install git
①用ssh方式：ssh-keygen -t rsa -C '邮箱号',
将.ssh/id_rsa.pub中的数据填到账号的ssh的Key中，克隆的时候就用ssh路径克隆就行了
②输入账号名和密码用http方式克隆
然后git add *
git commit -m '消息'
git push [origin master]

后续如果git有更新：
更新本地的目录并显示所有分支：git fetch
 A..B  main       -> origin/main
 表示的是有main分支，其中是main->A->B
查看当前分支：git branch
检出分支：git checkout origin/分支名(一般都是主线名，也就是origin下的一级目录)