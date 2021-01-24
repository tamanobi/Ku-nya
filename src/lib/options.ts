import * as storageUtil from '../lib/StorageUtil'

export enum Modes {
  Original = 'original',
  Illust = 'illust',
  Manga = 'manga',
  Ugoira = 'ugoira',
  Newer = 'newer',
  Popular = 'popular',
}

export interface Options {
  mode: Modes
  excludingTags: string[]
  isExcludingHighAspectRatio: boolean
  smallestIncludableAspectRatio: number
  isSafe: boolean
}

export const getOptions = (): Options => ({
  mode: storageUtil.getValue('content', Modes.Illust),
  excludingTags: storageUtil.getJSON('excluding_tags', []),
  isExcludingHighAspectRatio: storageUtil.getBoolean(
    'is_excluding_high_aspect_ratio',
    false,
  ),
  smallestIncludableAspectRatio: storageUtil.getValue(
    'smallest_includable_aspect_ratio',
    3,
  ),
  isSafe: storageUtil.getBoolean('is_safe', true),
})

export const setMode = (mode: Modes) => {
  chrome.runtime.sendMessage(
    { method: 'setMode', params: { mode: mode } },
    () => {},
  )
}

export const setAspectRatioSettings = (isChecked: boolean, value: number) => {
  chrome.runtime.sendMessage(
    {
      method: 'setAspectRatioSettings',
      params: {
        is_excluding_high_aspect_ratio: isChecked,
        smallest_includable_aspect_ratio: value,
      },
    },
    () => {},
  )
}

export const setExcludingTags = (tags: string[]) => {
  chrome.runtime.sendMessage(
    {
      method: 'setExcludingTags',
      params: {
        tags,
      },
    },
    () => {},
  )
}

export const setSafe = (isSafe: boolean) => {
  chrome.runtime.sendMessage(
    {
      method: 'setSafe',
      params: {
        is_safe: isSafe,
      },
    },
    () => {},
  )
}
