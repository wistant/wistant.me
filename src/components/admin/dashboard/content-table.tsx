"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/admin/ui/button";
import { Checkbox } from "@/components/admin/ui/checkbox";
import { Input } from "@/components/admin/ui/input";
import { Badge } from "@/components/admin/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  ArrowUpDownIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { CMSContent } from "@/lib/admin/server/cms/engine";
import { AdminDictionary } from "@/types/locale";

export function ContentTable({ contentType, dict }: { contentType: "projects" | "blog", dict: AdminDictionary }) {
  const [data, setData] = useState<CMSContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/admin/content?type=${contentType}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch content", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [contentType]);

  const columns = useMemo<ColumnDef<CMSContent>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                ? true
                : false
            }
            onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "slug",
        header: ({ column }) => (
          <Button variant="ghost" className="h-auto p-0 font-medium text-xs hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {dict.table.title} <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-1 size-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const title = String(row.original.frontmatter.title || row.original.slug);
          return (
            <div className="flex flex-col min-w-[200px]">
              <span className="text-sm font-medium truncate">{title}</span>
              <span className="text-xs text-muted-foreground">{row.original.slug}.{row.original.lang}.mdx</span>
            </div>
          );
        },
      },
      {
        accessorKey: "lang",
        header: ({ column }) => (
          <Button variant="ghost" className="h-auto p-0 font-medium text-xs hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
             {dict.table.language} <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-1 size-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <Badge variant="outline" className="text-xs font-semibold px-2 py-0.5 uppercase">
            {row.original.lang}
          </Badge>
        ),
      },
      {
        accessorKey: "lastModified",
        header: ({ column }) => (
          <Button variant="ghost" className="h-auto p-0 font-medium text-xs hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
             {dict.table.lastEdited} <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-1 size-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const date = new Date(row.original.lastModified);
          return <span className="text-sm text-muted-foreground">{date.toLocaleDateString()}</span>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Link href={`/${row.original.lang}/admin/${contentType}/${row.original.slug}`}>
            <Button variant="outline" size="sm" className="text-xs">{dict.actions.edit}</Button>
          </Link>
        ),
      }
    ],
    [contentType, dict]
  );

  const filteredData = useMemo(() => {
    let result = data;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.slug.toLowerCase().includes(q) || 
               (c.frontmatter.title && String(c.frontmatter.title).toLowerCase().includes(q))
      );
    }
    return result;
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = filteredData.length;
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading {contentType} content...</div>;
  }

  return (
    <div className="rounded-lg border bg-card flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder={`${dict.table.search}...`}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
        
        {/* Wait, I don't have lang yet in ContentTable. Let's fix this properly. */}
         <Link href={`./${contentType}/new`} className="ml-auto">
          <Button size="sm" className="h-8 gap-1.5">
            <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
            <span className="hidden sm:inline">{dict.actions.create}</span>
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-medium text-muted-foreground h-10 whitespace-nowrap">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b last:border-0 hover:bg-muted/30" data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {dict.table.empty}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {totalRows === 0
              ? dict.table.empty
              : dict.table.pagination.replace("{from}", String(from)).replace("{to}", String(to)).replace("{total}", String(totalRows))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="size-8" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>
          <span className="px-2 text-sm tabular-nums">
            {pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <Button variant="outline" size="icon" className="size-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
