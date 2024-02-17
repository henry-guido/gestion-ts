import { useState } from 'react'
import type Link from '../types/layout'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

// pages
import Nav from './Nav'

const SideBar = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const links: Link[] = [
    { title: 'Inicio', icon: 'HomeIcon', path: '/', variant: 'ghost' },
    {
      title: 'Solicitudes',
      icon: 'BriefcaseIcon',
      path: '/request',
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
  ]

  const toogleSidebar = (): void => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className="relative min-w-14 bg-white border-r dark:bg-gray-800">
      <div className="flex items-center h-14 pl-2">
        <a className="flex items-center gap-2 pl-2" href="#">
          <span className="text-lg font-semibold">
            {isCollapsed ? '' : 'Sistema'}
          </span>
          <Button
            onClick={toogleSidebar}
            variant="secondary"
            className="absolute right-[-16px] rounded-full p-2 h-6"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4 stroke-2" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 stroke-2" />
            )}
          </Button>
        </a>
      </div>
      <nav className="grid gap-4 min-w-14">
        <Nav isCollapsed={isCollapsed} links={links} />
      </nav>
    </div>
  )
}

export default SideBar
