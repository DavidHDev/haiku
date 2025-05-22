import { useCallback, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Name of the API whose permissions you want to query
 * @link [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query#name)
 */
type Permission =
  PermissionName |
  'accelerometer' |
  'accessibility-events' |
  'ambient-light-sensor' |
  'background-sync' |
  'camera' |
  'clipboard-read' |
  'clipboard-write' |
  'gyroscope' |
  'local-fonts' |
  'magnetometer' |
  'microphone' |
  'payment-handler' |
  'top-level-storage-access' |
  'window-management'

/**
 * Represents the state of a requested permission, combining the standard `PermissionState` with additional internal states.
 *
 * - `checking`: The permission state is being verified.
 * - `not-supported`: The permission check is not supported or an error occurred during verification.
 *
 * @link [`PermissionState`](https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/state)
 */
export type UsePermissionState = PermissionState | 'checking' | 'not-supported';

/**
 * Check browser permissions for querying state for various browser APIs
 *
 * @param {Permission} permission The name of the permission to query.
 * @return {UsePermissionState} The state of a requested permission
 */
export const usePermission = (permission: Permission): UsePermissionState => {
  const [state, setState] = useState<UsePermissionState>('checking');
  const status = useRef<PermissionStatus | null>(null)

  const handleStatusChange = useCallback((event: Event) => {
    const target = event.target as PermissionStatus
    setState(target.state)
  }, [])

  const checkPermission = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      setState('not-supported')
      return
    }

    try {
      const result = await navigator.permissions.query({
        name: permission as PermissionName
      })

      setState(result.state)
      result.addEventListener('change', handleStatusChange)
      status.current = result
    } catch {
      setState('not-supported')
      status.current = null
    }
  }, [permission, handleStatusChange])

  useIsomorphicLayoutEffect(() => {
    checkPermission()

    return () => {
      status.current?.removeEventListener('change', handleStatusChange)
    }
  }, [checkPermission, handleStatusChange])

  return state
}
