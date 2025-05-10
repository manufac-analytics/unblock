import { Group, Pagination, Stack, Table, Title, Text } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { PaginationState } from "@tanstack/react-table";
import type { AssetTransfersResult } from "alchemy-sdk";
import type { JSX } from "react";

export function HistoricalTransfer({
  transfers,
}: {
  transfers: AssetTransfersResult[];
}): JSX.Element {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
    data: transfers,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack w={1500}>
      <Title order={3}>Transfer History</Title>

      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id}>
                      <Group gap="xs">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Group>
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Thead>
        {transfers.length > 0 ? (
          <Table.Tbody>
            {table.getPaginationRowModel().rows.map((row) => {
              return (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Table.Td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        ) : (
          <Text mt="md" c="dimmed">
            No data available
          </Text>
        )}
      </Table>
      <Group justify="flex-end" mt="md">
        <Pagination
          total={Math.ceil(transfers.length / pagination.pageSize)}
          value={pagination.pageIndex + 1}
          onChange={(page) => {
            setPagination((prev) => {
              return { ...prev, pageIndex: page - 1 };
            });
          }}
        />
      </Group>
    </Stack>
  );
}
