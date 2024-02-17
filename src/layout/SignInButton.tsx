import { Button } from '@/components/ui/button'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

const SignInButton = (): JSX.Element => {
  const { instance } = useMsal()

  const handleLogin = (): void => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e)
    })
  }

  return (
    <Button className="ml-auto mr-2" onClick={handleLogin}>
      Iniciar Sesión
    </Button>
  )
}

export default SignInButton
