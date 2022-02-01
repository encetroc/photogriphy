import { Outlet } from 'react-router-dom'
import { NavigationBar } from 'components'
import './App.scss'

function App() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="container__content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
