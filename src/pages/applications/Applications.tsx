import { useInfoAccountStore } from '@/store/userInfoAccount'

// Msal imports
import { loginRequest } from '@/authConfig';
import { useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType, InteractionRequiredAuthError } from '@azure/msal-browser';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { applicationDummy } from '@/dummy/applicationdummy';
import { columns } from '@/components/DataColumns';

const Applications = (): JSX.Element => {
const changeLoading = useInfoAccountStore(state => state.changeLoading)
  const { login, error } = useMsalAuthentication(InteractionType.Silent, loginRequest);

  

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
       void login(InteractionType.Popup, loginRequest).catch(()=>{
        changeLoading()
       });
       changeLoading()
    }
}, [error]);

  return (
      <>
      <AuthenticatedTemplate>
      {/* <div className="flex-1 p-2 md:px-6">
          <h2 className="absolute top-[12px] text-2xl font-bold ">
            Solicitudes
          </h2>
      </div> */}

      <div className="flex flex-1 flex-col p-4 gap-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Solicitudes de ausencias</h1>
            <Button className="ml-auto" size="sm">
              Solicitar ausencia
            </Button>
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
