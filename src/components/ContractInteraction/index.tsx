import { Group, Pagination, Stack, Table, Text, Title, Card } from "@mantine/core";
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

export function ContractInteraction({
  interaction,
}: {
  interaction: AssetTransfersResult[];
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
      columnHelper.accessor("to", {
        header: "Smart Contract Address",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("asset", {
        header: "Asset",
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
      columnHelper.accessor(
        (row) => {
          return row.rawContract.address;
        },
        {
          id: "rawContractAddress",
          header: "Raw Contract",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
    ];
  }, []);

  const table = useReactTable({
    data: interaction,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="100%">
      <Stack>
        <Title order={3}>Contract Interaction</Title>

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
          {interaction.length > 0 ? (
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
            total={Math.ceil(interaction.length / pagination.pageSize)}
            value={pagination.pageIndex + 1}
            onChange={(page) => {
              setPagination((prev) => {
                return { ...prev, pageIndex: page - 1 };
              });
            }}
          />
        </Group>
      </Stack>
    </Card>
  );
}
