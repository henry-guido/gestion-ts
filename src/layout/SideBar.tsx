import { useState } from 'react'
import type Link from '../types/layout'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { useIsAuthenticated } from '@azure/msal-react'
// pages
import Nav from './Nav'

const SideBar = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const isAuthenticated = useIsAuthenticated()
  const links: Link[] = [
    { title: 'Inicio', icon: 'HomeIcon', path: '/', variant: 'ghost' },
  ]

  const toogleSidebar = (): void => {
    setIsCollapsed(!isCollapsed)
  }

  if (isAuthenticated) {
    links.push(
      {
        title: 'Solicitudes',
        icon: 'BriefcaseIcon',
        path: '/applications',
        variant: 'ghost',
      },
      {
        title: 'Colaboradores',
        icon: 'UsersIcon',
        path: '/employees',
        variant: 'ghost',
      },
      {
        title: 'Configuraciones',
        icon: 'Cog6ToothIcon',
        path: '/configurations',
        variant: 'ghost',
      },
    )
  }

  return (
    <div className="relative min-w-14 bg-background/95 shadow-sm">
      <div className="flex items-center h-14 pl-4">
          <span className="text-lg font-semibold">
            {isCollapsed ? '' : 'Sistema'}
          </span>
          <Button
            onClick={toogleSidebar}
            variant="secondary"
            className="absolute right-[-10px] rounded-full w-[18px] h-[18px] bg-background/95 border"
            size='icon'
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4 stroke-2" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 stroke-2" />
            )}
          </Button>
      </div>
      <nav className="grid gap-4 min-w-14">
        <Nav isCollapsed={isCollapsed} links={links} />
      </nav>
    </div>
  )
}

export default SideBar
