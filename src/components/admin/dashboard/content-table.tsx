"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
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
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  Sorting05Icon,
  Delete02Icon,
  Edit01Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { Language, AdminDictionary } from "@/types/locale";
import { ContentType, CMSContent } from "@/lib/admin/schemas";
import { AssetUpload } from "./asset-upload";

interface ContentTableProps {
  dict: AdminDictionary;
  contentType: ContentType;
  lang: Language;
}

export function ContentTable({ dict, contentType, lang }: ContentTableProps) {
  const [data, setData] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<CMSContent>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {dict.table.title}
          <HugeiconsIcon icon={Sorting05Icon} className="size-3" />
        </div>
      ),
      cell: ({ row }) => (
        <Link 
          href={`/${lang}/admin/${contentType}/${row.original.slug}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {row.original.frontmatter.title || row.original.frontmatter.name || row.original.slug}
        </Link>
      ),
    },
    {
      accessorKey: "frontmatter.date",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-1 cursor-pointer text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {dict.table.lastEdited}
          <HugeiconsIcon icon={Sorting05Icon} className="size-2.5 text-muted-foreground" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
          <HugeiconsIcon icon={Calendar03Icon} className="size-3" />
          {row.original.frontmatter.date || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "frontmatter.published",
      header: dict.table.status,
      cell: ({ row }) => (
        <Badge variant={row.original.frontmatter.published ? "default" : "secondary"} className="text-[10px] h-4.5 px-1.5 font-medium">
          {row.original.frontmatter.published ? dict.table.published : dict.table.draft}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 justify-end">
          <Link href={`/${lang}/admin/${contentType}/${row.original.slug}`}>
            <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
              <HugeiconsIcon icon={Edit01Icon} className="size-3.5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="size-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10">
            <HugeiconsIcon icon={Delete02Icon} className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ], [dict, contentType, lang]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/content?type=${contentType}&lang=${lang}`);
        const result = await res.json();
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [contentType, lang]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-md bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">{dict.table.search}...</p> {/* Minor fallback */}
        </div>
      </div>
    );
  }

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={dict.table.search}
            className="pl-9 h-8 text-sm"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        
        {contentType === "gallery" && (
          <AssetUpload 
            type="gallery" 
            label="Upload Photo"
            onSuccess={() => {
              // Refresh table data
              window.location.reload(); 
            }}
          />
        )}
        
         <Link href={`/${lang}/admin/${contentType}/new`} className="ml-auto">
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
