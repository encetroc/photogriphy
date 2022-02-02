import { Outlet } from 'react-router-dom'
import { NavigationBar, Modal } from 'components'
import './App.scss'

function App() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="container__content">
        <Outlet />
      </div>
      <Modal />
    </div>
  )
}

export default App
