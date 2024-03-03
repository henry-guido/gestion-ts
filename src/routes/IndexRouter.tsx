// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// pages
import ErrorPage from '@/pages/ErrorPage'
import Employees from '@/pages/employess/Employees'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import Applications from '@/pages/applications/Applications'
import { ThemeProvider } from '@/contexts/ThemeProvider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route
            path={`${import.meta.env.VITE_ORIGIN_PATH_IIS}/employees`}
            element={<Employees />}
          />
          <Route path={`${import.meta.env.VITE_ORIGIN_PATH_IIS}/applications`} 
          element={<Applications />} />
        </Route>
      </Route>
    </>
  )
)

const IndexRouter = (): JSX.Element => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='ui-theme' >
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default IndexRouter
