interface ImportMetaEnv {
  readonly VITE_MSAL_CLIENTID: string
  readonly VITE_MSAL_AUTHORITY: string
  readonly VITE_MSAL_REDIRECTURI: string
  readonly VITE_ORIGIN_PATH_IIS: string
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}