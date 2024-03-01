import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-background2">
      <SideBar />
      <div className="flex flex-col flex-1 min-h-svh bg-background2">
        <Header />
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
