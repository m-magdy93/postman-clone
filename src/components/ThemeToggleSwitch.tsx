import { useState, useEffect, memo } from 'react'
import { themeChange } from 'theme-change'

function ThemeToggleSwitch() {
  // get and define theme state
  const initialTheme = window.localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = useState(initialTheme)

  // set at first mount
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  // handle toggling the theme
  const handleTheme = () => {
    const toggledTheme = theme === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', toggledTheme)
    setTheme(toggledTheme)
    themeChange(false)
  }

  return (
    <div className="flex flex-row justify-end mb-5">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="mr-1">🌞</span>
          <input
            name="theme"
            data-toggle-theme="dark,light"
            type="checkbox"
            className="toggle"
            defaultChecked={theme === 'light' ? false : true}
            onChange={handleTheme}
            data-act-class="ACTIVECLASS"
          />
          <span className="ml-1">🌚</span>
        </label>
      </div>
    </div>
  )
}

export default memo(ThemeToggleSwitch)
