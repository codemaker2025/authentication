import { atomWithStorage } from 'jotai/utils'

// This will automatically read from and write to localStorage
// export const authTokenAtom = atomWithStorage('auth-storage', '')

export const authTokenAtom = atomWithStorage("auth-storage'", null, undefined, {
  getOnInit: true,
});