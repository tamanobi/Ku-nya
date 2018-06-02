import { h, render } from 'preact'
import App, { Options, Selectables } from './components/App'
import * as StorageUtil from './lib/StorageUtil'

document.addEventListener('DOMContentLoaded', async event => {
  const options: Options = {
    selected:
      window.localStorage && window.localStorage.getItem('content')
        ? (window.localStorage.getItem('content') as Selectables)
        : Selectables.Illust,
    excludingTags: StorageUtil.getJSON('excluding_tags', []),
    isExcludingHighAspectRatio: StorageUtil.getBoolean(
      'is_excluding_high_aspect_ratio',
    ),
    smallestIncludableAspectRatio: StorageUtil.getValue(
      'smallest_includable_aspect_ratio',
      3,
    ),
  }

  render(<App options={options} />, document.getElementById('gallery'))
})
