import * as StorageUtil from './lib/StorageUtil'
import { getOriginalRanking, getRanking, IllustEntry } from './lib/api'

type ElementSet = { anchor: HTMLAnchorElement, img: HTMLImageElement }
type ExcludeTagEntry = { name: string }

function shuffle<T>(array: T[]): T[] {
  let n = array.length

  while (n) {
    const i = Math.floor(Math.random() * n--)
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }

  return array
}

async function init(content, excludingTags: ExcludeTagEntry[], isExcludingHighAspectRatio: boolean, smallestIncludableAspectRatio: number) {
  excludingTags = excludingTags || []
  isExcludingHighAspectRatio = isExcludingHighAspectRatio != null ? isExcludingHighAspectRatio : false
  smallestIncludableAspectRatio = smallestIncludableAspectRatio != null ? smallestIncludableAspectRatio : 3

  let illusts: IllustEntry[]

  if (content === "original") {
    illusts = await getOriginalRanking()
  } else {
    illusts = await getRanking(content)
  }

  const gallery = document.querySelector('#gallery')!

  const elements: ElementSet[] = await shuffle(illusts)
    .filter(illust => {
      // reject if excluding tag contained
      return !illust.tags.some(tag => excludingTags.some(({ name }) => name === tag))
    })
    .filter(illust => {
      return illust.height / illust.width <= smallestIncludableAspectRatio
    })
    .map(illust => new Promise<ElementSet>((resolve) => {
      const anchor = document.createElement('a')
      anchor.setAttribute('href', `https://www.pixiv.net/i/${illust.id}`)
      anchor.setAttribute('target', '_blank')

      const img = new Image()
      img.src = illust.imageUrl
      img.alt = `${illust.authorName} / ${illust.title}`
      img.onload = img.onerror = () => resolve({anchor, img})

      anchor.appendChild(img)
    }))
    .reduce((m, el, index, list) => (index === list.length - 1) ? Promise.all(list) : m, []) // Reduce to Promise.all

  elements.forEach(elements => gallery.appendChild(elements.anchor))
  setTimeout(() => { elements.forEach(element => element.img.classList.add('loaded')) }, 125)
}

document.addEventListener('DOMContentLoaded', event => {
  const options = {
    selected: (window.localStorage && window.localStorage.getItem('content')) ? window.localStorage.getItem('content') : 'illust',
    excludingTags: StorageUtil.getJSON('excluding_tags', []),
    isExcludingHighAspectRatio: StorageUtil.getBoolean('is_excluding_high_aspect_ratio'),
    smallestIncludableAspectRatio: StorageUtil.getValue('smallest_includable_aspect_ratio', 3),
  }

  init(
    options.selected,
    options.excludingTags,
    options.isExcludingHighAspectRatio,
    options.smallestIncludableAspectRatio
  )
})
