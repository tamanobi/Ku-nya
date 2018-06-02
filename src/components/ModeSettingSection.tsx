import { h, Component } from 'preact'
import SettingSection from './SettingSection'
import { Selectables } from '../lib/options'

interface Props {
  initialValue: Selectables
  update(mode: Selectables)
}

interface State {
  value: Selectables
}

export default class ModeSettingSection extends Component<Props, State> {
  private selectableOptions: Array<Selectables> = [
    Selectables.Illust,
    Selectables.Manga,
    Selectables.Original,
    Selectables.Ugoira,
  ]

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.initialValue,
    }
  }

  handleModeChange = (ev: Event) => {
    const { update } = this.props
    const value = (ev.target as HTMLSelectElement).value as Selectables
    this.setState({ value })
    update(value)
  }

  render() {
    const {
      handleModeChange,
      state: { value },
    } = this

    return (
      <SettingSection title="Ranking Mode">
        <label for="content-selector">Ranking mode:</label>
        <select id="content-selector" value={value} onChange={handleModeChange}>
          {this.selectableOptions.map(selectable => (
            <option key={selectable} value={selectable}>
              {selectable}
            </option>
          ))}
        </select>
      </SettingSection>
    )
  }
}
