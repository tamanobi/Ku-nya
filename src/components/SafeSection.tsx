import { h, Component } from 'preact'
import SettingSection from './SettingSection'

interface Props {
  initial_is_safe: boolean
  update(isChecked: boolean): void
}

interface State {
  is_safe: boolean
}

export default class SafeSection extends Component<Props, State> {
  private safeSettingsId = 'checkbox_for_safe'

  constructor(props: Props) {
    super(props)
    this.state = {
      is_safe: props.initial_is_safe,
    }
  }

  handleCheckboxClick = (ev: Event) => {
    const {
      props: { update },
    } = this
    const target = ev.target as HTMLInputElement
    this.setState({
      is_safe: target.checked,
    })
    update(target.checked)
  }

  render() {
    return (
      <SettingSection title="[beta] Safe Setting(only apply to daily ranking)">
        <input
          type="checkbox"
          id={this.safeSettingsId}
          onClick={this.handleCheckboxClick}
          checked={this.state.is_safe}
        />
        {h('label', {
          htmlFor: this.safeSettingsId,
          children: ['not display sensitive illustrations'],
        })}
      </SettingSection>
    )
  }
}
