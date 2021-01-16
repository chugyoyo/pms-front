import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/client/login',
    method: 'post',
    data
  })
}

export function sendEmailCode(data){
  return request({
    url: '/email/sendCode',
    method: 'post',
    data
  })
}

export function getClientInfo() {
  return request({
    url: '/client/info',
    method: 'get'
  })
}

export function getInfoById(id) {
  return request({
    url: '/client/' + id,
    method: 'get'
  })
}

export function clientList(params) {
  return request({
    url: '/client/list',
    method: 'get',
    params
  })
}

export function clientAdd(data) {
  return request({
    url: '/client/add',
    method: 'post',
    // 带参数
    data
  })
}

export function clientUpdate(data) {
  return request({
    url: '/client',
    method: 'put',
    data
  })
}

export function clientChangeName(clientName){
  return request({
    url:'/client/name',
    method:'put',
    params:{
      clientName: clientName
    }
  })
}

export function clientDel(id) {
  const url = '/client/' + id
  return request({
    url: url,
    method: 'delete'
  })
}

