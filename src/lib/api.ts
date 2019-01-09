import axios from 'axios'

export interface IllustEntry {
  id: number
  imageUrl: string
  title: string
  tags: string[]
  width: number
  height: number
  authorName: string
}

const imageResolution = '480x960'

export const getNewIllusts = async (): Promise<IllustEntry[]> => {
  const URL =
    'https://www.pixiv.net/touch/ajax_api/ajax_api.php?mode=new_illust'
  const responses = await Promise.all([
    axios.get(`${URL}&p=1`),
    axios.get(`${URL}&p=2`),
    axios.get(`${URL}&p=3`),
    axios.get(`${URL}&p=4`),
  ])

  return responses
    .filter(res => res.status == 200)
    .map(res =>
      res.data.filter(content => typeof content.illust_id !== 'undefined'),
    )
    .map(res =>
      res.map(
        (content): IllustEntry => ({
          id: content.illust_id,
          imageUrl: content.url
            .replace(/c\/\d+x\d+_\d+_\w+\//, `c/${imageResolution}/`)
            .replace('_square', '_master'),
          title: content.title,
          tags: content.tags,
          width: content.illust_width,
          height: content.illust_height,
          authorName: content.user_name,
        }),
      ),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getPopularIllusts = async (): Promise<IllustEntry[]> => {
  const URL =
    'https://www.pixiv.net/touch/ajax_api/ajax_api.php?mode=popular_illust&type='
  const responses = await Promise.all([
    axios.get(`${URL}&p=1`),
    axios.get(`${URL}&p=2`),
    axios.get(`${URL}&p=3`),
    axios.get(`${URL}&p=4`),
  ])

  return responses
    .filter(res => res.status == 200)
    .map(res =>
      res.data.filter(content => typeof content.illust_id !== 'undefined'),
    )
    .map(res =>
      res.map(
        (content): IllustEntry => ({
          id: content.illust_id,
          imageUrl: content.url
            .replace(/c\/\d+x\d+_\d+_\w+\//, `c/${imageResolution}/`)
            .replace('_square', '_master'),
          title: content.title,
          tags: content.tags,
          width: content.illust_width,
          height: content.illust_height,
          authorName: content.user_name,
        }),
      ),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getOriginalRanking = async (): Promise<IllustEntry[]> => {
  const URL = 'https://www.pixiv.net/ranking.php?format=json&mode=original'
  const responses = await Promise.all([
    axios.get(`${URL}&p=1`),
    axios.get(`${URL}&p=2`),
    axios.get(`${URL}&p=3`),
  ])

  return responses
    .filter(res => res.status == 200)
    .map(res =>
      res.data.contents.map(
        (content): IllustEntry => ({
          id: content.illust_id,
          imageUrl: content.url.replace(
            /c\/\d+x\d+\//,
            `c/${imageResolution}/`,
          ),
          title: content.title,
          tags: content.tags,
          width: content.width,
          height: content.height,
          authorName: content.user_name,
        }),
      ),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}

export const getRanking = async (
  content: 'illust' | 'manga' | 'ugoira',
): Promise<IllustEntry[]> => {
  const URL = `https://www.pixiv.net/ranking.php?mode=daily&format=json&content=${content}`
  const responses = await Promise.all(
    [axios.get(`${URL}&p=1`), axios.get(`${URL}&p=2`)].concat(
      // cannnot fetch ugoira ranking over page 3.
      content !== 'ugoira' ? [axios.get(`${URL}&p=3`)] : [],
    ),
  )

  return responses
    .filter(res => res.status == 200)
    .map(res =>
      res.data.contents.map(
        (content): IllustEntry => ({
          id: content.illust_id,
          imageUrl: content.url.replace(
            /c\/\d+x\d+\//,
            `c/${imageResolution}/`,
          ),
          title: content.title,
          tags: content.tags,
          width: content.width,
          height: content.height,
          authorName: content.user_name,
        }),
      ),
    )
    .reduce((l, r) => l.concat(...r), []) // flatten
}
