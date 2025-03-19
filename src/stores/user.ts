import { defineStore } from "pinia";
import type { User } from "@/types/User";
interface UserData {
  token: string;
  name: string;
  email: string;
  user: User;
}
export const AuthStore = defineStore("authStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(userData: UserData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
