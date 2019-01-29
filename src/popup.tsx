import { h, render } from 'preact'
import SettingPanel from './components/SettingPanel'

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ method: 'getOptions' }, res => {
    render(
      <SettingPanel initialOptions={res.data} />,
      document.getElementById('setting'),
    )
  })
})
