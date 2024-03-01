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
import ToogleTheme from './ToogleTheme';

const Header = (): JSX.Element => {
  const {name} = useInfoAccountStore(state => state.accountInfo)
  const toggleDarkMode = (): void => {
   
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="flex h-14 items-center bg-background shadow-sm">
      <AuthenticatedTemplate>
        <ToogleTheme />
        <Button size="icon" variant="ghost" onClick={toggleDarkMode}>
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
