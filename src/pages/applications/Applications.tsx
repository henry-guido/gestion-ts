// import { useInfoAccountStore } from '@/store/userInfoAccount'

// Msal imports
// import { loginRequest } from '@/authConfig';
import { useEffect } from 'react'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
} from '@azure/msal-react'
// import { InteractionType } from '@azure/msal-browser';
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { applicationDummy } from '@/dummy/applicationdummy'
import { columns } from '@/components/DataColumns'
import { CalendarPlus } from '@/components/Icons'
import { useNavigate } from 'react-router-dom'

// export async function action() {
//   const application = await createContact();
//   return { application };
// }

const Applications = (): JSX.Element => {
  // const changeLoading = useInfoAccountStore(state => state.changeLoading)
  // const { login, error } = useMsalAuthentication(InteractionType.Silent, loginRequest);
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <AuthenticatedTemplate>
        <div className="flex flex-1 flex-col p-4 gap-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h2 className="font-semibold text-lg md:text-2xl">
              Solicitudes de ausencias
            </h2>
            {/* <Form method="post"> */}
            <Button
              className="ml-auto"
              size="sm"
              onClick={() => {
                navigate('/applications/newApplication')
              }}
            >
              <CalendarPlus className="mr-2 h-5 w-5" /> Solicitar Ausencia
            </Button>
            {/* </Form> */}
          </div>
          <div className="border shadow-sm rounded-lg">
            <DataTable data={applicationDummy} columns={columns} />
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>No users are signed in!</p>
      </UnauthenticatedTemplate>
    </>
  )
}

export default Applications
