import "./Theming.scss";
import { Moon, Sun } from "react-feather";

export default function Theming() {
  const lightTheme = require("./themeConfig.json").light;
  const darkTheme = require("./themeConfig.json").dark;

  function setTheme(theme: any): void {
    const colors = document.documentElement.style;
    for (let key in theme) {
      colors.setProperty(key, theme[key]);
    }
  }

  return (
    <div className='theming'>
      <div className='rating-text'>
        <p>I'm feeling...</p>
      </div>
      <form className='rating'>
        <label className='lightIcon' htmlFor='Light'>
          <input
            title='Set Light Theme'
            type='radio'
            className='light'
            value='light'
            onChange={() => {
              setTheme(lightTheme);
            }}
          />
          <Sun color='var(--color-lightIcon)' size={24} />
        </label>

        <label className='darkIcon' htmlFor='Dark'>
          <input
            title='Set Dark Theme'
            type='radio'
            className='dark'
            value='dark'
            onChange={() => {
              setTheme(darkTheme);
            }}
            defaultChecked
          />
          <Moon color='var(--color-darkIcon)' size={24} />
        </label>
      </form>
    </div>
  );
}
