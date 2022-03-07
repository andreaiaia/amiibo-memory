import "./Theming.scss";
import { Moon, Speaker, Sun, Zap } from "react-feather";

export default function Theming() {
  function setLightTheme() {
    const vars = document.documentElement.style;
    vars.setProperty("--color-bg", "rgb(255, 225, 148)");
    vars.setProperty("--color-banner", "rgb(255, 179, 25)");
    vars.setProperty("--color-primary", "rgb(232, 246, 239)");
    vars.setProperty("--color-secondary", "rgb(184, 223, 216)");
    vars.setProperty("--color-label", "rgb(255, 179, 25)");
  }

  return (
    <div className='theming'>
      <div className='rating-text'>
        <p>I'm feeling...</p>
      </div>
      <form className='rating'>
        <label htmlFor='Light'>
          <input
            title='Set Light Theme'
            type='radio'
            name='rating'
            className='light'
            id='light'
            value='light'
            onChange={setLightTheme}
          />
          <Sun
            className='icon lightIcon'
            color='var(--color-lightIcon)'
            size={24}
          />
        </label>

        <label htmlFor='Dark'>
          <input
            title='Set Dark Theme'
            type='radio'
            name='rating'
            className='dark'
            id='dark'
            value='dark'
            defaultChecked
          />
          <Moon
            className='icon darkIcon'
            color='var(--color-darkIcon)'
            size={24}
          />
        </label>

        <label htmlFor='Groovy'>
          <input
            title='Set Groovy Theme'
            type='radio'
            name='rating'
            className='groovy'
            id='groovy'
            value='groovy'
          />
          <Speaker
            className='icon groovyIcon'
            color='var(--color-groovyIcon'
            size={24}
          />
        </label>

        <label htmlFor='Speedy'>
          <input
            title='Set Speedy Theme'
            type='radio'
            name='rating'
            className='speedy'
            id='speedy'
            value='speedy'
          />
          <Zap
            className='icon speedyIcon'
            color='var(--color-speedyIcon'
            size={24}
          />
        </label>
      </form>
    </div>
  );
}
