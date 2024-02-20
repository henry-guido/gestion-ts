import { Button } from '@/components/ui/button'
import { loginRequest } from '../authConfig'
import { useMsal } from '@azure/msal-react'

import { useInfoAccountStore } from '@/store/userInfoAccount'

const SignInButton = (): JSX.Element => {
  const { instance, accounts } = useMsal(); 
  const getAccountInfo  = useInfoAccountStore(state => state.getAccountInfo)

  const handleLogin = async (): Promise<void> => {
    try {
      await instance.loginPopup(loginRequest).catch((e) => {
        console.log(e)
      })
      
      await getAccountInfo(instance, accounts)

    } catch (error) {
      console.error('Error requesting profile data:', error)
    }
  }

  return (
    <Button className="ml-auto mr-2" onClick={handleLogin}>
      Iniciar Sesión
    </Button>
  )
}

export default SignInButton
