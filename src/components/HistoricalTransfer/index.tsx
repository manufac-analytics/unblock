import { Group, Stack, Table } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import type { AssetTransfersResult } from "alchemy-sdk";
import { useMemo } from "react";
import type { JSX } from "react";

export function HistoricalTransfer(): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<AssetTransfersResult>();
    return [
      columnHelper.accessor("blockNum", {
        header: "Block Number",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("from", {
        header: "From Address",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("to", {
        header: "To Address",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("value", {
        header: "Value",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("hash", {
        header: "Transaction Hash",
        cell: (info) => {
          return info.getValue();
        },
      }),
    ];
  }, []);

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  <Group gap="xs">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
      </Table>
    </Stack>
  );
}
