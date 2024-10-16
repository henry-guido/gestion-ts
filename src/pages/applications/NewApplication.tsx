import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'

const formSchema = z.object({
  type: z.string({
    required_error: 'Tipo es requerido',
  }),
  date: z
    .object(
      {
        from: z.date(),
        to: z.date().optional(),
      },
      { required_error: 'Fecha es requerido' },
    )
    .refine((date) => {
      return !!date.to
    }, 'Fecha final es requerido'),
  description: z.string(),
})

const NewApplication = (): JSX.Element => {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log(values)
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4">
        <Link
          to="/applications"
          className="inline-flex items-center hover:underline text-sm font-medium"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" /> Solicitudes
        </Link>
        <h2 className="font font-semibold text-2xl">Solicitud de ausencia</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-card text-card-foreground shadow-sm border rounded-lg p-4"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Días de ausencia</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-[300px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'MMM dd, y')} -{' '}
                            {format(field.value.to, 'MMM dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'MMM dd, y')
                        )
                      ) : (
                        <span>Elija una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de ausencia</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de ausencia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Vacaciones</SelectItem>
                    <SelectItem value="2">Reposición de horas</SelectItem>
                    <SelectItem value="3">Cumpleaños</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe una pequeña descripción sobre tu ausencia"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Solicitar</Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2"
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default NewApplication
