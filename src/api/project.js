import request from '@/utils/request'

export function getProjectsList() {
  return request({
    url: '/project/list',
    method: 'get'
  })
}


export function projectMember(projectId){
  const url = '/project/members/' + projectId
  return request({
    url: url,
    method: 'get'
  })
}


export function projectInfoById(id) {
  return request({
    url: '/project/' + id,
    method: 'get'
  })
}

export function projectInto(params) {
  const url = '/project/into'
  return request({
    url: url,
    method: 'post',
    params
  })
}

export function projectAdd(data) {
  return request({
    url: '/project',
    method: 'post',
    // 带参数
    data
  })
}

export function projectUpdate(data) {
  return request({
    url: '/project',
    method: 'put',
    data
  })
}

export function projectDel(id) {
  const url = '/project/' + id
  return request({
    url: url,
    method: 'delete'
  })
}


export function projectLeave(id) {
  const url = '/project/leave/' + id
  return request({
    url: url,
    method: 'delete'
  })
}

