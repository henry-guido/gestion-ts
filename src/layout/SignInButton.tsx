import { Button } from '@/components/ui/button'
import { loginRequest } from '../authConfig'
import { useMsal } from '@azure/msal-react'
import { getPicture } from '@/graph'

type SignInButtonProps = {
  setPicture: (getPic: string) => void
}

const SignInButton = ({ setPicture }: SignInButtonProps): JSX.Element => {
  const { instance, accounts } = useMsal()

  const handleLogin = async (): Promise<void> => {
    try {
      await instance.loginPopup(loginRequest).catch((e) => {
        console.log(e)
      })

      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      console.log('handleLogin  tokenResponse:', tokenResponse)

      const getPic = (await getPicture(tokenResponse.accessToken)) ?? ''
      console.log('handleLogin  getPic:', getPic)
      setPicture(getPic)
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
