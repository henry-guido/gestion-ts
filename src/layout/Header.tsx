import { Button } from '@/components/ui/button'
import { BellIcon } from '@heroicons/react/24/outline'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import { useInfoAccountStore} from "@/store/userInfoAccount";

// components Layout
import SignInButton from './SignInButton'
import AvatarDropdown from './AvatarDropdown'

const Header = (): JSX.Element => {
  const {name} = useInfoAccountStore(state => state.accountInfo)
  return (
    <header className="flex h-14 items-center bg-white dark:bg-gray-800">
      <AuthenticatedTemplate>
        <Button className="ml-auto" size="icon" variant="ghost">
          <BellIcon className="h-5 w-5 stroke-2" />
        </Button>
        {name && <p className="font-medium">{name}</p>}
        <AvatarDropdown />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
    </header>
  )
}

export default Header
