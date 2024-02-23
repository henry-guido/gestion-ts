import { Button } from '@/components/ui/button'
import { loginRequest } from '../authConfig'
import { useMsal } from '@azure/msal-react'

import { useInfoAccountStore } from '@/store/userInfoAccount'
import { Loader } from '@/components/Icons'

const SignInButton = (): JSX.Element => {
  const { instance, accounts } = useMsal()

  const [getAccountInfo, loading, changeLoading] = useInfoAccountStore(
    (state) => [state.getAccountInfo, state.loading, state.changeLoading],
  )

  const handleLogin = async (): Promise<void> => {
    changeLoading()
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
    <Button className="ml-auto mr-2" onClick={handleLogin} disabled={loading}>
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? 'Iniciando Sesión' : 'Iniciar Sesión'}
    </Button>
  )
}

export default SignInButton
