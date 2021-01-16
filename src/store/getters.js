const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.client.token,
  clientInfo: state => state.client.clientInfo,
  projectId: state => state.project.projectId,
  tasksInfoList: state => state.task.tasksInfoList,
}
export default getters
