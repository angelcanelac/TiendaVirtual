import { http } from "@/utilidades/http";
import type { AxiosResponse } from "axios";
import type { User } from "@/types/User";
import { AuthStore } from "@/stores/user";
class Auth {
  async signIn(data: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> {
    return http.post("login", data).then((data) => data);
  }
  async signUp(data: User): Promise<AxiosResponse> {
    return http.post("register", data).then((data) => data);
  }
  async signOut(): Promise<AxiosResponse> {
    const store = AuthStore();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.user.token}`,
    };
    return http.post("logout", {}, { headers }).then((data) => data);
  }
}
const auth = new Auth();
export default auth;
