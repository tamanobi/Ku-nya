import { h, render } from 'preact'
import { getOptions } from './lib/options'
import SettingPanel from './components/SettingPanel'

document.addEventListener('DOMContentLoaded', () => {
  const options = getOptions()
  render(
    <SettingPanel initialOptions={options} />,
    document.getElementById('setting'),
  )
})
