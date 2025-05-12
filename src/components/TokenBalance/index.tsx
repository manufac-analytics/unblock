import { Group, Pagination, Stack, Table, Text, Title, Card } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { Balances } from "../../hooks/useBalances";
import type { PaginationState } from "@tanstack/react-table";
import type { JSX } from "react";

export function TokenBalance({
  ethBalance,
  tokenBalances,
}: {
  ethBalance: string;
  tokenBalances: Balances["tokenBalances"];
}): JSX.Element {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Balances["tokenBalances"][0]>();
    return [
      columnHelper.accessor(
        (datum) => {
          return datum.metadata.name;
        },
        {
          header: "Token Name",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
      columnHelper.accessor(
        (datum) => {
          return datum.tokenBalance.contractAddress;
        },
        {
          header: "Contract Address",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
      columnHelper.accessor(
        (datum) => {
          return datum.metadata.symbol;
        },
        {
          header: "Symbol",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
      columnHelper.accessor(
        (datum) => {
          return datum.tokenBalance.tokenBalance;
        },
        {
          header: "Balance",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
    ];
  }, []);
  const table = useReactTable({
    data: tokenBalances,
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
        <Title order={3}>Token Balances</Title>
        <Group>
          <Text fw={700}>ETH Balance:</Text>
          <Text>{ethBalance}</Text>
        </Group>
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
          {tokenBalances.length > 0 ? (
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
            total={Math.ceil(tokenBalances.length / pagination.pageSize)}
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
