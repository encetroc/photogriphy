import { Outlet, useParams } from 'react-router-dom'
import { NavigationBar, Modal } from 'components'
import { PhotoContextProvider } from 'context'
import './App.scss'

function App() {
  const { id } = useParams()
  return (
    <PhotoContextProvider>
      <div className="container">
        <NavigationBar />
        <div className="container__content">
          <Outlet />
        </div>
        {!!id && <Modal />}
      </div>
    </PhotoContextProvider>
  )
}

export default App
