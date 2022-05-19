const process_test = () => {
  process.title = '正在测试process进程'
  console.log('process.pid', process.pid)
  console.log('process.ppid', process.ppid)
  console.log('process.uptime()', process.uptime())
  console.log('process.platform', process.platform)
  console.log('process.cwd()', process.cwd())
}
export default process_test