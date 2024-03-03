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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route
            path="/employees"
            element={<Employees />}
          />
          <Route path="/applications"
          element={<Applications />} />
        </Route>
      </Route>
    </>
  )
)

const IndexRouter = (): JSX.Element => {
  return (
      <RouterProvider router={router} />
  )
}

export default IndexRouter
