export function getBoolean(key: string, _default?: boolean): boolean {
  if (!window.localStorage) return false
  return (window.localStorage.getItem(key) !== null)
    ? (window.localStorage.getItem(key) !== '0')
    : _default
}

export function getValue(key: string, _default?: any): any {
  if (!window.localStorage) return _default
  return window.localStorage.getItem(key) !== null
    ? window.localStorage.getItem(key)
    : _default
}

export function getJSON(key: string, _default?: any): any {
  _default = _default || {}
  if (!window.localStorage) return _default
  return window.localStorage.getItem(key) !== null
    ? JSON.parse(window.localStorage.getItem(key))
    : _default
}

export function setBoolean(key: string, val: boolean) {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, val !== false ? '1' : '0')
}

export function setValue(key: string, val: any) {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, String(val))
}

export function setJSON(key: string, obj: any) {
  if (!window.localStorage) return false
  window.localStorage.setItem(key, JSON.stringify(obj))
}
