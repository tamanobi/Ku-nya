import { h, render, Component } from 'preact'
import * as StorageUtil from './lib/StorageUtil'
import { shuffle } from './lib/util'
import { getOriginalRanking, getRanking, IllustEntry } from './lib/api'

type ExcludeTagEntry = { name: string }

enum Selectables {
  Original = 'original',
  Illust = 'illust',
  Manga = 'manga',
  Ugoira = 'ugoira',
}

interface Options {
  selected: Selectables
  excludingTags: ExcludeTagEntry[]
  isExcludingHighAspectRatio: boolean
  smallestIncludableAspectRatio: number
}

class Illust extends Component<{
  illust: IllustEntry
  isReady: boolean
  onload(): void
}> {
  render() {
    const { illust, isReady, onload } = this.props
    return (
      <a target="_blank" href={`https://www.pixiv.net/i/${illust.id}`}>
        <img
          className={isReady && 'loaded'}
          alt={`${illust.authorName} / ${illust.title}`}
          src={illust.imageUrl}
          ref={(img: HTMLImageElement) => {
            img && (img.onload = img.onerror = onload)
          }}
        />
      </a>
    )
  }
}

interface Props {
  options: Options
}

interface State {
  illusts: IllustEntry[]
  isReady: boolean
}

class App extends Component<Props, State> {
  private pendingCount: number

  constructor(props: Props) {
    super(props)
    this.state = {
      illusts: [],
      isReady: false,
    }
  }

  async componentDidMount() {
    const { options } = this.props
    const allIllusts = await this.loadContent(options)

    const illusts = await shuffle(allIllusts)
      .filter(illust => {
        // reject if contains tags to be excluded
        return !illust.tags.some(tag =>
          options.excludingTags.some(({ name }) => name === tag),
        )
      })
      .filter(illust => {
        return (
          illust.height / illust.width <= options.smallestIncludableAspectRatio
        )
      })

    this.setState({ illusts })
    this.pendingCount = illusts.length
  }

  loadContent(options: Options): Promise<IllustEntry[]> {
    const { selected } = options

    return selected === Selectables.Original
      ? getOriginalRanking()
      : getRanking(selected)
  }

  handleLoadOrError = () => {
    if (--this.pendingCount <= 0) {
      setTimeout(() => {
        this.setState({ isReady: true })
      }, 125)
    }
  }

  render() {
    const { illusts, isReady } = this.state
    return (
      <div>
        {// TODO: Remove element when error occurred
        illusts.map(illust => (
          <Illust
            key={illust.id}
            isReady={isReady}
            illust={illust}
            onload={this.handleLoadOrError}
          />
        ))}
      </div>
    )
  }
}

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
