import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TableSkeletonProps {
  rows: number;
  columns: number;
}

export const TableSkeleton = ({ rows, columns }: TableSkeletonProps) => {
  return (
    <div className="p-8 space-y-4">
      <div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className="h-10">
                  <Skeleton className="h-6" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: columns }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
