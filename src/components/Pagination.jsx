import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import usePagination from "../hooks/usePagination";
import { Link } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

export default function Pagination() {
  const pageSize = 10;
  const { apiData, isLoading, handlePageChange } = usePagination(
    "/api/v1/employee",
    pageSize
  );
  console.log(apiData?.data?.field);

  const columns = apiData?.data?.field
    ? Object.entries(apiData.data.field)
        .filter(([_, value]) => !value.hidden)
        .sort((a, b) => a[1].position - b[1].position)
        .map(([key, value]) => ({
          accessorKey: key === "title" ? "designation.title" : key,
          header: value.label,
          cell: ({ row }) => {
            if (key === "title") {
              return row.original.designation?.title || "-";
            }
            return row.original[key] || "-";
          },
        }))
        .concat({
          accessorKey: "view",
          header: "View",
          cell: ({ row }) => (
            <Link to={`/employee/${row.original.id}`}>
              {"view "} {row.original.name}
            </Link>
          ),
        })
    : [];
  console.log(columns);
  const table = useReactTable({
    data: apiData?.data?.rows?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(apiData?.data?.rows?.data);
  
  if (isLoading) return <p>Loading...</p>;
  if (!apiData) return <p>No data found.</p>;

  const { rows } = apiData.data;

  return (
    <div className="container mt-4">
      <h3>Employee List</h3>
      <table className="table table-bordered table-striped">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>#</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td>{row.original.id}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.column.columnDef.cell({ row })}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <BootstrapPagination className="mt-3">
        {rows.links.map((link) => (
          <BootstrapPagination.Item
            key={link.label}
            active={link.active}
            disabled={!link.url}
            onClick={() =>
              link.url
                ? handlePageChange(Number(link.url.split("page=")[1]))
                : null
            }
          >
            {link.label.replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")}
          </BootstrapPagination.Item>
        ))}
      </BootstrapPagination>
    </div>
  );
}
