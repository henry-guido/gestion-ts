import { Button } from '@/components/ui/button'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center bg-white dark:bg-gray-800">
          <Button className="ml-auto" size="icon" variant="ghost">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button className="ml-2" size="icon" variant="ghost">
            <img
              alt="User avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function BellIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

export default Layout
