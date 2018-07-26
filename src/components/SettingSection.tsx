import { h, FunctionalComponent } from 'preact'

const SettingSection: FunctionalComponent<{ title: string }> = ({
  title,
  children,
}) => (
  <section>
    <h1>{title}</h1>
    {children}
  </section>
)

export { SettingSection as default }
