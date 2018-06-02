import { h, Component } from 'preact'
import {
  Options,
  setMode,
  setAspectRatioSettings,
  setExcludingTags,
} from '../lib/options'
import ModeSettingsSection from './ModeSettingSection'
import AspectRatioSettingSection from './AspectRatioSettingSection'
import TagSettingSection from './TagSettingSection'

interface Props {
  initialOptions: Options
}

export default class SettingPanel extends Component<Props> {
  handleAspectRatioSettingsChange = () => {}

  render() {
    const {
      mode,
      isExcludingHighAspectRatio,
      smallestIncludableAspectRatio,
      excludingTags,
    } = this.props.initialOptions

    return (
      <div>
        <ModeSettingsSection initialValue={mode} update={setMode} />
        <AspectRatioSettingSection
          initial_is_excluding_high_aspect_ratio={isExcludingHighAspectRatio}
          initial_smallest_includable_aspect_ratio={
            smallestIncludableAspectRatio
          }
          update={setAspectRatioSettings}
        />
        <TagSettingSection
          initialTags={excludingTags}
          update={setExcludingTags}
        />
      </div>
    )
  }
}
