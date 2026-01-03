import { http } from "../config/http"

export const AuthService = {
  login(username : string, password: string){
    return http.post('auth/login', { username, password}).then((res) => res.data);
  }
}