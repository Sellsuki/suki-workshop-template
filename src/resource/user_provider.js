import HttpRequest from './http_request'

class UserProvider extends HttpRequest {
  fetchUsers () {
    return this.fetch('/users')
  }
}

export default UserProvider
