import { useInfoAccountStore } from '@/store/userInfoAccount'

// Msal imports
import { loginRequest } from '@/authConfig';
import { useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType, InteractionRequiredAuthError } from '@azure/msal-browser';

const Employees = (): JSX.Element => {
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
      <div className="flex-1 p-4 md:p-6">
          <h1 className="absolute top-[12px] text-2xl font-bold ">
            Colaboradores
          </h1>
      </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <p>No users are signed in!</p>
      </UnauthenticatedTemplate>
      </>
  )
}

export default Employees
