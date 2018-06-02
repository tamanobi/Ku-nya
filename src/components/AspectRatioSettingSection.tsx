import { h, Component } from 'preact'
import SettingSection from './SettingSection'

interface Props {
  initial_smallest_includable_aspect_ratio: number
  initial_is_excluding_high_aspect_ratio: boolean
  update(isChecked: boolean, value: number): void
}

interface State {
  smallest_includable_aspect_ratio: number
  is_excluding_high_aspect_ratio: boolean
}

export default class AspectRatioSettingSection extends Component<Props, State> {
  private aspectRatioSettingsId = 'checkbox_for_excluding_high_aspect_ratio'

  constructor(props: Props) {
    super(props)
    this.state = {
      smallest_includable_aspect_ratio:
        props.initial_smallest_includable_aspect_ratio,
      is_excluding_high_aspect_ratio:
        props.initial_is_excluding_high_aspect_ratio,
    }
  }

  handleCheckboxClick = (ev: Event) => {
    const {
      state: { smallest_includable_aspect_ratio },
      props: { update },
    } = this
    const target = ev.target as HTMLInputElement
    this.setState({
      is_excluding_high_aspect_ratio: target.checked,
    })
    update(target.checked, smallest_includable_aspect_ratio)
  }

  handleNumberChange = (ev: Event) => {
    const {
      state: { is_excluding_high_aspect_ratio },
      props: { update },
    } = this
    const target = ev.target as HTMLInputElement
    const value = parseInt(target.value, 10)
    this.setState({
      smallest_includable_aspect_ratio: value,
    })
    update(is_excluding_high_aspect_ratio, value)
  }

  render() {
    const {
      aspectRatioSettingsId,
      handleCheckboxClick,
      handleNumberChange,
      state: {
        smallest_includable_aspect_ratio,
        is_excluding_high_aspect_ratio,
      },
    } = this

    return (
      <SettingSection title="Mute Setting(Aspect Ratio)">
        <input
          type="checkbox"
          id={aspectRatioSettingsId}
          onClick={handleCheckboxClick}
          checked={is_excluding_high_aspect_ratio}
        />
        {h('label', {
          htmlFor: aspectRatioSettingsId,
          children: [
            'Excluding images with over ',
            <input
              type="number"
              style="width: 3em;"
              value={smallest_includable_aspect_ratio}
              onChange={handleNumberChange}
              disabled={!is_excluding_high_aspect_ratio}
            />,
            ' times aspect ratio(The narrow side as 1.0).',
          ],
        })}
      </SettingSection>
    )
  }
}
