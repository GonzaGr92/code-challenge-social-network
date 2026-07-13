import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface SelectedUser {
  avatar: string
  name: string
  value: string
}

interface IState {
  selectedUser: SelectedUser | undefined
  setSelectedUser: (selectedUser: SelectedUser) => void
}

export const useUserSettingsStore = create<IState>()(
  devtools(
    persist(
      set => ({
        selectedUser: undefined,
        setSelectedUser: (selectedUser: SelectedUser) => set({ selectedUser }),
      }),
      {
        name: 'user-settings',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)
