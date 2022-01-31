import { Outlet, Link } from 'react-router-dom'
import { NavigationBar } from 'components'
import './App.scss'

function App() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
