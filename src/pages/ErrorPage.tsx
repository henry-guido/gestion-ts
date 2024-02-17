import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const ErrorPage = (): JSX.Element => {
  return (
    <div className="w-80 h-screen m-auto flex flex-col gap-4 justify-center items-center">
      <h2 className="font-bold text-8xl">404</h2>
      <p className="font-bold text-2xl">Página no encontrada</p>
      <p className="text-sm text-center">
        La página que estás buscando no existe o ha ocurrido otro error. Ve a la
        página de{' '}
        <Link
          to={import.meta.env.VITE_ORIGIN_PATH_IIS}
          className="font-bold text-blue-700 underline"
        >
          Inicio
        </Link>
      </p>
      <Button asChild>
        <Link to={import.meta.env.VITE_ORIGIN_PATH_IIS}>Ir al Inicio</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
