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
})

export const setMode = (mode: Modes) => storageUtil.setValue('content', mode)

export const setAspectRatioSettings = (isChecked: boolean, value: number) => {
  storageUtil.setBoolean('is_excluding_high_aspect_ratio', isChecked)
  storageUtil.setValue('smallest_includable_aspect_ratio', value)
}

export const setExcludingTags = (tags: string[]) =>
  storageUtil.setJSON('excluding_tags', tags)
