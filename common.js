'use restrict';

function getBooleanFromLocalStorage(key) {
  if (!window.localStorage) return false;
  return (window.localStorage.getItem(key) === '0')? false: true;
}

function getNumberFromLocalStorage(key, _default) {
  if (!window.localStorage) return _default;
  return (window.localStorage.getItem(key) !== null)? window.localStorage.getItem(key) : _default;
}

function getJsonFromLocalStorage(key, _default) {
  _default = (typeof _default !== undefined) ? _default : {};
  if (!window.localStorage) return _default;
  return (window.localStorage.getItem(key) !== null)? JSON.parse(window.localStorage.getItem(key)) : _default;
}
