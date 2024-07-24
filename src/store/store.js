import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isLogin: false,
  username: "",
  

  setIsLogin: (newState) => set({ isLogin:newState}),
 
  setUsername: (newState) => set({ username:newState}),



}))