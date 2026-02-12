export const apiVersion = '2025-12-30'

export const dataset = 'production'

export const projectId = '5ev142c0'
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
