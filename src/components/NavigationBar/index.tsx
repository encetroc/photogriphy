import { Heart, Image, Logo } from 'icons'
import { NavigationLink } from 'components'
import './NavigationBar.scss'

export function NavigationBar() {
  return (
    <nav className="navigation">
      <div className="navigation__logo">
        <Logo />
      </div>
      <div className="navigation__links">
        <NavigationLink to="/all-photos">
          <Image />
        </NavigationLink>
        <NavigationLink to="liked-photos">
          <Heart />
        </NavigationLink>
      </div>
    </nav>
  )
}
