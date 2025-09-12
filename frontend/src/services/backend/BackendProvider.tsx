import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { BackendService } from './BackendService'
import { HttpBackendService } from './HttpBackendService'

const BackendContext = createContext<BackendService | null>(null)

export function BackendProvider({ children, baseUrl }: { children: ReactNode; baseUrl?: string }) {
  const service = useMemo(() => new HttpBackendService(baseUrl ?? ''), [baseUrl])
  return <BackendContext.Provider value={service}>{children}</BackendContext.Provider>
}

export function useBackend(): BackendService {
  const ctx = useContext(BackendContext)
  if (!ctx) throw new Error('useBackend must be used within BackendProvider')
  return ctx
}


