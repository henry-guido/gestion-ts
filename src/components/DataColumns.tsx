
import { type Application } from "@/types/applications"
import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: Array<ColumnDef<Application>> = [
  {
    accessorKey: "date",
    header : () => <div className="text-left">Fecha(s) de ausencia</div>,
  },
  {
    accessorKey: "deduced",
    header: () => <div className="text-left">Dias deducido</div>,
    cell: ({row}) =><div className="ml-9">{row.getValue("deduced")}</div>
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
]
