import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { NavLink, useLocation } from 'react-router-dom'
import type Link from '../types/layout'
import type { IconName } from '../types/layout'
import * as HeroIcons from '@heroicons/react/24/outline'

interface NavProps {
  isCollapsed: boolean
  links: Link[]
}

interface HeroIconProps {
  icon: IconName
  className?: string
}

const HeroIcon = ({
  icon,
  className = 'h-5 w-5',
}: HeroIconProps): JSX.Element => {
  const SingleIcon = HeroIcons[icon]

  return <SingleIcon className={className} />
}

const Nav = ({ links, isCollapsed }: NavProps): JSX.Element => {
  const { pathname: location } = useLocation()

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className=" grid gap-1 px-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link) =>
          isCollapsed ? (
            <TooltipProvider key={link.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={link.path}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: 'icon' }),
                      'h-9 w-9',
                      link.path === location &&
                        'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white',
                    )}
                  >
                    <HeroIcon icon={link.icon} />
                    <span className="sr-only">{link.title}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{link.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <NavLink
              key={link.id}
              to={link.path}
              className={cn(
                buttonVariants({ variant: link.variant, size: 'sm' }),
                'gap-1',
                link.path === location &&
                  'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white',
                'justify-start',
              )}
            >
              <HeroIcon icon={link.icon} />
              {link.title}
            </NavLink>
          ),
        )}
      </nav>
    </div>
  )
}

export default Nav
