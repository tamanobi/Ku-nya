import { h, Component } from 'preact'
import Illust from './Illust'
import { IllustEntry, getOriginalRanking, getRanking } from '../lib/api'
import { Options, Selectables } from '../lib/options'
import { shuffle } from '../lib/util'

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
