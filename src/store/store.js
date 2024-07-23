import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isLogin: true,
  username: "",
  

  setIsLogin: (newState) => set({ isLogin:newState}),
 
  setUsername: (newState) => set({ username:newState}),



}))