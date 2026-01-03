import { http } from "../config/http"

export const UserService = {
  create(username : string, password: string, confirm: string){
    return http.post('user', { username, password, confirm }).then((res) => res.data);
  }
}