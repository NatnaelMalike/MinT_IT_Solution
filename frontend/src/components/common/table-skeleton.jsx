import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DataTableSkeleton({ columnCount = 5, rowCount = 10 }) {
  return (
    <div>
      {/* Header section */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-10 w-60 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Table section */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, idx) => (
                <TableHead key={idx}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: columnCount }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
