import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
