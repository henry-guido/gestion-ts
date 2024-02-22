// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// pages
import ErrorPage from '@/pages/ErrorPage'
import Employees from '@/pages/Employess/Employees'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'

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
        </Route>
      </Route>
      ,
    </>,
  ),
)

const IndexRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default IndexRouter
