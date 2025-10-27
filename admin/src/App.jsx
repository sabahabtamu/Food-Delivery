import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { useRoutes } from 'react-router'
import { ToastContainer } from 'react-toastify';

  const baseUrl = 'http://localhost:4000';

const routes = [
  {
    path: '/add',
    element: <Add baseUrl={baseUrl} />
  },
  
  {
    path: '/list',
    element: <List baseUrl={baseUrl}  />
  },

  {
    path: '/orders',
    element: <Orders baseUrl={baseUrl}  />
  },

]

const App = () => {

  const routeElements = useRoutes(routes)

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        {routeElements}
      </div>
    </div>
  )
}

export default App
