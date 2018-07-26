import { h, Component } from 'preact'

interface Props {
  label: string
  placeholder: string
  add(value: string): void
}

interface State {
  value: string
}

export default class TagInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement
    this.setState({ value: target.value })
  }

  handleAddClick = () => {
    const {
      props: { add },
      state: { value },
    } = this
    add(value)
    this.setState({ value: '' })
  }

  render() {
    const {
      props: { label, placeholder },
      state: { value },
      handleChange,
      handleAddClick,
    } = this

    return (
      <span>
        <label>
          {label}
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </label>
        <button onClick={handleAddClick}>Add</button>
      </span>
    )
  }
}
