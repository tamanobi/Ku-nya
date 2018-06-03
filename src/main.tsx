import { h, render } from 'preact'
import App from './components/App'
import { getOptions } from './lib/options'

document.addEventListener('DOMContentLoaded', async event => {
  const options = getOptions()
  render(<App options={options} />, document.getElementById('gallery'))
})
