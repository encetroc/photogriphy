import { Outlet, useParams } from 'react-router-dom'
import { NavigationBar, Modal } from 'components'
import './App.scss'

function App() {
  const { id } = useParams()
  console.log(id)
  return (
    <div className="container">
      <NavigationBar />
      <div className="container__content">
        <Outlet />
      </div>
      {!!id && <Modal />}
    </div>
  )
}

export default App
