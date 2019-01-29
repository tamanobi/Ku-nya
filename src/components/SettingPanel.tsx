import { h, Component } from 'preact'
import {
  Options,
  setMode,
  setAspectRatioSettings,
  setExcludingTags,
  setSafe,
} from '../lib/options'
import ModeSettingsSection from './ModeSettingSection'
import AspectRatioSettingSection from './AspectRatioSettingSection'
import TagSettingSection from './TagSettingSection'
import SafeSection from './SafeSection'

interface Props {
  initialOptions: Options
}

export default class SettingPanel extends Component<Props> {
  render() {
    const {
      mode,
      isExcludingHighAspectRatio,
      smallestIncludableAspectRatio,
      excludingTags,
      isSafe,
    } = this.props.initialOptions

    return (
      <div>
        <SafeSection initial_is_safe={isSafe} update={setSafe} />
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
