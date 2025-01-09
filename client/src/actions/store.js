import { create } from "zustand";
import { api } from "@/utils/constants";
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set(() => ({
      user: user,
    })),

  setIsAuthenticated: (status) =>
    set(()=>({isAuthenticated:status})),
  
  fetchUser: async () => {
    try {
      const response = await api.get("/users/verify");
      const userData = response.data.data.user;
      set({ isAuthenticated: true, user: userData });
    } catch (error) {
      set({ isAuthenticated: false, user: null });
      console.error("Failed to fetch user", error);
    }
  },
  clearUser: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),
}));

export default useAuthStore;
