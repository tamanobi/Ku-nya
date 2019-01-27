import { h, Component } from 'preact'
import Illust from './Illust'
import {
  IllustEntry,
  getOriginalRanking,
  getRanking,
  getNewIllusts,
  getPopularIllusts,
} from '../lib/api'
import { Options, Modes } from '../lib/options'
import { shuffle } from '../lib/util'

import * as Sentry from '@sentry/browser'
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  })
}

interface Props {
  options: Options
}

interface State {
  illusts: IllustEntry[]
  isReady: boolean
}

export default class App extends Component<Props, State> {
  private pendingCount: number

  constructor(props: Props) {
    super(props)
    this.state = {
      illusts: [],
      isReady: false,
    }
  }

  async componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
      .then(registration => {
        // 登録成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(err => {
        // 登録失敗 :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }

    const { options } = this.props
    const allIllusts = await this.loadContent(options)

    const illusts = await shuffle(allIllusts)
      .filter(illust => {
        // reject if contains tags to be excluded
        return !illust.tags.some(tag => options.excludingTags.includes(tag))
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
    const { mode } = options

    return mode === Modes.Original
      ? getOriginalRanking()
      : mode === Modes.Newer
        ? getNewIllusts()
        : mode === Modes.Popular
          ? getPopularIllusts()
          : getRanking(mode)
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
