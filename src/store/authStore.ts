import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  isLoading: false,
    login: () => {
      set({ isAuthenticated: true });
      // Mock login action
      // In a real app you'd set auth state and redirect; here just log for dev.
      // eslint-disable-next-line no-console
      console.log('Mock login called');
    },
    logout: () => {
      set({ isAuthenticated: false });
      // Mock logout
      // eslint-disable-next-line no-console
      console.log('Mock logout called');
    },
}));
