import request from "@/utils/request";

export function getAllTasks() {
  return request({
    url: '/task/all',
    method: 'get'
  })
}
export function getTaskList(params) {
  return request({
    url: '/task/list',
    method: 'get',
    params
  })
}

export function taskInfoById(id) {
  return request({
    url: '/task/' + id,
    method: 'get'
  })
}

export function taskAdd(data) {
  return request({
    url: '/task',
    method: 'post',
    // 带参数
    data
  })
}

export function taskUpdate(data) {
  return request({
    url: '/task',
    method: 'post',
    data
  })
}

export function taskDel(id) {
  const url = '/task/' + id
  return request({
    url: url,
    method: 'delete'
  })
}
