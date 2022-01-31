import { NavLink } from 'react-router-dom'
import './NavigationLink.scss'

export function NavigationLink({
  children,
  to,
}: {
  children: JSX.Element
  to: string
}) {
  return (
    <NavLink
      to={to}
      className="link"
      style={({ isActive }: { isActive: boolean }) => ({
        backgroundColor: isActive ? '#828282' : 'transparent',
      })}
    >
      {children}
    </NavLink>
  )
}
