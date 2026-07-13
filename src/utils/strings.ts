const dash = '-'

export const dasherize = (value: string): string => {
  return value.trim().replace(/\s+/g, dash).replace(/_+/g, dash).replace(/-+/g, dash).toLowerCase()
}
