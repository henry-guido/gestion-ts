import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { useInfoAccountStore } from '@/store/userInfoAccount'
import { Skeleton } from '@/components/ui/skeleton'

const AvatarDropdown = (): JSX.Element => {
  const { instance } = useMsal()
  const { name, picture } = useInfoAccountStore((state) => state.accountInfo)
  const isAuthenticated = useIsAuthenticated()
  const changeLoading = useInfoAccountStore((state) => state.changeLoading)

  let nameInitials = ''
  if (name) {
    nameInitials = name
      .split(' ')
      .map((x) => x[0])
      .join('')
  }

  const handleLogout = (): void => {
    changeLoading()
    instance
      .logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
      })
      .catch((error) => {
        console.error('Logout failed:', error)
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-2 mr-4">
          <Avatar>
            <AvatarImage src={picture} />
            <AvatarFallback className="bg-primary text-secondary">
              {isAuthenticated ? (
                nameInitials
              ) : (
                <Skeleton className="h-12 w-12 rounded-full" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropdown
