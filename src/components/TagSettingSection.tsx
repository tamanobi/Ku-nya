import { h, Component, FunctionalComponent } from 'preact'
import SettingSection from './SettingSection'
import TagInput from './TagInput'

interface Props {
  initialTags: string[]
  update(tags: string[]): void
}

interface State {
  tags: string[]
}

export default class TagSettingSection extends Component<Props, State> {
  handleTagAdd = (value: string) => {
    const {
      props: { update },
      state: { tags },
    } = this
    if (value === '' || tags.includes(value)) {
      return
    }
    const newtags = [...tags, value]
    this.setState({ tags: newtags })
    update(newtags)
  }

  handleTagDelete = (name: string) => {
    const { update } = this.props
    const tags = this.state.tags.filter(tag => tag !== name)

    this.setState({ tags })
    update(tags)
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      tags: this.props.initialTags,
    }
  }

  render() {
    const {
      handleTagAdd,
      handleTagDelete,
      state: { tags },
    } = this
    return (
      <SettingSection title="Mute Setting(Tag)">
        <TagInput
          label="Excluding tag"
          placeholder="Fate/Grand_Order"
          add={handleTagAdd}
        />
        <ul>
          {tags.map(tag => (
            <Tag key={tag} name={tag} onDelete={handleTagDelete} />
          ))}
        </ul>
      </SettingSection>
    )
  }
}

const Tag: FunctionalComponent<{
  name: string
  onDelete(name: string): void
}> = ({ name, onDelete }) => {
  const handleTagDelete = () => onDelete(name)

  return (
    <li className="tag">
      {name}
      <button value="tag.name" onClick={handleTagDelete}>
        x
      </button>
    </li>
  )
}
