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
用ssh方式：ssh-keygen -t rsa -C '邮箱号'
将.ssh/id_rsa.pub中的数据填到账号的ssh的Key中，克隆的时候就用ssh路径克隆就行了